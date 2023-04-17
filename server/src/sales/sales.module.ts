import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { Sales } from './entities/sale.model';
import { SaleStorage } from './entities/sales-storage.model';
import { SalesStorageService } from './sales-storage.service';
import { AuthModule } from '../auth/auth.module';
import { ContractModule } from '../contract/contract.module';
import { OrdersModule } from '../orders/orders.module';
import { StockModule } from '../stock/stock.module';


@Module({
  controllers: [SalesController],
  providers: [SalesService, SalesStorageService],
  imports: [ 
    SequelizeModule.forFeature([Sales, SaleStorage]),
    StockModule, OrdersModule, ContractModule, AuthModule
  ],
  exports: [SalesService]
})
export class SalesModule {}
