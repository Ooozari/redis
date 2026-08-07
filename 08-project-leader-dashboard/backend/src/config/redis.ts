import { Redis } from 'ioredis';

const redisConfig = {
    url: process.env.REDIS_URL || undefined,
    password: undefined,
  };
  
const redis = new Redis(redisConfig);

redis.on('connect', () => {
    console.log('Success! Connected to Redis');
});

export default redis;