import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SuppliersService } from './suppliers.service';
import { SuppliersController } from './suppliers.controller';
import { Supplier } from './entities/supplier.model';
import { Tyres } from '../tyres/entities/tyres.model';
import { StockTyres } from '../stock/entities/stock-tyres.model';
import { ContractModule } from 'src/contract/contract.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [SuppliersController],
  providers: [SuppliersService],
  imports: [ 
    SequelizeModule.forFeature([Supplier, StockTyres, Tyres ]),
    ContractModule, AuthModule
  ],
  exports:[SuppliersService],
})
export class SuppliersModule {}
