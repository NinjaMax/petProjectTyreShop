import { Model } from 'sequelize-typescript';
import { RatingTyresConfigAttr } from '../interfaces/rating-tyres.interface';
import { TyreBrand } from '../../properties/entities/tyres/tyre-brand.model';
import { TyreModel } from '../../properties/entities/tyres/tyre-model.model';
import { ReviewTyres } from '../../reviews/entities/review-tyres.model';
import { Tyres } from '../../tyres/entities/tyres.model';
export declare class RatingTyres extends Model<RatingTyres, RatingTyresConfigAttr> {
    id_rating: number;
    id: number;
    id_review: number;
    rating_overall: number;
    rating_dry_road: number;
    rating_wet_road: number;
    rating_snow_road: number;
    rating_ice_road: number;
    rating_cross_country: number;
    rating_treadwear: number;
    rating_price_quality: number;
    id_model: number;
    id_brand: number;
    tyres: Tyres;
    review: ReviewTyres;
    tyre_model: TyreModel;
    tyre_brand: TyreBrand;
}
