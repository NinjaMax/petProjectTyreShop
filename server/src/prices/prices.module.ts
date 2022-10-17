import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PricesService } from './prices.service';
import { PricesController } from './prices.controller';
import { Tyres } from '../tyres/entities/tyres.model';
import { PriceTyres } from '../prices/entities/price-tyres.model';
import { Supplier } from 'src/suppliers/entities/supplier.model';
import { TyresModule } from 'src/tyres/tyres.module';
import { SuppliersModule } from 'src/suppliers/suppliers.module';

@Module({
  controllers: [PricesController],
  providers: [PricesService],
  imports: [ 
    SequelizeModule.forFeature([Tyres, PriceTyres, Supplier]),
    TyresModule, SuppliersModule
  ],
  exports: [PricesService]

})
export class PricesModule {}
