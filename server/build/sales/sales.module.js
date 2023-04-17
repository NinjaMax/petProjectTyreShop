var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { Sales } from './entities/sale.model';
import { SaleStorage } from './entities/sales-storage.model';
import { SalesStorageService } from './sales-storage.service';
import { AuthModule } from '../auth/auth.module';
import { ContractModule } from '../contract/contract.module';
import { OrdersModule } from '../orders/orders.module';
import { StockModule } from '../stock/stock.module';
let SalesModule = class SalesModule {
};
SalesModule = __decorate([
    Module({
        controllers: [SalesController],
        providers: [SalesService, SalesStorageService],
        imports: [
            SequelizeModule.forFeature([Sales, SaleStorage]),
            StockModule, OrdersModule, ContractModule, AuthModule
        ],
        exports: [SalesService]
    })
], SalesModule);
export { SalesModule };
