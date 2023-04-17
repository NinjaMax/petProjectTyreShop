import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategorysService } from './categorys.service';
import { CategorysController } from './categorys.controller';
import { Category } from './entities/category.model';
import { Tyres } from '../tyres/entities/tyres.model';
import { TyresModule } from '../tyres/tyres.module';
import { Wheel } from '../wheels/entities/wheel.model';
import { WheelsModule } from '../wheels/wheels.module';

@Module({
  controllers: [CategorysController],
  providers: [CategorysService], 
  imports: [
    SequelizeModule.forFeature([Category, Tyres, Wheel]),
    TyresModule, WheelsModule
  ],
  exports:[CategorysService],
})
export class CategorysModule {}
