var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';
import { Contract } from './entities/contract.model';
import { AuthModule } from '../auth/auth.module';
let ContractModule = class ContractModule {
};
ContractModule = __decorate([
    Module({
        controllers: [ContractController],
        providers: [ContractService],
        imports: [
            SequelizeModule.forFeature([Contract]),
            AuthModule
        ],
        exports: [ContractService]
    })
], ContractModule);
export { ContractModule };
