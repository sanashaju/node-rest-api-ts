import { Request, Response, NextFunction } from 'express';
import { getCache, setCache } from '../utils/cache.js';

/**
 * Cache middleware to cache GET requests
 * @param expirationInSeconds - Cache expiration time in seconds (default: 300 = 5 minutes)
 */
export const cacheMiddleware = (expirationInSeconds: number = 300) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }

    // Generate cache key from URL and query params
    const cacheKey = `cache:${req.originalUrl || req.url}`;

    try {
      // Check if data exists in cache
      const cachedData = await getCache(cacheKey);

      if (cachedData) {
        console.log(`Cache HIT: ${cacheKey}`);
        return res.json(JSON.parse(cachedData));
      }

      console.log(`Cache MISS: ${cacheKey}`);

      // Store original res.json function
      const originalJson = res.json.bind(res);

      // Override res.json to cache the response
      res.json = function (body: any) {
        // Cache the response
        setCache(cacheKey, JSON.stringify(body), expirationInSeconds).catch(
          (err) => console.error('Error caching response:', err)
        );

        // Call original json method
        return originalJson(body);
      };

      next();
    } catch (error) {
      console.error('Cache middleware error:', error);
      next();
    }
  };
};
