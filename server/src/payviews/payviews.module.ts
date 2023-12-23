import { Module } from '@nestjs/common';
import { PayviewsService } from './payviews.service';
import { PayviewsController } from './payviews.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Payview } from './entities/payview.entity';

@Module({
  controllers: [PayviewsController],
  providers: [PayviewsService],
  imports: [SequelizeModule.forFeature([Payview])],
})
export class PayviewsModule {}
