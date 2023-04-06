import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { Basket } from './entities/basket.model';
import { AuthModule } from 'src/auth/auth.module';
//import { Users } from 'src/users/entities/users.model';
//import { Orders } from 'src/orders/entities/order.model';
//import { OrdersModule } from 'src/orders/orders.module';

@Module({
  controllers: [BasketController],
  providers: [BasketService],
  imports: [
  SequelizeModule.forFeature([Basket]),
  AuthModule
  ],
  exports: [BasketService],
})
export class BasketModule {}
