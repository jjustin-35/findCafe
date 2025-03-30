export interface CacheItem<T> {
  data: T;
  timer: NodeJS.Timeout | null;
}

const DEFAULT_EXPIRES_IN = 60 * 60 * 1000;

const cacheStore: Map<string, CacheItem<any>> = new Map();

export function getCache<T>(key: string): T | null {
  const item = cacheStore.get(key);
  if (!item) {
    return null;
  }

  return item.data;
}

export function setCache<T>(key: string, data: T, expiresIn = DEFAULT_EXPIRES_IN): void {
  const item = cacheStore.get(key);
  if (item) {
    if (item.timer) {
      clearTimeout(item.timer);
    }
    item.timer = setTimeout(() => {
      cacheStore.delete(key);
    }, expiresIn);
    item.data = data;

    return;
  }

  cacheStore.set(key, {
    data,
    timer: setTimeout(() => {
      cacheStore.delete(key);
    }, expiresIn),
  });
}

function sortObjectKeys(obj: Record<string, any>): Record<string, any> {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(sortObjectKeys);
  }

  const sortedKeys = Object.keys(obj)
    .filter((key) => obj[key] !== undefined && obj[key] !== null)
    .sort((keyA, keyB) => keyA.localeCompare(keyB));
  const result = sortedKeys.reduce<Record<string, any>>((acc, key) => {
    acc[key] = sortObjectKeys(obj[key]);
    return acc;
  }, {});

  return result;
}

export function generateKey(prefix: string, params: Record<string, any>): string {
  const sortedParams = Object.entries(sortObjectKeys(params))
    .map(([key, value]) => `${key}:${JSON.stringify(value)}`)
    .join('|');

  return `${prefix}|${sortedParams}`;
}

export function clear(): void {
  cacheStore.forEach((item) => {
    if (item.timer) {
      clearTimeout(item.timer);
    }
  });
  cacheStore.clear();
}

export function clearByPrefix(prefix: string): void {
  cacheStore.forEach((item, key) => {
    if (key.startsWith(`${prefix}|`)) {
      if (item.timer) {
        clearTimeout(item.timer);
      }
      cacheStore.delete(key);
    }
  });
}

export function clearByKey(key: string): void {
  const item = cacheStore.get(key);
  if (item && item.timer) {
    clearTimeout(item.timer);
  }
  cacheStore.delete(key);
}

const apiCache = {
  getCache,
  setCache,
  generateKey,
  clear,
  clearByPrefix,
  clearByKey,
};

export default apiCache;
