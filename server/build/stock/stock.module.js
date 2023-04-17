var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { StockTyresService } from './stock-tyres.service';
import { StockTyresController } from './stock-tyres.controller';
import { StockTyres } from './entities/stock-tyres.model';
import { TyresModule } from '../tyres/tyres.module';
import { SuppliersModule } from '../suppliers/suppliers.module';
import { StockWheels } from './entities/stock-wheels.model';
import { StockOils } from './entities/stock-oils.model';
import { StockBatteries } from './entities/stock-batteries.model';
import { StockWheelsService } from './stock-wheels.service';
import { StockOilsService } from './stock-oils.service';
import { StockBatteriesService } from './stock-batteries.service';
import { StockWheelsController } from './stock-wheels.controller';
import { StockBatteriesController } from './stock-batteries.controller';
import { StockOilsController } from './stock-oils.controller';
import { AuthModule } from '../auth/auth.module';
import { BatteriesModule } from '../batteries/batteries.module';
import { OilsModule } from '../oils/oils.module';
import { StorageModule } from '../storage/storage.module';
import { WheelsModule } from '../wheels/wheels.module';
let StockModule = class StockModule {
};
StockModule = __decorate([
    Module({
        controllers: [StockTyresController, StockWheelsController,
            StockBatteriesController, StockOilsController],
        providers: [StockTyresService, StockWheelsService,
            StockOilsService, StockBatteriesService],
        imports: [
            SequelizeModule.forFeature([StockTyres, StockWheels, StockOils,
                StockBatteries]),
            forwardRef(() => TyresModule), SuppliersModule, StorageModule,
            WheelsModule, OilsModule, BatteriesModule, AuthModule
        ],
        exports: [StockTyresService, StockWheelsService,
            StockOilsService, StockBatteriesService]
    })
], StockModule);
export { StockModule };
