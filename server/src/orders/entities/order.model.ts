//import sequelize from "sequelize";
//import { BelongsToManyAddAssociationsMixin } from "sequelize";
import { Column, DataType, Model, Table, BelongsTo, HasMany, ForeignKey, BelongsToMany, BelongsToAssociation, Sequelize } from "sequelize-typescript";
//import sequelize from "sequelize/types/sequelize";
import { Basket } from "src/basket/entities/basket.model";
import { Comments } from "src/comments/entities/comment.model";
//import { OrdersSupStorage } from "src/orders-suppliers/entities/orders-sup-storage.model";
import { OrdersSupplier } from "src/orders-suppliers/entities/orders-supplier.model";
import { Paynment } from "src/paynment/entities/paynment.model";
import { Sales } from "src/sales/entities/sale.model";
//import { Storage } from "src/storage/entities/storage.model";
//import { Tyres } from "src/tyres/entities/tyres.model";
import { Users } from "src/users/entities/users.model";
import { OrdersConfigAttr } from '../interfaces/orders.interface';
//import { Orders_Goods } from "./order-goods.model";
import { Order_Storage } from "./order-storage.model";

@Table({ tableName: 'order'})
export class Orders extends Model<Orders, OrdersConfigAttr> {
    
    @Column({type: DataType.BIGINT, unique: true, allowNull: false, primaryKey: true, autoIncrement:true})
    id_order: number;

    @Column({type: DataType.STRING, unique: false, allowNull: false})
    delivery: string;

    @Column({type: DataType.STRING, unique: false, allowNull: true})
    notes: string;

    @Column({type: DataType.STRING, unique: false, allowNull: false})
    status: string;

    //@Column({type: DataType.BOOLEAN, unique: false, allowNull: false, defaultValue: false})
    //placed: boolean;

    @ForeignKey(() => Users)
    @Column({type: DataType.INTEGER, allowNull: true})
    id_user: number;

    @ForeignKey(() => Basket)
    @Column({type: DataType.INTEGER, allowNull: true})
    id_basket: number;

    @BelongsTo(() => Users, 'id_user')
    user: Users;

    @BelongsTo(() => Basket, 'id_basket')
    basket: Basket;

    @HasMany(() => Comments, 'id_order')
    comments: Comments[];

    @HasMany(() => Order_Storage, 'id_order')
    order_storage: Order_Storage[];

    @HasMany(() => OrdersSupplier, 'id_order')
    order_sup: OrdersSupplier[];

    @HasMany(() => Paynment, 'id_order')
    paynment: Paynment[];

    @HasMany(() => Sales, 'id_order')
    sales: Sales[];

    //@BelongsToMany(() => Storage, { through: { model: () => Order_Storage, unique: false}})
    //storage_orders: Storage[];
    
}
