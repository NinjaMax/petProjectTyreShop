import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { StockTyresService } from './stock-tyres.service';
import { StockTyresController } from './stock-tyres.controller';
import { Tyres } from '../tyres/entities/tyres.model';
import { StockTyres } from './entities/stock-tyres.model';
import { Supplier } from '../suppliers/entities/supplier.model';
import { TyresModule } from '../tyres/tyres.module';
import { SuppliersModule } from '../suppliers/suppliers.module';

@Module({
  controllers: [StockTyresController],
  providers: [StockTyresService],
  imports: [ 
    SequelizeModule.forFeature([StockTyres, Tyres, Supplier]),
    forwardRef(() => TyresModule), SuppliersModule
  ],
  exports: [StockTyresService]
})
export class StockModule {}
