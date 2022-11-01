import { Column, DataType, Model, Table, BelongsTo, ForeignKey} from "sequelize-typescript";
import { Basket } from "src/basket/entities/basket.model";
import { Users } from "src/users/entities/users.model";
import { OrdersConfigAttr } from '../interfaces/orders.interface';

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
    notes: string;

    @ForeignKey(() => Users)
    @Column({type: DataType.INTEGER})
    id_user: number;

    @ForeignKey(() => Basket)
    @Column({type: DataType.INTEGER})
    id_basket: number;

    @BelongsTo(() => Users, 'id_user')
    user: Users;

    @BelongsTo(() => Basket, 'id_basket')
    basket: Basket;

    //@HasMany(() => Comments, 'id_order_sup')
    //comments: Comments[];
    
}
