import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { Basket } from './entities/basket.model';
//import { Users } from 'src/users/entities/users.model';
//import { Orders } from 'src/orders/entities/order.model';
//import { OrdersModule } from 'src/orders/orders.module';

@Module({
  controllers: [BasketController],
  providers: [BasketService],
  imports: [
  SequelizeModule.forFeature([Basket]),
  
  ],
  exports: [BasketService],
})
export class BasketModule {}
