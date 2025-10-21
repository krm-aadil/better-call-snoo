import type { Case } from '../../shared/types/game';
import { CASE_LIBRARY, getRandomCases as getRandomCasesFromLibrary } from '../../shared/data/caseLibrary';
import { redis } from '@devvit/web/server';

/**
 * Get daily cases with Redis caching
 * Uses deterministic selection based on current date
 */
export const getDailyCases = async (count: number = 5): Promise<Case[]> => {
  const today = new Date().toISOString().split('T')[0]!; // YYYY-MM-DD format
  const cacheKey = `daily_cases:${today}`;
  
  try {
    // Try to get cached cases first
    const cachedCases = await redis.get(cacheKey);
    
    if (cachedCases) {
      return JSON.parse(cachedCases) as Case[];
    }
    
    // Generate new daily cases using date-based seed
    const dateHash = generateDateHash(today);
    const dailyCases = getRandomCasesFromLibrary(count, dateHash);
    
    // Cache for 24 hours (86400 seconds)
    await redis.set(cacheKey, JSON.stringify(dailyCases));
    await redis.expire(cacheKey, 86400);
    
    return dailyCases;
  } catch (error) {
    console.error('Error getting daily cases from Redis:', error);
    // Fallback to generating cases without caching
    const dateHash = generateDateHash(today);
    return getRandomCasesFromLibrary(count, dateHash);
  }
};

/**
 * Generate a numeric hash from a date string for seeded randomization
 */
const generateDateHash = (dateString: string): number => {
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    const char = dateString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
};

/**
 * Legacy function for backward compatibility
 * @deprecated Use getDailyCases instead
 */
export const getRandomCases = (count: number, seed?: string): Case[] => {
  const dateHash = generateDateHash(seed || new Date().toISOString().split('T')[0]!);
  return getRandomCasesFromLibrary(count, dateHash);
};

/**
 * Get case by ID from the library
 */
export const getCaseById = (id: string): Case | undefined => {
  return CASE_LIBRARY.find(caseItem => caseItem.id === id);
};

/**
 * Re-export the case library for direct access
 */
export { CASE_LIBRARY };
