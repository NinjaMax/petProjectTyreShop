import { Module } from '@nestjs/common';
import { UploaderService } from './uploader.service';
import { UploaderController } from './uploader.controller';
import { MulterModule } from '@nestjs/platform-express';
import { UploaderParser } from './uploaderParser';
import { TyresModule } from 'src/tyres/tyres.module';

@Module({
  controllers: [UploaderController],
  providers: [UploaderService, UploaderParser],
  imports: [MulterModule.register({
    dest: './upload_prices',
  }), TyresModule],
  exports: [UploaderService]
})
export class UploaderModule {}
