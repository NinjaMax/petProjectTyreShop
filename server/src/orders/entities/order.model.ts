import { Column, DataType, Model, Table, BelongsTo, HasMany, ForeignKey, BelongsToMany} from "sequelize-typescript";
import { Basket } from "src/basket/entities/basket.model";
import { Comments } from "src/comments/entities/comment.model";
import { OrdersSupplier } from "src/orders-suppliers/entities/orders-supplier.model";
import { Paynment } from "src/paynment/entities/paynment.model";
import { Storage } from "src/storage/entities/storage.model";
import { Users } from "src/users/entities/users.model";
import { OrdersConfigAttr } from '../interfaces/orders.interface';
import { OrderStorage } from "./order-storage.model";

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
    reserve: number;

    @Column({type: DataType.INTEGER, unique: false, allowNull: false})
    price: number;

    @Column({type: DataType.BIGINT, unique: false, allowNull: false, 
        set() {
            this.setDataValue('total', this.getDataValue('price') * this.getDataValue('quantity'));
        }
    })
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

    @HasMany(() => Comments, 'id_order')
    comments: Comments[];

    @HasMany(() => OrdersSupplier, 'id_order_sup')
    order_sup: OrdersSupplier[];

    @HasMany(() => Paynment, 'id_order')
    paynment: Paynment[];

    @BelongsToMany(() => Storage, () => OrderStorage)
    storage: Storage[];
    
}
