import { Module } from '@nestjs/common';
import { UploaderService } from './uploader.service';
import { UploaderController } from './uploader.controller';
import { MulterModule } from '@nestjs/platform-express';
import { UploaderParser } from './uploaderParser';
import { TyresModule } from 'src/tyres/tyres.module';
import { PricesModule } from 'src/prices/prices.module';
import { StockModule } from 'src/stock/stock.module';
import { SuppliersModule } from 'src/suppliers/suppliers.module';
import { PropertiesModule } from 'src/properties/properties.module';

@Module({
  controllers: [UploaderController],
  providers: [UploaderService, UploaderParser],
  imports: [MulterModule.register({
    dest: './upload_prices',
  }), TyresModule, PricesModule, StockModule,
   SuppliersModule, PropertiesModule],
  exports: [UploaderService]
})
export class UploaderModule {}
