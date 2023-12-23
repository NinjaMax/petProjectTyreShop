import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SuppliersService } from './suppliers.service';
import { SuppliersController } from './suppliers.controller';
import { Supplier } from './entities/supplier.model';
import { Tyres } from '../tyres/entities/tyres.model';
import { StockTyres } from '../stock/entities/stock-tyres.model';
import { AuthModule } from '../auth/auth.module';
import { ContractModule } from '../contract/contract.module';
import { OrdersSuppliersModule } from '../orders-suppliers/orders-suppliers.module';

@Module({
  controllers: [SuppliersController],
  providers: [SuppliersService],
  imports: [ 
    SequelizeModule.forFeature([Supplier, StockTyres, Tyres]),
    ContractModule,
    AuthModule,
    forwardRef(() => OrdersSuppliersModule),
  ],
  exports: [SuppliersService],
})
export class SuppliersModule {}
