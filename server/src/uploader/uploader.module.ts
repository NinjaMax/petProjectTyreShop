import { Module } from '@nestjs/common';
import { UploaderService } from './uploader.service';
import { UploaderController } from './uploader.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  controllers: [UploaderController],
  providers: [UploaderService],
  imports: [MulterModule.register({
    dest: './downloads',}),
  ],
  exports: [UploaderService]
})
export class UploaderModule {}
