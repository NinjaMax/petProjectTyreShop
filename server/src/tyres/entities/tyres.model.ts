import { Column, DataType, Model, Table, HasMany, BelongsTo, ForeignKey} from "sequelize-typescript";
import { TyresConfigAttr } from '../interfaces/tyres.interface';
import { PriceTyres } from "../../prices/entities/price-tyres.model";
import {StockTyres} from "../../stock/entities/stock-tyres.model";
import { TyreModel } from "src/properties/entities/tyre-model.model";
import { TyreBrand } from "src/properties/entities/tyre-brand.model";
import { ReviewTyres } from "src/reviews/entities/review-tyres.model";
import { RatingTyres } from "src/ratings/entities/rating-tyres.model";

@Table({tableName: 'tyres' , updatedAt: false})
export class Tyres extends Model<Tyres, TyresConfigAttr> {

    @Column({type: DataType.BIGINT, unique: true, allowNull: false, primaryKey: true, autoIncrement:false})
    id_tyres: number;
   
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    full_name: string;

    @ForeignKey(() => TyreBrand)
    @Column({type: DataType.INTEGER})
    id_brand: number;

    @ForeignKey(() => TyreModel)
    @Column({type: DataType.INTEGER})
    id_model: number;

    @Column({type: DataType.DATE, unique: false, allowNull: false})
    update_date: Date;

    @HasMany(() => StockTyres , 'id_tyres')
    stock: StockTyres[];

    @HasMany(() => PriceTyres , 'id_tyres')
    price: PriceTyres[];

    @HasMany(() => ReviewTyres , 'id_tyres')
    reviews: ReviewTyres[];

    @HasMany(() => RatingTyres, 'id_tyres')
    rating: RatingTyres[];

    @BelongsTo(() => TyreModel, 'id_model')
    tyre_model: TyreModel;

    @BelongsTo(() => TyreBrand, 'id_brand')
    tyre_brand: TyreBrand;
    
}
