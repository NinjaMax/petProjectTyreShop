import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { StockTyresService } from './stock-tyres.service';
import { StockTyresController } from './stock-tyres.controller';
import { StockTyres } from './entities/stock-tyres.model';
import { TyresModule } from '../tyres/tyres.module';
import { SuppliersModule } from '../suppliers/suppliers.module';
import { StorageModule } from 'src/storage/storage.module';
import { WheelsModule } from 'src/wheels/wheels.module';
import { OilsModule } from 'src/oils/oils.module';
import { BatteriesModule } from 'src/batteries/batteries.module';
import { StockWheels } from './entities/stock-wheels.model';
import { StockOils } from './entities/stock-oils.model';
import { StockBatteries } from './entities/stock-batteries.model';
import { StockWheelsService } from './stock-wheels.service';
import { StockOilsService } from './stock-oils.service';
import { StockBatteriesService } from './stock-batteries.service';
import { StockWheelsController } from './stock-wheels.controller';
import { StockBatteriesController } from './stock-batteries.controller';
import { StockOilsController } from './stock-oils.controller';

@Module({
  controllers: [StockTyresController, StockWheelsController,
    StockBatteriesController, StockOilsController],
  providers: [StockTyresService, StockWheelsService, 
    StockOilsService, StockBatteriesService],
  imports: [ 
    SequelizeModule.forFeature([StockTyres, StockWheels, StockOils,
    StockBatteries]),
    forwardRef(() => TyresModule), SuppliersModule, StorageModule,
    WheelsModule, OilsModule, BatteriesModule
  ],
  exports: [StockTyresService, StockWheelsService, 
    StockOilsService, StockBatteriesService]
})
export class StockModule {}
