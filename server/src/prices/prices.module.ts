import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PriceTyresService } from './price-tyres.service';
import { PriceTyresController } from './price-tyres.controller';
import { Tyres } from '../tyres/entities/tyres.model';
import { PriceTyres } from '../prices/entities/price-tyres.model';
import { Supplier } from 'src/suppliers/entities/supplier.model';
import { TyresModule } from 'src/tyres/tyres.module';
import { SuppliersModule } from 'src/suppliers/suppliers.module';
import { StorageModule } from 'src/storage/storage.module';
import { WheelsModule } from 'src/wheels/wheels.module';
import { OilsModule } from 'src/oils/oils.module';
import { BatteriesModule } from 'src/batteries/batteries.module';
import { PriceWheels } from './entities/price-wheels.model';
import { PriceOil } from './entities/price-oils.model';
import { PriceBatteries } from './entities/price-battery.model';
import { PriceWheelsService } from './price-wheels.service';
import { PriceWheelsController } from './price-wheels.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [PriceTyresController, PriceWheelsController],
  providers: [PriceTyresService, PriceWheelsService],
  imports: [ 
    SequelizeModule.forFeature([ PriceTyres, PriceWheels, PriceOil, 
      PriceBatteries]),
    TyresModule, WheelsModule, OilsModule, BatteriesModule, 
    SuppliersModule, StorageModule, AuthModule
  ],
  exports: [PriceTyresService, PriceWheelsService]

})
export class PricesModule {}
