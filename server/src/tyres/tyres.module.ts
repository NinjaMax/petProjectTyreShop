import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TyresService } from './tyres.service';
import { TyresController } from './tyres.controller';
import { Tyres } from './entities/tyres.model';
import { PriceTyres } from '../prices/entities/price-tyres.model';
import {StockTyres} from '../stock/entities/stock-tyres.model';
import { Supplier } from 'src/suppliers/entities/supplier.model';
import { SuppliersModule } from '../suppliers/suppliers.module';
import { StockModule } from '../stock/stock.module';
import { TyreModel } from 'src/properties/entities/tyres/tyre-model.model';
import { TyreBrand } from 'src/properties/entities/tyres/tyre-brand.model';
import { RatingTyres } from 'src/ratings/entities/rating-tyres.model';
import { ReviewTyres } from 'src/reviews/entities/review-tyres.model';
import { PropertiesTyreModule } from 'src/properties/propertiesTyre.module';

@Module({
  controllers: [TyresController],
  providers: [TyresService],
  imports: [
    SequelizeModule.forFeature([Tyres, PriceTyres, StockTyres, Supplier, 
    TyreModel, TyreBrand, RatingTyres, ReviewTyres]),
    forwardRef(() => StockModule), 
    SuppliersModule, PropertiesTyreModule 

  ],
  exports: [TyresService]
})
export class TyresModule {}
