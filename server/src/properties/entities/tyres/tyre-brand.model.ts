import { Column, DataType, Model, Table, HasMany} from "sequelize-typescript";
import { TyreBrandConfigAttr } from '../../interfaces/tyres/tyre-brand.interface';
import { RatingTyres } from "../../../ratings/entities/rating-tyres.model";
import { Tyres } from "src/tyres/entities/tyres.model";
import { ReviewTyres } from "src/reviews/entities/review-tyres.model";

@Table({tableName: 'tyre_brand' , updatedAt: false, createdAt: false})
export class TyreBrand extends Model<TyreBrand, TyreBrandConfigAttr> {

    @Column({type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement:false})
    id_brand: number;
   
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    brand: string;

    @HasMany(() => Tyres , 'id_brand')
    tyres: Tyres[];

    @HasMany(() => RatingTyres , 'id_brand')
    ratings: RatingTyres[];

    @HasMany(() => ReviewTyres, 'id_brand')
    reviews: ReviewTyres[];
    
}
