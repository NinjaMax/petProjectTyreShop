import { Model } from 'sequelize-typescript';
import { ReviewsTyresConfigAttr } from '../interfaces/review-tyres.interface';
import { Customer } from '../../customers/entities/customer.model';
import { TyreBrand } from '../../properties/entities/tyres/tyre-brand.model';
import { TyreModel } from '../../properties/entities/tyres/tyre-model.model';
import { RatingTyres } from '../../ratings/entities/rating-tyres.model';
import { Tyres } from '../../tyres/entities/tyres.model';
import { Users } from '../../users/entities/users.model';
export declare class ReviewTyres extends Model<ReviewTyres, ReviewsTyresConfigAttr> {
    id_review: number;
    id: number;
    id_model: number;
    id_brand: number;
    id_customer: number;
    id_user: number;
    description: string;
    user: Users;
    customer: Customer;
    tyres: Tyres;
    rating: RatingTyres;
    model: TyreModel;
    brand: TyreBrand;
}
