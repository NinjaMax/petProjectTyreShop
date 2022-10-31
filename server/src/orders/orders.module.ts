import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Orders } from './entities/order.model';
import { Users } from 'src/users/entities/users.model';
import { Basket } from 'src/basket/entities/basket.model';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    SequelizeModule.forFeature([Orders, Users, Basket]),
    
  ],
  exports:[OrdersService],
})
export class OrdersModule {}
