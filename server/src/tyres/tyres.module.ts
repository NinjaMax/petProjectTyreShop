import { Module } from '@nestjs/common';
import { TyresService } from './tyres.service';
import { TyresController } from './tyres.controller';

@Module({
  controllers: [TyresController],
  providers: [TyresService]
})
export class TyresModule {}
