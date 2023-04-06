import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OilsService } from './oils.service';
import { OilsController } from './oils.controller';
import { Oil } from './entities/oil.model';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [OilsController],
  providers: [OilsService],
  imports: [
    SequelizeModule.forFeature([Oil]),
    AuthModule
  ],
  exports:[OilsService],
})
export class OilsModule {}
