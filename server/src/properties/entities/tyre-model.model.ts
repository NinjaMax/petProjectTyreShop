import { Column, DataType, Model, Table, ForeignKey, BelongsToMany} from "sequelize-typescript";
import { TyreModelConfigAttr } from '../interfaces/tyre-model.interface';
import { RatingTyres } from "../../ratings/entities/rating-tyres.model";
import { Tyres } from "src/tyres/entities/tyres.model";

@Table({tableName: 'tyre_model' , updatedAt: false})
export class TyreModel extends Model<TyreModel, TyreModelConfigAttr> {

    @Column({type: DataType.BIGINT, unique: true, allowNull: false, primaryKey: true, autoIncrement:false})
    id: number;
   
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    model: string;

    @ForeignKey(() => Tyres)
    @Column({type: DataType.INTEGER})
    id_tyres: number;

    @ForeignKey(() => RatingTyres)
    @Column({type: DataType.INTEGER})
    id_rating: number;

    @BelongsToMany(() => Tyres , 'id_tyres')
    tyres: Tyres[];

    @BelongsToMany(() => RatingTyres , 'id_rating')
    rating: RatingTyres[];

    
}
