/**
 * 計算兩個字串的編輯距離 (Levenshtein Distance)
 * 編輯距離越小，表示兩個字串越相似
 */
export function levenshteinDistance(str1: string, str2: string): number {
  const m = str1.length;
  const n = str2.length;

  // 創建一個二維陣列來存儲子問題的解
  const dp: number[][] = Array(m + 1)
    .fill(null)
    .map(() => Array(n + 1).fill(0));

  // 初始化第一行和第一列
  for (let i = 0; i <= m; i++) {
    dp[i][0] = i;
  }

  for (let j = 0; j <= n; j++) {
    dp[0][j] = j;
  }

  // 填充dp表格
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1, // 刪除
          dp[i][j - 1] + 1, // 插入
          dp[i - 1][j - 1] + 1, // 替換
        );
      }
    }
  }

  return dp[m][n];
}

/**
 * 計算 Jaccard 相似度
 * 兩個集合的交集大小除以聯集大小
 */
export function jaccardSimilarity(str1: string, str2: string): number {
  const set1 = new Set(str1.toLowerCase().split(''));
  const set2 = new Set(str2.toLowerCase().split(''));

  const intersection = new Set([...set1].filter((x) => set2.has(x)));
  const union = new Set([...set1, ...set2]);

  return intersection.size / union.size;
}

/**
 * 計算餘弦相似度
 * 將字串轉換為詞頻向量，然後計算向量間的餘弦值
 */
export function cosineSimilarity(str1: string, str2: string): number {
  // 將字串轉換為詞頻向量
  const getWordFrequency = (str: string): Record<string, number> => {
    const words = str.toLowerCase().split('');
    const frequency: Record<string, number> = {};

    for (const word of words) {
      frequency[word] = (frequency[word] || 0) + 1;
    }

    return frequency;
  };

  const freq1 = getWordFrequency(str1);
  const freq2 = getWordFrequency(str2);

  // 計算所有唯一詞
  const uniqueWords = new Set([...Object.keys(freq1), ...Object.keys(freq2)]);

  // 計算點積
  let dotProduct = 0;
  let magnitude1 = 0;
  let magnitude2 = 0;

  for (const word of uniqueWords) {
    const val1 = freq1[word] || 0;
    const val2 = freq2[word] || 0;

    dotProduct += val1 * val2;
    magnitude1 += val1 * val1;
    magnitude2 += val2 * val2;
  }

  magnitude1 = Math.sqrt(magnitude1);
  magnitude2 = Math.sqrt(magnitude2);

  if (magnitude1 === 0 || magnitude2 === 0) {
    return 0;
  }

  return dotProduct / (magnitude1 * magnitude2);
}

/**
 * 判斷兩個店名是否相似
 * @param name1 第一個店名
 * @param name2 第二個店名
 * @param threshold 相似度閾值，預設為 0.7
 * @returns 是否相似
 */
export function isSimilar(name1: string, name2: string, threshold = 0.7): boolean {
  if (!name1 || !name2) return false;

  // 如果完全相同，直接返回 true
  if (name1.toLowerCase() === name2.toLowerCase()) return true;

  // 正規化字串：移除空格、標點符號，轉為小寫
  const normalize = (str: string): string => {
    return str
      .toLowerCase()
      .replace(/[^\w\s\u4e00-\u9fff]/g, '') // 保留中文字符和英文字母數字
      .replace(/\s+/g, '');
  };

  const normalizedName1 = normalize(name1);
  const normalizedName2 = normalize(name2);

  // 如果正規化後完全相同，返回 true
  if (normalizedName1 === normalizedName2) return true;

  // 計算編輯距離並轉換為相似度 (0-1 範圍)
  const maxLength = Math.max(normalizedName1.length, normalizedName2.length);
  const levenshteinSimilarity =
    maxLength === 0 ? 1 : 1 - levenshteinDistance(normalizedName1, normalizedName2) / maxLength;

  // 計算 Jaccard 相似度
  const jaccard = jaccardSimilarity(normalizedName1, normalizedName2);

  // 計算餘弦相似度
  const cosine = cosineSimilarity(normalizedName1, normalizedName2);

  // 綜合多種相似度計算方法
  const combinedSimilarity = levenshteinSimilarity * 0.5 + jaccard * 0.3 + cosine * 0.2;

  return combinedSimilarity >= threshold;
}

/**
 * 計算兩個店名的相似度分數 (0-1)
 * @param name1 第一個店名
 * @param name2 第二個店名
 * @returns 相似度分數，範圍 0-1
 */
export function getSimilarityScore(name1: string, name2: string): number {
  if (!name1 || !name2) return 0;

  // 如果完全相同，直接返回 1
  if (name1.toLowerCase() === name2.toLowerCase()) return 1;

  // 正規化字串
  const normalize = (str: string): string => {
    return str
      .toLowerCase()
      .replace(/[^\w\s\u4e00-\u9fff]/g, '')
      .replace(/\s+/g, '');
  };

  const normalizedName1 = normalize(name1);
  const normalizedName2 = normalize(name2);

  // 如果正規化後完全相同，返回 1
  if (normalizedName1 === normalizedName2) return 1;

  // 計算編輯距離並轉換為相似度
  const maxLength = Math.max(normalizedName1.length, normalizedName2.length);
  const levenshteinSimilarity =
    maxLength === 0 ? 1 : 1 - levenshteinDistance(normalizedName1, normalizedName2) / maxLength;

  // 計算 Jaccard 相似度
  const jaccard = jaccardSimilarity(normalizedName1, normalizedName2);

  // 計算餘弦相似度
  const cosine = cosineSimilarity(normalizedName1, normalizedName2);

  // 綜合多種相似度計算方法
  return levenshteinSimilarity * 0.5 + jaccard * 0.3 + cosine * 0.2;
}
