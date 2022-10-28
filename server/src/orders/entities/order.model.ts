import { Column, DataType, Model, Table, HasMany, BelongsTo, ForeignKey} from "sequelize-typescript";
import { Basket } from "src/basket/entities/basket.model";
import { Users } from "src/users/entities/users.model";
import { OrdersConfigAttr } from '../interfaces/orders.interface';
//import { PriceTyres } from "../../prices/entities/price-tyres.model";
//import {StockTyres} from "../../stock/entities/stock-tyres.model";
//import { TyreModel } from "src/properties/entities/tyre-model.model";
//import { TyreBrand } from "src/properties/entities/tyre-brand.model";
//import { ReviewTyres } from "src/reviews/entities/review-tyres.model";
//import { RatingTyres } from "src/ratings/entities/rating-tyres.model";

@Table({tableName: 'order' })
export class Orders extends Model<Orders, OrdersConfigAttr> {

    @Column({type: DataType.BIGINT, unique: true, allowNull: false, primaryKey: true, autoIncrement:true})
    id_order: number;

    @Column({type: DataType.INTEGER, unique: false, allowNull: false})
    id_cat: number;
   
    @Column({type: DataType.INTEGER, unique: false, allowNull: false})
    id_goods: number;

    @Column({type: DataType.STRING, unique: false, allowNull: false})
    goods: string;

    @Column({type: DataType.INTEGER, unique: false, allowNull: false})
    quantity: number;

    @Column({type: DataType.INTEGER, unique: false, allowNull: false})
    price: number;

    @Column({type: DataType.INTEGER, unique: false, allowNull: false})
    total: number;

    @Column({type: DataType.STRING, unique: false, allowNull: true})
    comments: string;

    @ForeignKey(() => Users)
    @Column({type: DataType.INTEGER})
    id_user: number;

    @ForeignKey(() => TyreModel)
    @Column({type: DataType.INTEGER})
    id_model: number;

    @Column({type: DataType.DATE, unique: false, allowNull: false})
    update_date: Date;

    @BelongsTo(() => Users, 'id_user')
    user: Users;

    @BelongsTo(() => Basket, 'id_brand')
    basket: Basket;
    
}
