import { Module } from '@nestjs/common';
//import { AppController } from './app.controller';
//import { AppService } from './app.service';
import { TyresModule } from './tyres/tyres.module';
//import { WheelsModule } from './wheels/wheels.module';
//import { BatteriesModule } from './batteries/batteries.module';
//import { OilsModule } from './oils/oils.module';
import { SuppliersModule } from './suppliers/suppliers.module';
//import { BasketModule } from './basket/basket.module';
//import { OrdersModule } from './orders/orders.module';
import { PricesModule } from './prices/prices.module';
//import { PropertiesModule } from './properties/properties.module';
//import { OrdersSuppliersModule } from './orders-suppliers/orders-suppliers.module';
//import { PostsModule } from './posts/posts.module';
import { PriceTyres } from './prices/entities/price-tyres.model';
import { Tyres } from './tyres/entities/tyres.model';
import { Supplier } from './suppliers/entities/supplier.model';
import { StockTyres } from './stock/entities/stock-tyres.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { StockModule } from './stock/stock.module';
import { ReviewsModule } from './reviews/reviews.module';
import { RatingsModule } from './ratings/ratings.module';
import { RatingTyres } from './ratings/entities/rating-tyres.model';
import { ReviewTyres } from './reviews/entities/review-tyres.model';
import { TyreBrand } from './properties/entities/tyre-brand.model';
import { TyreModel } from './properties/entities/tyre-model.model';
import { PropertiesModule } from './properties/properties.module';
import { UsersModule } from './users/users.module';
//import { Users } from './users/entities/users.model';

@Module({
  imports: [
    
    SequelizeModule.forRootAsync({
      imports: [ConfigModule.register(
      { folder: './config' }
      ),],
      useFactory:  (configService: ConfigService) => ({
      dialect: 'postgres',
      host: configService.get('POSTGRES_HOST'),
      port: +configService.get('POSTGRES_PORT'),
      username: configService.get('POSTGRES_USER'),
      password: configService.get('POSTGRES_PASSWORD'),
      database: configService.get('POSTGRES_DB'),
      models: [Tyres, Supplier, StockTyres, PriceTyres,
      RatingTyres, ReviewTyres, TyreBrand, TyreModel,
      ],
      autoLoadModels: true,
      synchronize: true,
      }), inject: [ConfigService],
    }),
      TyresModule, PricesModule, StockModule,
      SuppliersModule, ReviewsModule, RatingsModule,
      PropertiesModule, UsersModule
  ],
  controllers: [],
  providers: [],
  
})
export class AppModule {}
