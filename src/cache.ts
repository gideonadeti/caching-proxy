const memoryCache = new Map<string, string>();

export const getCache = (key: string) => {
  return memoryCache.get(key) ?? null;
};

export const setCache = (key: string, value: string) => {
  memoryCache.set(key, value);
};

export const clearCache = () => {
  memoryCache.clear();
};
