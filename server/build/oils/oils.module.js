var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OilsService } from './oils.service';
import { OilsController } from './oils.controller';
import { Oil } from './entities/oil.model';
import { AuthModule } from '../auth/auth.module';
let OilsModule = class OilsModule {
};
OilsModule = __decorate([
    Module({
        controllers: [OilsController],
        providers: [OilsService],
        imports: [
            SequelizeModule.forFeature([Oil]),
            AuthModule
        ],
        exports: [OilsService],
    })
], OilsModule);
export { OilsModule };
