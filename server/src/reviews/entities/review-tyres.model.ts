import { Column, DataType, Model, Table, BelongsTo, ForeignKey, HasOne} from "sequelize-typescript";
import { ReviewsTyresConfigAttr } from '../interfaces/review-tyres.interface';
import { Tyres } from "src/tyres/entities/tyres.model";
import { RatingTyres } from "src/ratings/entities/rating-tyres.model";
import { Users } from "src/users/entities/users.model";

@Table({tableName: 'review_tyres', createdAt: true, updatedAt: false})
export class ReviewTyres extends Model<ReviewTyres, ReviewsTyresConfigAttr> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id_review: number;

    @ForeignKey(() => Tyres)
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: false, allowNull: false})
    id_tyres: number;

    @ForeignKey(() => Tyres)
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: false, allowNull: true})
    id_user: number;
    
    @Column({type: DataType.STRING, unique: false, allowNull: true})
    description: string;

    @BelongsTo(() => Users , 'id_user')
    user: Users;

    @BelongsTo(() => Tyres , 'id_tyres')
    tyres: Tyres;

    @HasOne(() => RatingTyres , 'id_review')
    rating: RatingTyres;

}
