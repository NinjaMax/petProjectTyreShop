import { Module } from '@nestjs/common';
//import { AppController } from './app.controller';
//import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TyresModule } from './tyres/tyres.module';
import { WheelsModule } from './wheels/wheels.module';
import { BatteriesModule } from './batteries/batteries.module';
import { OilsModule } from './oils/oils.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { BasketModule } from './basket/basket.module';
import { OrdersModule } from './orders/orders.module';
import { PricesModule } from './prices/prices.module';
import { PropertiesModule } from './properties/properties.module';
import { OrdersSuppliersModule } from './orders-suppliers/orders-suppliers.module';
import { PostsModule } from './posts/posts.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';

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
      models: [],
      autoLoadModels: true,
      synchronize: true,
      }), inject: [ConfigService],
    }),
      UsersModule, TyresModule, WheelsModule, BatteriesModule,
      OilsModule, SuppliersModule, BasketModule, OrdersModule, 
      PricesModule, PropertiesModule, OrdersSuppliersModule, 
      PostsModule
  ],
  controllers: [],
  providers: [],
  
})
export class AppModule {}
