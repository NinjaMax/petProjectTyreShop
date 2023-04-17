import { Module } from '@nestjs/common';
import { UploaderService } from './uploader.service';
import { UploaderController } from './uploader.controller';
import { MulterModule } from '@nestjs/platform-express';
import { TyresModule } from '../tyres/tyres.module';
import { PricesModule } from '../prices/prices.module';
import { StockModule } from '../stock/stock.module';
import { SuppliersModule } from '../suppliers/suppliers.module';
import { PropertiesModule } from '../properties/properties.module';
import { CategorysModule } from '../categorys/categorys.module';
import { AddTyresToDbService } from './addTyresToDataBase.service';
import { UploaderPaprserService } from './uploaderParser.service';
import { AddWheelsToDbService } from './addWheelToDataBase.service';
import { WheelsModule } from '../wheels/wheels.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [UploaderController],
  providers: [UploaderService, AddTyresToDbService,AddWheelsToDbService,
     UploaderPaprserService], 
  imports: [MulterModule.register({
    dest: './upload_prices',
  }), AuthModule,
    TyresModule, PricesModule, StockModule, WheelsModule,
     SuppliersModule, PropertiesModule, CategorysModule],
  exports: [UploaderService]
})
export class UploaderModule {}
