var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { WheelsService } from './wheels.service';
import { WheelsController } from './wheels.controller';
import { Wheel } from './entities/wheel.model';
import { AuthModule } from '../auth/auth.module';
let WheelsModule = class WheelsModule {
};
WheelsModule = __decorate([
    Module({
        controllers: [WheelsController],
        providers: [WheelsService],
        imports: [SequelizeModule.forFeature([Wheel]), forwardRef(() => AuthModule)],
        exports: [WheelsService],
    })
], WheelsModule);
export { WheelsModule };
