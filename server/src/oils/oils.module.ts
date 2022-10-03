import { Module } from '@nestjs/common';
import { OilsService } from './oils.service';
import { OilsController } from './oils.controller';

@Module({
  controllers: [OilsController],
  providers: [OilsService]
})
export class OilsModule {}
