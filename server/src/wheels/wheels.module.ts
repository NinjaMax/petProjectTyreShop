import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { WheelsService } from './wheels.service';
import { WheelsController } from './wheels.controller';
import { Wheel } from './entities/wheel.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [WheelsController],
  providers: [WheelsService],
  imports: [SequelizeModule.forFeature([Wheel]), forwardRef(() => AuthModule)],
  exports:[WheelsService],
})
export class WheelsModule {}
