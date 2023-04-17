import { Model } from "sequelize-typescript";
import { TyreModelConfigAttr } from '../../interfaces/tyres/tyre-model.interface';
import { RatingTyres } from "../../../ratings/entities/rating-tyres.model";
import { Tyres } from "../../../tyres/entities/tyres.model";
import { ReviewTyres } from "../../../reviews/entities/review-tyres.model";
export declare class TyreModel extends Model<TyreModel, TyreModelConfigAttr> {
    id_model: number;
    model: string;
    tyres: Tyres[];
    ratings: RatingTyres[];
    reviews: ReviewTyres[];
}
