//import sequelize from "sequelize";
//import { BelongsToManyAddAssociationsMixin } from "sequelize";
import { Column, DataType, Model, Table, BelongsTo, HasMany, ForeignKey, BelongsToMany, BelongsToAssociation, Sequelize } from "sequelize-typescript";
//import sequelize from "sequelize/types/sequelize";
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

@Table({ tableName: 'order'})
export class Orders extends Model<Orders, OrdersConfigAttr> {
    
    @Column({type: DataType.BIGINT, unique: true, allowNull: false, primaryKey: true, autoIncrement:true})
    id_order: number;

    @Column({type: DataType.STRING, unique: false, allowNull: true})
    notes: string;

    @Column({type: DataType.INTEGER, unique: false, allowNull: true})
    id: number;

    @Column({type: DataType.INTEGER, unique: false, allowNull: true, defaultValue: 0})
    quantity: number;

    @Column({type: DataType.INTEGER, unique: false, allowNull: true,  defaultValue: 0})
    reserve: number;

    @Column({type: DataType.INTEGER, unique: false, allowNull: true, defaultValue: 0})
    price: number;

    @Column({type: DataType.BIGINT, unique: false, allowNull: true, 
        
        get() {
            const getTotal: number = this.getDataValue('price') * this.getDataValue('quantity'); 
            return getTotal;
        },
        set(getTotal) {
            this.setDataValue('total', getTotal);
        }
    })
    total: number;

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

    @BelongsToMany(() => Storage, {through: () => Order_Storage})
    storage_orders: Storage[];
    
    //addStorages(storage_orders: Storage[], arg1: { through: { quantity: number; }; }) {
    //    throw new Error('Method not implemented.');
    //  }
    //addStorages: BelongsToManyAddAssociationsMixin<Storage, number>;
    
    //@BelongsToMany(() => Tyres, () => Orders_Goods)
    //goods: Tyres[];
    
}
