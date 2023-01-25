import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategorysService } from './categorys.service';
import { CategorysController } from './categorys.controller';
import { Category } from './entities/category.model';
import { Tyres } from 'src/tyres/entities/tyres.model';
import { TyresModule } from 'src/tyres/tyres.module';
import { WheelsModule } from 'src/wheels/wheels.module';
import { Wheel } from 'src/wheels/entities/wheel.model';

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
