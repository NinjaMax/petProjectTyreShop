import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OilsService } from './oils.service';
import { OilsController } from './oils.controller';
import { Oil } from './entities/oil.model';

@Module({
  controllers: [OilsController],
  providers: [OilsService],
  imports: [
    SequelizeModule.forFeature([Oil]),
  ],
  exports:[OilsService],
})
export class OilsModule {}
