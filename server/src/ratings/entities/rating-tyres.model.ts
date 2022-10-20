import { Column, DataType, Model, Table, BelongsTo, ForeignKey} from "sequelize-typescript";
import { RatingTyresConfigAttr } from "../interfaces/rating-tyres.interface";
import { Tyres } from "src/tyres/entities/tyres.model";
import { Supplier } from '../../suppliers/entities/supplier.model';

@Table({tableName: 'rating_tyres', createdAt: false, updatedAt: false})
export class RatingTyres extends Model<RatingTyres, RatingTyresConfigAttr> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id_rating: number;

    @ForeignKey(() => Tyres)
    @Column({type: DataType.INTEGER})
    id_tyres: number;

    @ForeignKey(() => Review)
    @Column({type: DataType.INTEGER})
    id_review: number;
    
    @Column({type: DataType.INTEGER, unique: false, allowNull: false})
    rating_overall: number;

    @Column({type: DataType.INTEGER, unique: false, allowNull: true})
    rating_dry_road: number;

    @Column({type: DataType.INTEGER, unique: false, allowNull: true})
    rating_wet_road: number;

    @Column({type: DataType.INTEGER, unique: false, allowNull: true})
    rating_snow_road: number;

    @Column({type: DataType.INTEGER, unique: false, allowNull: true})
    rating_ice_road: number;

    @Column({type: DataType.INTEGER, unique: false, allowNull: true})
    rating_cross_country: number;

    @Column({type: DataType.INTEGER, unique: false, allowNull: true})
    rating_treadwear: number;

    @Column({type: DataType.INTEGER, unique: false, allowNull: true})
    rating_price_quality: number;

    @BelongsTo( () => Tyres , 'id_tyres')
    tyres: Tyres;

    @BelongsTo( () => Supplier , 'id_sup')
    supplier: Supplier;


    

}
