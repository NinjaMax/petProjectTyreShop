import { Module } from '@nestjs/common';
import { PaytypesService } from './paytypes.service';
import { PaytypesController } from './paytypes.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Paytype } from './entities/paytype.entity';

@Module({
  controllers: [PaytypesController],
  providers: [PaytypesService],
  imports: [SequelizeModule.forFeature([Paytype])],
})
export class PaytypesModule {}
