var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategorysService } from './categorys.service';
import { CategorysController } from './categorys.controller';
import { Category } from './entities/category.model';
import { Tyres } from '../tyres/entities/tyres.model';
import { TyresModule } from '../tyres/tyres.module';
import { Wheel } from '../wheels/entities/wheel.model';
import { WheelsModule } from '../wheels/wheels.module';
let CategorysModule = class CategorysModule {
};
CategorysModule = __decorate([
    Module({
        controllers: [CategorysController],
        providers: [CategorysService],
        imports: [
            SequelizeModule.forFeature([Category, Tyres, Wheel]),
            TyresModule, WheelsModule
        ],
        exports: [CategorysService],
    })
], CategorysModule);
export { CategorysModule };
