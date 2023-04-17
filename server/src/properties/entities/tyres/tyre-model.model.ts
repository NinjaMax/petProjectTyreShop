import { Column, DataType, Model, Table, ForeignKey, HasMany} from "sequelize-typescript";
import { TyreModelConfigAttr } from '../../interfaces/tyres/tyre-model.interface';
import { RatingTyres } from "../../../ratings/entities/rating-tyres.model";
import { Tyres } from "../../../tyres/entities/tyres.model";
import { ReviewTyres } from "../../../reviews/entities/review-tyres.model";

@Table({tableName: 'tyre_model' , updatedAt: false, createdAt: false})
export class TyreModel extends Model<TyreModel, TyreModelConfigAttr> {

    @Column({type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement:false})
    id_model: number;
   
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    model: string;

    @HasMany(() => Tyres , 'id_model')
    tyres: Tyres[];

    @HasMany(() => RatingTyres , 'id_model')
    ratings: RatingTyres[];

    @HasMany(() => ReviewTyres , 'id_model')
    reviews: ReviewTyres[];

    
}
