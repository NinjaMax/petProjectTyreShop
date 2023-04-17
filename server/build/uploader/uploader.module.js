var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { UploaderService } from './uploader.service';
import { UploaderController } from './uploader.controller';
import { MulterModule } from '@nestjs/platform-express';
import { TyresModule } from '../tyres/tyres.module';
import { PricesModule } from '../prices/prices.module';
import { StockModule } from '../stock/stock.module';
import { SuppliersModule } from '../suppliers/suppliers.module';
import { PropertiesModule } from '../properties/properties.module';
import { CategorysModule } from '../categorys/categorys.module';
import { AddTyresToDbService } from './addTyresToDataBase.service';
import { UploaderPaprserService } from './uploaderParser.service';
import { AddWheelsToDbService } from './addWheelToDataBase.service';
import { WheelsModule } from '../wheels/wheels.module';
import { AuthModule } from '../auth/auth.module';
let UploaderModule = class UploaderModule {
};
UploaderModule = __decorate([
    Module({
        controllers: [UploaderController],
        providers: [UploaderService, AddTyresToDbService, AddWheelsToDbService,
            UploaderPaprserService],
        imports: [MulterModule.register({
                dest: './upload_prices',
            }), AuthModule,
            TyresModule, PricesModule, StockModule, WheelsModule,
            SuppliersModule, PropertiesModule, CategorysModule],
        exports: [UploaderService]
    })
], UploaderModule);
export { UploaderModule };
