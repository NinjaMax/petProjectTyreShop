import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: `.env`
 }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Service, UserService],
      autoLoadModels: true
  }),
    UsersModule, TyresModule, WheelsModule, BatteriesModule,
    OilsModule, SuppliersModule, BasketModule, OrdersModule, 
    PricesModule, PropertiesModule, OrdersSuppliersModule, 
    PostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
