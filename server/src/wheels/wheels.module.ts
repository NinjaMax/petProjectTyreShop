import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { WheelsService } from './wheels.service';
import { WheelsController } from './wheels.controller';
import { Wheel } from './entities/wheel.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [WheelsController],
  providers: [WheelsService],
  imports: [
    SequelizeModule.forFeature([Wheel]),
    AuthModule
  ],
  exports:[WheelsService],
})
export class WheelsModule {}
