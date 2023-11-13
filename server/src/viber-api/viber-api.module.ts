import { Module } from '@nestjs/common';
import { ViberApiService } from './viber-api.service';
import { ViberApiController } from './viber-api.controller';

@Module({
  controllers: [ViberApiController],
  providers: [ViberApiService]
})
export class ViberApiModule {}
