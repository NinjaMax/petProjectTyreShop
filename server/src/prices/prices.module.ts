import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PriceTyresService } from './price-tyres.service';
import { PriceTyresController } from './price-tyres.controller';
import { Tyres } from '../tyres/entities/tyres.model';
import { PriceTyres } from '../prices/entities/price-tyres.model';
import { Supplier } from 'src/suppliers/entities/supplier.model';
import { TyresModule } from 'src/tyres/tyres.module';
import { SuppliersModule } from 'src/suppliers/suppliers.module';

@Module({
  controllers: [PriceTyresController],
  providers: [PriceTyresService],
  imports: [ 
    SequelizeModule.forFeature([Tyres, PriceTyres, Supplier]),
    TyresModule, SuppliersModule
  ],
  exports: [PriceTyresService]

})
export class PricesModule {}
