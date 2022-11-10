import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { StorageService } from './storage.service';
import { StorageController } from './storage.controller';
import { Storage } from './entities/storage.model';

@Module({
  controllers: [StorageController],
  providers: [StorageService],
  imports: [ 
    SequelizeModule.forFeature([Storage]),
  ],
  exports: [StorageService]
})
export class StorageModule {}
