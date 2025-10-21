// Date utility functions for daily case rotation
// This file will be used in later tasks

export const getTodayDateString = (): string => {
  return new Date().toISOString().split('T')[0]!;
};

export const getSeededRandom = (seed: string): number => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  const x = Math.sin(hash) * 10000;
  return x - Math.floor(x);
};
