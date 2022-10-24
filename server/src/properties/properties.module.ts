import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PropertiesBrandService } from './properties-brand.service';
import { PropertiesBrandController } from './properties-brand.controller';
import { PropertiesModelController } from './properties-model.controller';
import { PropertiesModelService } from './properties-model.service';
import { Tyres } from 'src/tyres/entities/tyres.model';
import { RatingTyres } from 'src/ratings/entities/rating-tyres.model';
import { TyresModule } from 'src/tyres/tyres.module';
import { RatingsModule } from 'src/ratings/ratings.module';
import { TyreModel } from './entities/tyre-model.model';
import { TyreBrand } from './entities/tyre-brand.model';

@Module({
  controllers: [PropertiesBrandController, PropertiesModelController],
  providers: [PropertiesBrandService, PropertiesModelService],
  imports: [ 
    SequelizeModule.forFeature([ Tyres, RatingTyres, TyreModel, TyreBrand]),
    TyresModule, RatingsModule
  ],
  exports: [PropertiesBrandService, PropertiesModelService]
})
export class PropertiesModule {}
