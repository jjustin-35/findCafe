'use server';

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { SearchCafesData, CafeData } from '@/constants/types';
import { revalidatePath } from 'next/cache';

// init
const API_KEY = process.env.GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(API_KEY);

// safety settings
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

// get model
const getGeminiModel = () => {
  return genAI.getGenerativeModel({
    model: 'gemini-2.0-flash',
    safetySettings,
  });
};

// build search prompt
const buildSearchPrompt = (searchData: SearchCafesData) => {
  const { keyword, tags, rating, position } = searchData;

  let prompt = '請幫我搜尋符合以下條件的咖啡廳：\n';

  if (keyword) {
    prompt += `- 關鍵字：${keyword}\n`;
  }

  if (tags && tags.length > 0) {
    prompt += `- 標籤：${tags.join(', ')}\n`;
  }

  if (rating && rating > 0) {
    prompt += `- 最低評分：${rating} 星\n`;
  }

  if (position) {
    prompt += `- 位置：緯度 ${position.lat}，經度 ${position.lng}\n`;
  }

  prompt += '\n請根據這些條件，提供最適合的搜尋關鍵字，以便我使用 Google Maps API 搜尋咖啡廳。';
  prompt += '\n只需要返回搜尋關鍵字，不需要其他解釋。';

  return prompt;
};

// generate search keyword
export async function generateSearchKeyword(searchData: SearchCafesData): Promise<string> {
  try {
    // if no API KEY, return original keyword
    if (!API_KEY) {
      console.warn('Gemini API key is not set');
      return searchData.keyword || '';
    }

    const model = getGeminiModel();
    const prompt = buildSearchPrompt(searchData);

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text().trim();

    // revalidate path to ensure data is updated
    revalidatePath('/cafe');

    return text || searchData.keyword || '';
  } catch (error) {
    console.error('Error generating search keyword with Gemini:', error);
    // return original keyword
    return searchData.keyword || '';
  }
}

// build analysis prompt
const buildAnalysisPrompt = (cafes: CafeData[], searchData: SearchCafesData) => {
  const { keyword, tags, rating } = searchData;

  let prompt = '以下是搜尋到的咖啡廳列表：\n\n';

  cafes.forEach((cafe, index) => {
    prompt += `${index + 1}. ${cafe.name}\n`;
    prompt += `   評分：${cafe.rating || '無'} 星\n`;
    prompt += `   地址：${cafe.address}\n`;

    // 從咖啡廳資料中獲取可能的特色
    const features = [];
    if (cafe.wifi && parseInt(cafe.wifi.toString()) > 3) features.push('WiFi 良好');
    if (cafe.seat && parseInt(cafe.seat.toString()) > 3) features.push('座位充足');
    if (cafe.quiet && parseInt(cafe.quiet.toString()) > 3) features.push('環境安靜');
    if (cafe.tasty && parseInt(cafe.tasty.toString()) > 3) features.push('餐點美味');
    if (cafe.cheap && parseInt(cafe.cheap.toString()) > 3) features.push('價格合理');
    if (cafe.socket === 'yes') features.push('有插座');
    if (cafe.limited_time === 'no') features.push('無時間限制');

    if (features.length > 0) {
      prompt += `   特色：${features.join(', ')}\n`;
    }

    prompt += '\n';
  });

  prompt += '搜尋條件：\n';
  if (keyword) {
    prompt += `- 關鍵字：${keyword}\n`;
  }
  if (tags && tags.length > 0) {
    prompt += `- 標籤：${tags.join(', ')}\n`;
  }
  if (rating && rating > 0) {
    prompt += `- 最低評分：${rating} 星\n`;
  }

  prompt += '\n請分析這些咖啡廳，並根據搜尋條件提供以下內容：\n';
  prompt += '1. 哪些咖啡廳最符合搜尋條件，為什麼？\n';
  prompt += '2. 有沒有特別推薦的咖啡廳，理由是什麼？\n';
  prompt += '3. 這些咖啡廳的共同特點是什麼？\n';

  return prompt;
};

// analyze cafes
export async function analyzeCafes(cafes: CafeData[], searchData: SearchCafesData): Promise<string> {
  try {
    if (!cafes || cafes.length === 0) {
      return '沒有找到符合條件的咖啡廳。';
    }

    // if no API KEY, return simple message
    if (!API_KEY) {
      console.warn('Gemini API key is not set');
      return `找到 ${cafes.length} 家符合條件的咖啡廳。`;
    }

    const model = getGeminiModel();
    const prompt = buildAnalysisPrompt(cafes, searchData);

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // revalidate path to ensure data is updated
    revalidatePath('/cafe');

    return text;
  } catch (error) {
    console.error('Error analyzing cafes with Gemini:', error);
    return `找到 ${cafes.length} 家符合條件的咖啡廳。`;
  }
}
