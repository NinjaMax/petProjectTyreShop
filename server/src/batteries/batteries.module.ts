import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BatteriesService } from './batteries.service';
import { BatteriesController } from './batteries.controller';
import { Battery } from './entities/battery.model';

@Module({
  controllers: [BatteriesController],
  providers: [BatteriesService], 
  imports: [
    SequelizeModule.forFeature([Battery]),
  ],
  exports:[BatteriesService],
})
export class BatteriesModule {}
