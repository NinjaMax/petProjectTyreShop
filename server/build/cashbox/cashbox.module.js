var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CashboxService } from './cashbox.service';
import { CashboxController } from './cashbox.controller';
import { Cashbox } from './entities/cashbox.model';
import { AuthModule } from '../auth/auth.module';
let CashboxModule = class CashboxModule {
};
CashboxModule = __decorate([
    Module({
        controllers: [CashboxController],
        providers: [CashboxService],
        imports: [
            SequelizeModule.forFeature([Cashbox]),
            AuthModule
        ],
        exports: [CashboxService]
    })
], CashboxModule);
export { CashboxModule };
