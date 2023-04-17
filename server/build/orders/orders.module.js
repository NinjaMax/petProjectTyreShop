var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Orders } from './entities/order.model';
import { Order_Storage } from './entities/order-storage.model';
import { OrdersStorageService } from './orders-storage.service';
import { AuthModule } from '../auth/auth.module';
import { BasketModule } from '../basket/basket.module';
import { PricesModule } from '../prices/prices.module';
import { StockModule } from '../stock/stock.module';
import { StorageModule } from '../storage/storage.module';
import { TyresModule } from '../tyres/tyres.module';
import { UsersModule } from '../users/users.module';
let OrdersModule = class OrdersModule {
};
OrdersModule = __decorate([
    Module({
        controllers: [OrdersController],
        providers: [OrdersService, OrdersStorageService],
        imports: [
            SequelizeModule.forFeature([Orders, Order_Storage]),
            BasketModule, StockModule, UsersModule, TyresModule,
            PricesModule, StorageModule, AuthModule
        ],
        exports: [OrdersService, OrdersStorageService],
    })
], OrdersModule);
export { OrdersModule };
