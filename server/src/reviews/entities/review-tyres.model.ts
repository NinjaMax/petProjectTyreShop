import { Column, DataType, Model, Table, BelongsTo, ForeignKey, HasOne} from "sequelize-typescript";
import { ReviewsTyresConfigAttr } from '../interfaces/review-tyres.interface';
import { Tyres } from "src/tyres/entities/tyres.model";
import { RatingTyres } from "src/ratings/entities/rating-tyres.model";
import { Users } from "src/users/entities/users.model";
import { TyreModel } from "src/properties/entities/tyres/tyre-model.model";
import { TyreBrand } from "src/properties/entities/tyres/tyre-brand.model";

@Table({tableName: 'review_tyres', createdAt: true, updatedAt: false})
export class ReviewTyres extends Model<ReviewTyres, ReviewsTyresConfigAttr> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id_review: number;

    @ForeignKey(() => Tyres)
    @Column({type: DataType.INTEGER, allowNull: false})
    id: number;

    @ForeignKey(() => TyreModel)
    @Column({type: DataType.INTEGER, allowNull: false})
    id_model: number;

    @ForeignKey(() => TyreBrand)
    @Column({type: DataType.INTEGER, allowNull: false})
    id_brand: number;

    @ForeignKey(() => Users)
    @Column({type: DataType.INTEGER, unique: true, allowNull: true})
    id_user: number;
    
    @Column({type: DataType.STRING, unique: false, allowNull: false})
    description: string;

    @BelongsTo(() => Users , 'id_user')
    user: Users;

    @BelongsTo(() => Tyres , 'id')
    tyres: Tyres;

    @HasOne(() => RatingTyres , 'id_review')
    rating: RatingTyres;

    @BelongsTo(() => TyreModel , 'id_model')
    model: TyreModel;

    @BelongsTo(() => TyreBrand , 'id_brand')
    brand: TyreBrand;

}
