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

export function generateKey(prefix: string, params: Record<string, any>): string {
  const sortedParams = Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null)
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    .map(([key, value]) => {
      if (typeof value === 'object') {
        return `${key}:${JSON.stringify(value)}`;
      }
      return `${key}:${value}`;
    })
    .join('|');

  return `${prefix}|${sortedParams}`;
}

export function clear(): void {
  cacheStore.forEach(item => {
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
