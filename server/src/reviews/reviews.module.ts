import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { ReviewTyres } from './entities/review-tyres.model';
import { AuthModule } from '../auth/auth.module';
import { CustomersModule } from '../customers/customers.module';
import { TyreBrand } from '../properties/entities/tyres/tyre-brand.model';
import { TyreModel } from '../properties/entities/tyres/tyre-model.model';
import { PropertiesModule } from '../properties/properties.module';
import { RatingTyres } from '../ratings/entities/rating-tyres.model';
import { RatingsModule } from '../ratings/ratings.module';
import { Tyres } from '../tyres/entities/tyres.model';
import { TyresModule } from '../tyres/tyres.module';
import { Users } from '../users/entities/users.model';
import { UsersModule } from '../users/users.module';
import { ReviewStore } from './entities/review-store.model';
import { ReviewsStoreService } from './reviews-store.service';
import { ReviewsStoreController } from './reviews-store.controller';

@Module({
  controllers: [ReviewsController, ReviewsStoreController],
  providers: [ReviewsService, ReviewsStoreService],
  imports: [ 
    SequelizeModule.forFeature([
      ReviewTyres,
      ReviewStore,
      Tyres,
      RatingTyres,
      TyreModel,
      TyreBrand,
      Users,
    ]),
    forwardRef(() => TyresModule),
    forwardRef(() => UsersModule),
    RatingsModule,
    PropertiesModule,
    CustomersModule,
    forwardRef(() => AuthModule),
  ],
  exports: [ReviewsService],
})
export class ReviewsModule {}
