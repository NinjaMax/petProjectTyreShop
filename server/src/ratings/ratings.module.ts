import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RatingsService } from './ratings.service';
import { RatingsController } from './ratings.controller';
import { AuthModule } from '../auth/auth.module';
import { TyreBrand } from '../properties/entities/tyres/tyre-brand.model';
import { TyreModel } from '../properties/entities/tyres/tyre-model.model';
import { ReviewTyres } from '../reviews/entities/review-tyres.model';
import { ReviewsModule } from '../reviews/reviews.module';
import { Tyres } from '../tyres/entities/tyres.model';
import { TyresModule } from '../tyres/tyres.module';
import { RatingTyres } from './entities/rating-tyres.model';

@Module({
  controllers: [RatingsController],
  providers: [RatingsService], 
  imports: [ 
    SequelizeModule.forFeature([
      RatingTyres,
      Tyres,
      ReviewTyres,
      TyreBrand,
    TyreModel]), 
    forwardRef(() => AuthModule), 
    forwardRef(() => TyresModule), 
    forwardRef(() => ReviewsModule)
  ],
  exports: [RatingsService]
})
export class RatingsModule {}
