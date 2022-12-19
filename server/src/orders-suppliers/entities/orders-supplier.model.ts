import { Column, DataType, Model, Table, BelongsTo, ForeignKey, HasMany} from "sequelize-typescript";
import { Comments } from "src/comments/entities/comment.model";
import { Orders } from "src/orders/entities/order.model";
import { Paynment } from "src/paynment/entities/paynment.model";
//import { Storage } from "src/storage/entities/storage.model";
import { Supplier } from "src/suppliers/entities/supplier.model";
import { Users } from "src/users/entities/users.model";
import { OrdersSupConfigAttr } from '../interfaces/order-sup.interface';
import { OrdersSupStorage } from "./orders-sup-storage.model";

@Table({tableName: 'order_supplier'})
export class OrdersSupplier extends Model<OrdersSupplier, OrdersSupConfigAttr> {

    @Column({type: DataType.BIGINT, unique: true, allowNull: false, primaryKey: true, autoIncrement:true})
    id_order_sup: number;

    @Column({type: DataType.STRING, unique: false, allowNull: true})
    delivery: string;

    @Column({type: DataType.STRING, unique: false, allowNull: true, defaultValue: 'NEW'})
    status: string;

    @Column({type: DataType.STRING, unique: false, allowNull: true})
    notes: string;

    @ForeignKey(() => Users)
    @Column({type: DataType.INTEGER})
    id_user: number;

    @ForeignKey(() => Orders)
    @Column({type: DataType.INTEGER})
    id_order: number;

    @ForeignKey(() => Supplier)
    @Column({type: DataType.INTEGER})
    id_supplier: number;

    @Column({type: DataType.INTEGER, allowNull: false, defaultValue: 0})
    id_contract: number;

    @BelongsTo(() => Users, 'id_user')
    user: Users;

    @BelongsTo(() => Orders, 'id_order')
    order: Orders;

    //@BelongsTo(() => Storage, 'id_storage')
    //storage: Storage;

    @BelongsTo(() => Supplier, 'id_supplier')
    supplier: Supplier;

    @HasMany(() => Comments, 'id_order_sup')
    comments: Comments[];

    @HasMany(() => Paynment, 'id_order_sup')
    paynment: Paynment[];

    @HasMany(() => OrdersSupStorage, 'id_order_sup')
    orders_sup_storage: OrdersSupStorage[];
    
}
