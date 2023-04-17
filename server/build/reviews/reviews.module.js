var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
let ReviewsModule = class ReviewsModule {
};
ReviewsModule = __decorate([
    Module({
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
], ReviewsModule);
export { ReviewsModule };
