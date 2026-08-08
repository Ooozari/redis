import { Redis } from 'ioredis';

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: Number(process.env.REDIS_PORT) || 6379,
});

redis.on('connect', () => {
    console.log('Success! Connected to Redis');
});
redis.on('error', (err) => {
  console.error('Failed! Could not connect to Redis', err);
});

export default redis;