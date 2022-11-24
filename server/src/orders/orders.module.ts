import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Orders } from './entities/order.model';
import { StockModule } from 'src/stock/stock.module';
import { BasketModule } from 'src/basket/basket.module';
import { UsersModule } from 'src/users/users.module';
import { Order_Storage } from './entities/order-storage.model';
import { TyresModule } from 'src/tyres/tyres.module';
import { PricesModule } from 'src/prices/prices.module';
import { StorageModule } from 'src/storage/storage.module';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    SequelizeModule.forFeature([Orders, Order_Storage]),
    BasketModule, StockModule, UsersModule, TyresModule,
    PricesModule, StorageModule
  ],
  exports:[OrdersService],
})
export class OrdersModule {}
