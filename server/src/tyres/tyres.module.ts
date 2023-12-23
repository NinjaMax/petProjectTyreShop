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
import { RedisModule } from '../redis/redis.module';

//import { PropertiesTyreModule } from 'src/properties/propertiesTyre.module';

@Module({
  controllers: [TyresController],
  providers: [TyresService],
  imports: [
    SequelizeModule.forFeature([
      Tyres,
      PriceTyres,
      StockTyres,
      Supplier,
      TyreModel,
      TyreBrand,
      RatingTyres,
      ReviewTyres,
    ]),
    forwardRef(() => StockModule),
    SuppliersModule,
    AuthModule,
    RedisModule,
  ],
  exports: [TyresService],
})
export class TyresModule {}
