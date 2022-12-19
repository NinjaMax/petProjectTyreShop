import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrdersSuppliersService } from './orders-suppliers.service';
import { OrdersSuppliersController } from './orders-suppliers.controller';
import { OrdersSupplier } from './entities/orders-supplier.model';
import { OrdersModule } from 'src/orders/orders.module';
import { OrdersSupStorage } from './entities/orders-sup-storage.model';
import { OrdersSupStorageService } from './orders-sup-storage.service';
import { StockModule } from 'src/stock/stock.module';
import { ContractModule } from 'src/contract/contract.module';

@Module({
  controllers: [OrdersSuppliersController],
  providers: [OrdersSuppliersService, OrdersSupStorageService],
  imports: [
    SequelizeModule.forFeature([OrdersSupplier, OrdersSupStorage]),
    OrdersModule, StockModule, ContractModule
  ],
  exports:[OrdersSuppliersService, OrdersSupStorageService],
})
export class OrdersSuppliersModule {}
