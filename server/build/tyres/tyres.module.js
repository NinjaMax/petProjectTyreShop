var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TyresService } from './tyres.service';
import { TyresController } from './tyres.controller';
import { Tyres } from './entities/tyres.model';
import { PriceTyres } from '../prices/entities/price-tyres.model';
import { StockTyres } from '../stock/entities/stock-tyres.model';
import { SuppliersModule } from '../suppliers/suppliers.module';
import { StockModule } from '../stock/stock.module';
import { AuthModule } from '../auth/auth.module';
import { TyreBrand } from '../properties/entities/tyres/tyre-brand.model';
import { TyreModel } from '../properties/entities/tyres/tyre-model.model';
import { RatingTyres } from '../ratings/entities/rating-tyres.model';
import { ReviewTyres } from '../reviews/entities/review-tyres.model';
import { Supplier } from '../suppliers/entities/supplier.model';
let TyresModule = class TyresModule {
};
TyresModule = __decorate([
    Module({
        controllers: [TyresController],
        providers: [TyresService],
        imports: [
            SequelizeModule.forFeature([Tyres, PriceTyres, StockTyres, Supplier,
                TyreModel, TyreBrand, RatingTyres, ReviewTyres]),
            forwardRef(() => StockModule),
            SuppliersModule, AuthModule
        ],
        exports: [TyresService]
    })
], TyresModule);
export { TyresModule };
