import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TyresService } from './tyres.service';
import { TyresController } from './tyres.controller';
import { Tyres } from './entities/tyres.model';
import { PriceTyres } from '../prices/entities/price-tyres.model';
import {StockTyres} from '../stock/entities/stock-tyres.model';
//import { PricesModule } from '../prices/prices.module';
import { StockModule } from '../stock/stock.module';

@Module({
  controllers: [TyresController],
  providers: [TyresService],
  imports: [
    SequelizeModule.forFeature([Tyres, PriceTyres, StockTyres]),
    forwardRef(() => StockModule),
  ],
  exports: [TyresService]
})
export class TyresModule {}
