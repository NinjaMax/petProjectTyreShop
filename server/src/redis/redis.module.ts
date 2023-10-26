import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { ConfigModule } from '../config/config.module';
import { REDIS_CLIENT } from './types/redis-client.type';
import { redisClientFactory } from './redis-client.factory';

@Global()
@Module({
  imports: [ConfigModule],
  exports: [RedisService, REDIS_CLIENT],
  providers: [RedisService, redisClientFactory],
})
export class RedisModule {}
