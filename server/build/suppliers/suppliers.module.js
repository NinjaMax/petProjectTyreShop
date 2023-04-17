var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SuppliersService } from './suppliers.service';
import { SuppliersController } from './suppliers.controller';
import { Supplier } from './entities/supplier.model';
import { Tyres } from '../tyres/entities/tyres.model';
import { StockTyres } from '../stock/entities/stock-tyres.model';
import { AuthModule } from '../auth/auth.module';
import { ContractModule } from '../contract/contract.module';
let SuppliersModule = class SuppliersModule {
};
SuppliersModule = __decorate([
    Module({
        controllers: [SuppliersController],
        providers: [SuppliersService],
        imports: [
            SequelizeModule.forFeature([Supplier, StockTyres, Tyres]),
            ContractModule, AuthModule
        ],
        exports: [SuppliersService],
    })
], SuppliersModule);
export { SuppliersModule };
