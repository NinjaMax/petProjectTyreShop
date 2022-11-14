import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import { Tyres } from 'src/tyres/entities/tyres.model';
import { ReviewTyres } from 'src/reviews/entities/review-tyres.model';
import { TyreBrand } from 'src/properties/entities/tyres/tyre-brand.model';
import { TyreModel } from 'src/properties/entities/tyres/tyre-model.model';
import { TyresModule } from 'src/tyres/tyres.module';
import { RatingTyres } from './entities/rating-tyres.model';
import { ReviewsModule } from 'src/reviews/reviews.module';
//import { PropertiesModule } from 'src/properties/properties.module';

@Module({
  controllers: [RatingsController],
  providers: [RatingsService], 
  imports: [ 
    SequelizeModule.forFeature([RatingTyres, Tyres, ReviewTyres, TyreBrand,
    TyreModel]),
    TyresModule, forwardRef(() => ReviewsModule)
  ],
  exports: [RatingsService]
})
export class RatingsModule {}
