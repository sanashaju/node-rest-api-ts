import redisClient from '../config/redis.js';

/**
 * Get cached data from Redis
 */
export const getCache = async (key: string): Promise<string | null> => {
  try {
    const data = await redisClient.get(key);
    return data;
  } catch (error) {
    console.error('Error getting cache:', error);
    return null;
  }
};

/**
 * Set data in Redis cache with optional expiration
 */
export const setCache = async (
  key: string,
  value: string,
  expirationInSeconds?: number
): Promise<void> => {
  try {
    if (expirationInSeconds) {
      await redisClient.setex(key, expirationInSeconds, value);
    } else {
      await redisClient.set(key, value);
    }
  } catch (error) {
    console.error('Error setting cache:', error);
  }
};

/**
 * Delete cached data from Redis
 */
export const deleteCache = async (key: string): Promise<void> => {
  try {
    await redisClient.del(key);
  } catch (error) {
    console.error('Error deleting cache:', error);
  }
};

/**
 * Delete multiple keys matching a pattern
 */
export const deleteCachePattern = async (pattern: string): Promise<void> => {
  try {
    const keys = await redisClient.keys(pattern);
    if (keys.length > 0) {
      await redisClient.del(...keys);
    }
  } catch (error) {
    console.error('Error deleting cache pattern:', error);
  }
};

/**
 * Check if key exists in cache
 */
export const cacheExists = async (key: string): Promise<boolean> => {
  try {
    const exists = await redisClient.exists(key);
    return exists === 1;
  } catch (error) {
    console.error('Error checking cache existence:', error);
    return false;
  }
};
