import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { Sales } from './entities/sale.model';
import { StockModule } from 'src/stock/stock.module';
//import { StockTyres } from 'src/stock/entities/stock-tyres.model';
//import { StockWheels } from 'src/stock/entities/stock-wheels.model';
//import { StockOils } from 'src/stock/entities/stock-oils.model';
//import { StockBatteries } from 'src/stock/entities/stock-batteries.model';
import { SaleStorage } from './entities/sales-storage.model';
import { OrdersModule } from 'src/orders/orders.module';
import { SalesStorageService } from './sales-storage.service';
import { ContractModule } from 'src/contract/contract.module';

@Module({
  controllers: [SalesController],
  providers: [SalesService, SalesStorageService],
  imports: [ 
    SequelizeModule.forFeature([Sales, SaleStorage]),
    StockModule, OrdersModule, ContractModule
  ],
  exports: [SalesService]
})
export class SalesModule {}
