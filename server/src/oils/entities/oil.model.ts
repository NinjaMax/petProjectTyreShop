import { Column, DataType, Model, Table, BelongsTo, BelongsToMany, HasMany, ForeignKey} from "sequelize-typescript";
import { Category } from "src/categorys/entities/category.model";
//import { Orders_Goods } from "src/orders/entities/order-goods.model";
//import { Orders } from "src/orders/entities/order.model";
import { PriceOil } from "src/prices/entities/price-oils.model";
import { StockOils } from "src/stock/entities/stock-oils.model";
import { OilConfigAttr } from '../interfaces/oil.interface';

@Table({tableName: 'oil', createdAt: false})
export class Oil extends Model<Oil, OilConfigAttr> {

    @Column({type: DataType.BIGINT, unique: true, allowNull: false, primaryKey: true, autoIncrement:false})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    full_name: string;

    @ForeignKey(() => Category)
    @Column({type: DataType.INTEGER})
    id_cat: number;

    @BelongsTo(() => Category, 'id_cat')
    category: Category;

    @HasMany(() => PriceOil , 'id_oil')
    price: PriceOil[];

    @HasMany(() => StockOils, 'id_oil')
    stock: StockOils[];

    //@BelongsToMany(() => Orders, () => OrdersGoods)
    //orders: Orders[];
   
}
