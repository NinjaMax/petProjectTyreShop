import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { Tyres } from '../tyres/entities/tyres.model';
import { StockTyres } from './entities/stock-tyres.model';
import { Supplier } from '../suppliers/entities/supplier.model';
import { TyresModule } from '../tyres/tyres.module';

@Module({
  controllers: [StockController],
  providers: [StockService],
  imports: [ 
    SequelizeModule.forFeature([Tyres, StockTyres, Supplier]),
    forwardRef(() => TyresModule),
  ],
  exports: [StockService]
})
export class StockModule {}