import { FactoryProvider } from '@nestjs/common';
import { REDIS_CLIENT } from './types/redis-client.type';
import { ConfigService } from '../config/config.service';
import Redis from 'ioredis';

export const redisClientFactory: FactoryProvider<Redis> = {
  provide: REDIS_CLIENT,
  useFactory: async (configService: ConfigService) => {
    const redisStore = new Redis({
      host: configService.get('REDIS_HOST'),
      port: +configService.get('REDIS_PORT'),
    });
    redisStore.on('error', (e) => {
      throw new Error(`Redis connection failed: ${e}`);
    });
    return redisStore;
  },
  inject: [ConfigService],
};
