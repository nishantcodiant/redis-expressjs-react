const Redis = require('ioredis');

class RedisService {
  redis;

  constructor() {
    this.redis = this.createRedisConnection();
  }

  createRedisConnection() {
    const redisClient = new Redis(
      'redis://default:uO1w4ipsgLC1TAYJgBVaRIWjrh2aCfHs@redis-15474.c44.us-east-1-2.ec2.redns.redis-cloud.com:15474'
      // {
      //   host: process.env.REDIS_HOST, // Redis host
      //   port: process.env.REDIS_PORT, // Redis port
      // }
    );

    redisClient.on('connect', () => {
      console.log('Redis Connected Successfully');
    });

    redisClient.on('error', (error) => {
      console.log('Redis Not Connected Successfully', { error });
    });

    return redisClient;
  }

  async setValue(key, value) {
    console.log(`[CACHE SET] Key "${key}" set with expiration of ${'60'} seconds.`);
    return await this.redis.set(key, JSON.stringify(value));
  }

  async getValue(key) {
    const data = await this.redis.get(key);
    if (data?.length) {
      console.log(`[CACHE HIT] Data for key "${key}" served from Redis.`);
    }
    return JSON.parse(data);
  }

  async deleteValue(key) {
    return await this.redis.del(key);
  }

  async setValueWithExpireTime(key, redis_expire_in, value) {
    return await this.redis.setex(key, redis_expire_in, JSON.stringify(value));
  }
}

exports.redis = new RedisService();
