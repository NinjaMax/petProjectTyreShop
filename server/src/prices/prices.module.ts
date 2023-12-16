import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PriceTyresService } from './price-tyres.service';
import { PriceTyresController } from './price-tyres.controller';
import { Tyres } from '../tyres/entities/tyres.model';
import { PriceTyres } from '../prices/entities/price-tyres.model';
import { PriceWheels } from './entities/price-wheels.model';
import { PriceOil } from './entities/price-oils.model';
import { PriceBatteries } from './entities/price-battery.model';
import { PriceWheelsService } from './price-wheels.service';
import { PriceWheelsController } from './price-wheels.controller';
import { AuthModule } from '../auth/auth.module';
import { BatteriesModule } from '../batteries/batteries.module';
import { OilsModule } from '../oils/oils.module';
import { StorageModule } from '../storage/storage.module';
import { SuppliersModule } from '../suppliers/suppliers.module';
import { TyresModule } from '../tyres/tyres.module';
import { WheelsModule } from '../wheels/wheels.module';
import { PriceBatteryService } from './price-batteries.service';
import { PriceOilsService } from './price-oils.service';
import { PriceBatteriesController } from './price-batteries.controller';
import { PriceOilsController } from './price-oils.controller';

@Module({
  controllers: [
    PriceTyresController,
    PriceWheelsController,
    PriceBatteriesController,
    PriceOilsController,
  ],
  providers: [
    PriceTyresService,
    PriceWheelsService,
    PriceBatteryService,
    PriceOilsService,
  ],
  imports: [ 
    SequelizeModule.forFeature([
      PriceTyres,
      PriceWheels,
      PriceOil,
      PriceBatteries,
    ]),
    TyresModule,
    WheelsModule,
    OilsModule,
    BatteriesModule,
    SuppliersModule,
    StorageModule,
    AuthModule,
  ],
  exports: [
    PriceTyresService,
    PriceWheelsService,
    PriceBatteryService,
    PriceOilsService,
  ]
})
export class PricesModule {}
