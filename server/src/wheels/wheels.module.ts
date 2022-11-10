import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { WheelsService } from './wheels.service';
import { WheelsController } from './wheels.controller';
import { Wheel } from './entities/wheel.model';

@Module({
  controllers: [WheelsController],
  providers: [WheelsService],
  imports: [
    SequelizeModule.forFeature([Wheel]),
  ],
  exports:[WheelsService],
})
export class WheelsModule {}
