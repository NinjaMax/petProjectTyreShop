import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Orders } from './entities/order.model';
import { Order_Storage } from './entities/order-storage.model';
import { OrdersStorageService } from './orders-storage.service';
import { AuthModule } from '../auth/auth.module';
import { BasketModule } from '../basket/basket.module';
import { PricesModule } from '../prices/prices.module';
import { StockModule } from '../stock/stock.module';
import { StorageModule } from '../storage/storage.module';
import { TyresModule } from '../tyres/tyres.module';
import { UsersModule } from '../users/users.module';
import { CustomersModule } from '../customers/customers.module';
import { SuppliersModule } from '../suppliers/suppliers.module';
import { OrdersSuppliersModule } from '../orders-suppliers/orders-suppliers.module';
import { OrdersSuppliersService } from 'src/orders-suppliers/orders-suppliers.service';
import { OrdersSupplier } from '../orders-suppliers/entities/orders-supplier.model';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, OrdersStorageService],
  imports: [
    SequelizeModule.forFeature([Orders, Order_Storage]),
    BasketModule,
    StockModule,
    UsersModule,
    TyresModule,
    PricesModule,
    StorageModule,
    AuthModule,
    CustomersModule,
    SuppliersModule,
    //OrdersSuppliersModule,
    forwardRef(() => OrdersSuppliersModule),
  ],
  exports: [OrdersService, OrdersStorageService],
})
export class OrdersModule {}
