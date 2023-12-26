import { Module } from '@nestjs/common';
import { SmsFlyApiService } from './sms-fly-api.service';
import { SmsFlyApiController } from './sms-fly-api.controller';
import { ConfigModule } from '../config/config.module';

@Module({
  controllers: [SmsFlyApiController],
  providers: [SmsFlyApiService],
  imports: [ConfigModule],
  exports: [SmsFlyApiService],
})
export class SmsFlyApiModule {}
