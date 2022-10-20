import { Column, DataType, Model, Table, BelongsToMany, ForeignKey} from "sequelize-typescript";
import { TyreBrandConfigAttr } from '../interfaces/tyre-brand.interface';
import { RatingTyres } from "../../ratings/entities/rating-tyres.model";
import { Tyres } from "src/tyres/entities/tyres.model";

@Table({tableName: 'tyre_brand' , updatedAt: false, createdAt: false})
export class TyreBrand extends Model<TyreBrand, TyreBrandConfigAttr> {

    @Column({type: DataType.BIGINT, unique: true, allowNull: false, primaryKey: true, autoIncrement:false})
    id: number;
   
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    brand: string;

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
