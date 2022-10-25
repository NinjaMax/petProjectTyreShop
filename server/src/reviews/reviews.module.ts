import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { ReviewTyres } from './entities/review-tyres.model';
import { Tyres } from 'src/tyres/entities/tyres.model';
import { RatingTyres } from 'src/ratings/entities/rating-tyres.model';
import { TyresModule } from 'src/tyres/tyres.module';
import { RatingsModule } from 'src/ratings/ratings.module';
import { Users } from 'src/users/entities/users.model';
import { TyreModel } from 'src/properties/entities/tyre-model.model';
import { TyreBrand } from 'src/properties/entities/tyre-brand.model';
import { PropertiesModule } from 'src/properties/properties.module';


@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService],
  imports: [ 
    SequelizeModule.forFeature([ReviewTyres, Tyres, RatingTyres, Users, 
    TyreModel, TyreBrand]),
    TyresModule, RatingsModule, PropertiesModule
  ],
  exports: [ReviewsService]
})
export class ReviewsModule {}
