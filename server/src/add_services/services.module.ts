import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { Service } from './entities/service.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ServicesController],
  providers: [ServicesService],
  imports: [
    SequelizeModule.forFeature([Service]),
    AuthModule
  ],
  exports:[ServicesService],
})
export class ServicesModule {}
