import { Model } from "sequelize-typescript";
import { TyreBrandConfigAttr } from '../../interfaces/tyres/tyre-brand.interface';
import { RatingTyres } from "../../../ratings/entities/rating-tyres.model";
import { Tyres } from "../../../tyres/entities/tyres.model";
import { ReviewTyres } from "../../../reviews/entities/review-tyres.model";
export declare class TyreBrand extends Model<TyreBrand, TyreBrandConfigAttr> {
    id_brand: number;
    brand: string;
    tyres: Tyres[];
    ratings: RatingTyres[];
    reviews: ReviewTyres[];
}
