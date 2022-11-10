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

@Module({
  controllers: [SalesController],
  providers: [SalesService],
  imports: [ 
    SequelizeModule.forFeature([Sales, SaleStorage]),
    StockModule
  ],
  exports: [SalesService]
})
export class SalesModule {}
