import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BatteriesService } from './batteries.service';
import { BatteriesController } from './batteries.controller';
import { Battery } from './entities/battery.model';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [BatteriesController],
  providers: [BatteriesService], 
  imports: [
    SequelizeModule.forFeature([Battery]),
    AuthModule
  ],
  exports:[BatteriesService],
})
export class BatteriesModule {}
