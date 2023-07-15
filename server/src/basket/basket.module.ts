import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { Basket } from './entities/basket.model';
import { AuthModule } from '../auth/auth.module';
import { Basket_Storage } from './entities/basket-storage.model';
import { BasketStorageService } from './basket-storage.service';

@Module({
  controllers: [BasketController],
  providers: [BasketService, BasketStorageService],
  imports: [SequelizeModule.forFeature([Basket, Basket_Storage]), AuthModule],
  exports: [BasketService],
})
export class BasketModule {}
