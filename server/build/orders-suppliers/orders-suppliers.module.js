var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrdersSuppliersService } from './orders-suppliers.service';
import { OrdersSuppliersController } from './orders-suppliers.controller';
import { OrdersSupplier } from './entities/orders-supplier.model';
import { OrdersSupStorage } from './entities/orders-sup-storage.model';
import { OrdersSupStorageService } from './orders-sup-storage.service';
import { AuthModule } from '../auth/auth.module';
import { ContractModule } from '../contract/contract.module';
import { OrdersModule } from '../orders/orders.module';
import { StockModule } from '../stock/stock.module';
let OrdersSuppliersModule = class OrdersSuppliersModule {
};
OrdersSuppliersModule = __decorate([
    Module({
        controllers: [OrdersSuppliersController],
        providers: [OrdersSuppliersService, OrdersSupStorageService],
        imports: [
            SequelizeModule.forFeature([OrdersSupplier, OrdersSupStorage]),
            OrdersModule, StockModule, ContractModule, AuthModule
        ],
        exports: [OrdersSuppliersService, OrdersSupStorageService],
    })
], OrdersSuppliersModule);
export { OrdersSuppliersModule };