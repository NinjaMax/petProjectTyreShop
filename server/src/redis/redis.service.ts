import { Inject, Injectable } from '@nestjs/common';
import { REDIS_CLIENT } from './types/redis-client.type';
import { Redis } from 'ioredis';
//import { InjectRedis } from '@liaoliaots/nestjs-redis'; //NEED TO DELETE

@Injectable()
export class RedisService {
  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {}

  async get(key: string) {
    return await this.redis.get(key);
  }

  async set(key: string, seconds: number, value: any) {
    await this.redis.setex(key, seconds, value);
  }

}
