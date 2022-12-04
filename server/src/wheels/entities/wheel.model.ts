import { Column, DataType, Model, Table, BelongsTo, BelongsToMany, ForeignKey, HasMany} from "sequelize-typescript";
import { Category } from "src/categorys/entities/category.model";
//import { Orders_Goods } from "src/orders/entities/order-goods.model";
//import { Orders } from "src/orders/entities/order.model";
import { PriceWheels } from "src/prices/entities/price-wheels.model";
import { StockWheels } from "src/stock/entities/stock-wheels.model";
import { WheelConfigAttr } from '../interfaces/wheel.interface';

@Table({tableName: 'wheel', updatedAt: false})
export class Wheel extends Model<Wheel, WheelConfigAttr> {

    @Column({type: DataType.BIGINT, unique: true, allowNull: false, primaryKey: true, autoIncrement:false})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    full_name: string;

    @ForeignKey(() => Category)
    @Column({type: DataType.INTEGER})
    id_cat: number;

    @Column({type: DataType.DATE, unique: false, allowNull: false})
    update_date: Date;

    @BelongsTo(() => Category, 'id_cat')
    category: Category;

    @HasMany(() => StockWheels , 'id')
    stock: StockWheels[];

    @HasMany(() => PriceWheels , 'id')
    price: PriceWheels[];

    //@BelongsToMany(() => Orders, () => OrdersGoods)
    //orders: Orders[];
   
}
