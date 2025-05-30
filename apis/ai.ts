'use server';

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { SearchCafesData } from '@/constants/types';

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

  const prompt = `
  You are a semantic parsing assistant. Based on the user's search input, return a JSON object that matches the following format:

  {
    area?: string;         // The city or area mentioned (e.g., Taipei, Tainan)
    areaKey?: string;      // The corresponding English key for the area (e.g., taipei, tainan)
    district?: string;     // Specific district or administrative area mentioned (e.g., Zhongshan District)
    location?: string;     // Specific place name if mentioned (e.g., Taipei Main Station, Shida Night Market)
    position?: {
      lat: number;         // If a specific area or location is mentioned, try to provide coordinates (optional)
      lng: number;         // If a specific area or location is mentioned, try to provide coordinates (optional)
    };
    keyword?: string;      // The main keyword or phrase the user is searching for (e.g., "laptop-friendly cafe")
    rating?: number;       // If the user specifies a rating, provide the number (e.g., 4 or 4.5)
    tags?: string[];       // Suggested tags extracted from the input (e.g., ["quiet", "hipster", "good for work"])
  }

  User input: "keyword: ${keyword}, tags: ${tags}, rating: ${rating}, position: ${position}"

  Only return a valid JSON object. Do not include any explanations or additional text.
  If any fields cannot be confidently inferred, simply omit them.
  `;

  return prompt;
};

// generate search data
export async function generateAISearchData(searchData: SearchCafesData): Promise<SearchCafesData> {
  try {
    // if no API KEY, return original keyword
    if (!API_KEY) {
      console.warn('Gemini API key is not set');
      return searchData;
    }

    const model = getGeminiModel();
    const prompt = buildSearchPrompt(searchData);

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response
      .text()
      .trim()
      .replace(/\n|```|json/g, '');
    const aiSearchData = JSON.parse(text);

    if (!aiSearchData) {
      console.warn('no ai search data');
      return searchData;
    }

    return aiSearchData;
  } catch (error) {
    console.error('Error generating search data with Gemini:', error);
    return searchData;
  }
}
