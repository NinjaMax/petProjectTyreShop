import { Module } from '@nestjs/common';
import { UploaderService } from './uploader.service';
import { UploaderController } from './uploader.controller';
import { MulterModule } from '@nestjs/platform-express';
import { TyresModule } from 'src/tyres/tyres.module';
import { PricesModule } from 'src/prices/prices.module';
import { StockModule } from 'src/stock/stock.module';
import { SuppliersModule } from 'src/suppliers/suppliers.module';
import { PropertiesModule } from 'src/properties/properties.module';
import { CategorysModule } from 'src/categorys/categorys.module';
import { AddTyresToDbService } from './addTyresToDataBase.service';
import { UploaderPaprserService } from './uploaderParser.service';
import { AddWheelsToDbService } from './addWheelToDataBase.service';
import { WheelsModule } from 'src/wheels/wheels.module';

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
