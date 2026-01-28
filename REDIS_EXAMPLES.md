# Redis Integration Examples

## Using Cache Middleware in Routes

To cache GET requests in your routes, import and use the `cacheMiddleware`:

```typescript
import { cacheMiddleware } from '../middleware/cache.middleware.js';

// Cache for 5 minutes (300 seconds)
productRoutes.get('/', verifyUser, cacheMiddleware(300), getProducts);

// Cache for 1 hour (3600 seconds)
productRoutes.get('/:id', verifyUser, cacheMiddleware(3600), getProductById);
```

## Manual Cache Usage in Controllers

Use the cache utility functions directly in your controllers:

```typescript
import { getCache, setCache, deleteCache } from '../utils/cache.js';

// Get data from cache
const cachedProducts = await getCache('products:all');
if (cachedProducts) {
  return res.json(JSON.parse(cachedProducts));
}

// Set data in cache (expires in 300 seconds)
await setCache('products:all', JSON.stringify(products), 300);

// Delete from cache when data is updated
await deleteCache('products:all');

// Delete multiple keys matching pattern
await deleteCachePattern('products:*');
```

## Session Storage Example

```typescript
import redisClient from '../config/redis.js';

// Store user session
await redisClient.setex(`session:${userId}`, 3600, JSON.stringify(sessionData));

// Get user session
const session = await redisClient.get(`session:${userId}`);

// Delete session (logout)
await redisClient.del(`session:${userId}`);
```

## Rate Limiting with Redis

```typescript
import redisClient from '../config/redis.js';

const rateLimit = async (userId: string, limit: number = 100) => {
  const key = `ratelimit:${userId}`;
  const current = await redisClient.incr(key);
  
  if (current === 1) {
    await redisClient.expire(key, 3600); // 1 hour window
  }
  
  return current <= limit;
};
```

## Cache Invalidation Patterns

### 1. Time-based expiration (TTL)
```typescript
// Automatically expires after 1 hour
await setCache('products:all', JSON.stringify(products), 3600);
```

### 2. Event-based invalidation
```typescript
// In your update/delete controllers
export const updateProduct = async (req, res) => {
  // Update product in database
  const product = await Product.findByIdAndUpdate(req.params.id, req.body);
  
  // Invalidate related caches
  await deleteCache(`product:${req.params.id}`);
  await deleteCache('products:all');
  
  res.json(product);
};
```

### 3. Pattern-based invalidation
```typescript
// Delete all user-related caches
await deleteCachePattern('user:*');

// Delete all product caches
await deleteCachePattern('products:*');
```

## Best Practices

1. **Use descriptive cache keys**: `user:123`, `products:all`, `product:456`
2. **Set appropriate TTL**: Short-lived for frequently changing data, longer for static data
3. **Invalidate on updates**: Always clear cache when data changes
4. **Handle cache failures gracefully**: Always have fallback to database
5. **Use cache for read-heavy operations**: Don't cache write operations
6. **Monitor cache hit/miss ratio**: Check logs to optimize caching strategy
