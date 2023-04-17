var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
let RatingsModule = class RatingsModule {
};
RatingsModule = __decorate([
    Module({
        controllers: [RatingsController],
        providers: [RatingsService],
        imports: [
            SequelizeModule.forFeature([
                RatingTyres,
                Tyres,
                ReviewTyres,
                TyreBrand,
                TyreModel
            ]),
            forwardRef(() => AuthModule),
            forwardRef(() => TyresModule),
            forwardRef(() => ReviewsModule)
        ],
        exports: [RatingsService]
    })
], RatingsModule);
export { RatingsModule };
