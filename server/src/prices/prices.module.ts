import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PricesService } from './prices.service';
import { PricesController } from './prices.controller';
import { Tyres } from '../tyres/entities/tyres.model';
import { PriceTyres } from '../prices/entities/price-tyres.model';

@Module({
  controllers: [PricesController],
  providers: [PricesService],
  imports: [ 
    SequelizeModule.forFeature([Tyres, PriceTyres]),
  ],
  exports: [PricesService]

})
export class PricesModule {}
