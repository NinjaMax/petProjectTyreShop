import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { ReviewTyres } from './entities/review-tyres.model';
import { Tyres } from 'src/tyres/entities/tyres.model';
import { RatingTyres } from 'src/ratings/entities/rating-tyres.model';
import { TyresModule } from 'src/tyres/tyres.module';
import { RatingsModule } from 'src/ratings/ratings.module';
import { Users } from 'src/users/entities/users.model';
import { TyreModel } from 'src/properties/entities/tyres/tyre-model.model';
import { TyreBrand } from 'src/properties/entities/tyres/tyre-brand.model';
import { PropertiesModule } from 'src/properties/properties.module';
import { CustomersModule } from 'src/customers/customers.module';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';


@Module({
  controllers: [ReviewsController],
  providers: [ReviewsService],
  imports: [ 
    SequelizeModule.forFeature([
      ReviewTyres,
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
    forwardRef(() => AuthModule)
  ],
  exports: [ReviewsService]
})
export class ReviewsModule {}
