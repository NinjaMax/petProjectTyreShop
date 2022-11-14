import { Column, DataType, Model, Table, HasMany, BelongsTo, ForeignKey} from "sequelize-typescript";
import { TyresConfigAttr } from '../interfaces/tyres.interface';
import { PriceTyres } from "../../prices/entities/price-tyres.model";
import {StockTyres} from "../../stock/entities/stock-tyres.model";
import { TyreModel } from "src/properties/entities/tyres/tyre-model.model";
import { TyreBrand } from "src/properties/entities/tyres/tyre-brand.model";
import { ReviewTyres } from "src/reviews/entities/review-tyres.model";
import { RatingTyres } from "src/ratings/entities/rating-tyres.model";
import { Category } from "src/categorys/entities/category.model";

@Table({tableName: 'tyres' , updatedAt: false})
export class Tyres extends Model<Tyres, TyresConfigAttr> {

    @Column({type: DataType.BIGINT, unique: true, allowNull: false, primaryKey: true, autoIncrement:false})
    id: number;
   
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    full_name: string;

    @ForeignKey(() => TyreBrand)
    @Column({type: DataType.INTEGER})
    id_brand: number;

    @ForeignKey(() => TyreModel)
    @Column({type: DataType.INTEGER})
    id_model: number;

    @ForeignKey(() => Category)
    @Column({type: DataType.INTEGER, defaultValue: 1})
    id_cat: number;

    @Column({type: DataType.DATE, unique: false, allowNull: false})
    update_date: Date;

    @HasMany(() => StockTyres , 'id')
    stock: StockTyres[];

    @HasMany(() => PriceTyres , 'id')
    price: PriceTyres[];

    @HasMany(() => ReviewTyres , 'id')
    reviews: ReviewTyres[];

    @HasMany(() => RatingTyres, 'id')
    rating: RatingTyres[];

    @BelongsTo(() => TyreModel, 'id_model')
    tyre_model: TyreModel;

    @BelongsTo(() => TyreBrand, 'id_brand')
    tyre_brand: TyreBrand;

    @BelongsTo(() => Category, 'id_cat')
    category: Category;
    
}
