var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PriceTyresService } from './price-tyres.service';
import { PriceTyresController } from './price-tyres.controller';
import { PriceTyres } from '../prices/entities/price-tyres.model';
import { PriceWheels } from './entities/price-wheels.model';
import { PriceOil } from './entities/price-oils.model';
import { PriceBatteries } from './entities/price-battery.model';
import { PriceWheelsService } from './price-wheels.service';
import { PriceWheelsController } from './price-wheels.controller';
import { AuthModule } from '../auth/auth.module';
import { BatteriesModule } from '../batteries/batteries.module';
import { OilsModule } from '../oils/oils.module';
import { StorageModule } from '../storage/storage.module';
import { SuppliersModule } from '../suppliers/suppliers.module';
import { TyresModule } from '../tyres/tyres.module';
import { WheelsModule } from '../wheels/wheels.module';
let PricesModule = class PricesModule {
};
PricesModule = __decorate([
    Module({
        controllers: [PriceTyresController, PriceWheelsController],
        providers: [PriceTyresService, PriceWheelsService],
        imports: [
            SequelizeModule.forFeature([PriceTyres, PriceWheels, PriceOil,
                PriceBatteries]),
            TyresModule, WheelsModule, OilsModule, BatteriesModule,
            SuppliersModule, StorageModule, AuthModule
        ],
        exports: [PriceTyresService, PriceWheelsService]
    })
], PricesModule);
export { PricesModule };
