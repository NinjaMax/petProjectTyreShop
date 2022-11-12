import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Orders } from './entities/order.model';
//import { Users } from 'src/users/entities/users.model';
//import { Basket } from 'src/basket/entities/basket.model';
import { StockModule } from 'src/stock/stock.module';
import { BasketModule } from 'src/basket/basket.module';
import { UsersModule } from 'src/users/users.module';
import { OrderStorage } from './entities/order-storage.model';
import { TyresModule } from 'src/tyres/tyres.module';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    SequelizeModule.forFeature([Orders, OrderStorage]),
    BasketModule, StockModule, UsersModule, TyresModule
  ],
  exports:[OrdersService],
})
export class OrdersModule {}
