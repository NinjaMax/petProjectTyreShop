import { BelongsToManyAddAssociationsMixin } from "sequelize";
import { Column, DataType, Model, Table, BelongsTo, HasMany, ForeignKey, BelongsToMany, BelongsToAssociation } from "sequelize-typescript";
import { Basket } from "src/basket/entities/basket.model";
import { Comments } from "src/comments/entities/comment.model";
import { OrdersSupplier } from "src/orders-suppliers/entities/orders-supplier.model";
import { Paynment } from "src/paynment/entities/paynment.model";
import { Storage } from "src/storage/entities/storage.model";
//import { Tyres } from "src/tyres/entities/tyres.model";
import { Users } from "src/users/entities/users.model";
import { OrdersConfigAttr } from '../interfaces/orders.interface';
//import { Orders_Goods } from "./order-goods.model";
import { Order_Storage } from "./order-storage.model";

@Table({tableName: 'order' })
export class Orders extends Model<Orders, OrdersConfigAttr> {

    @Column({type: DataType.BIGINT, unique: true, allowNull: false, primaryKey: true, autoIncrement:true})
    id_order: number;

    @Column({type: DataType.STRING, unique: false, allowNull: true})
    notes: string;

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

    @HasMany(() => OrdersSupplier, 'id_order')
    order_sup: OrdersSupplier[];

    @HasMany(() => Paynment, 'id_order')
    paynment: Paynment[];

    @BelongsToMany(() => Storage, () => Order_Storage)
    storage: Storage[];
    addStorages: BelongsToManyAddAssociationsMixin<Storage, number>;
    
    //@BelongsToMany(() => Tyres, () => Orders_Goods)
    //goods: Tyres[];
    
}
