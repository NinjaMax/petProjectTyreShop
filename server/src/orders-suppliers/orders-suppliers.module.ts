import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrdersSuppliersService } from './orders-suppliers.service';
import { OrdersSuppliersController } from './orders-suppliers.controller';
import { OrdersSupplier } from './entities/orders-supplier.model';
import { OrdersSupStorage } from './entities/orders-sup-storage.model';
import { OrdersSupStorageService } from './orders-sup-storage.service';
import { AuthModule } from '../auth/auth.module';
import { ContractModule } from '../contract/contract.module';
import { OrdersModule } from '../orders/orders.module';
import { StockModule } from '../stock/stock.module';
import { SuppliersModule } from 'src/suppliers/suppliers.module';


@Module({
  controllers: [OrdersSuppliersController],
  providers: [OrdersSuppliersService, OrdersSupStorageService],
  imports: [
    SequelizeModule.forFeature([OrdersSupplier, OrdersSupStorage]),
    OrdersModule, 
    StockModule, 
    ContractModule, 
    AuthModule,
    SuppliersModule
  ],
  exports: [OrdersSuppliersService, OrdersSupStorageService],
})
export class OrdersSuppliersModule {}
