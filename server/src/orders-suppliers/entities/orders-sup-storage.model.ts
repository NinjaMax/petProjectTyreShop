import { Column, DataType, Model, Table, BelongsTo, ForeignKey, HasMany} from "sequelize-typescript";
//import { Orders } from "src/orders/entities/order.model";
import { Storage } from "src/storage/entities/storage.model";
//import { Supplier } from "src/suppliers/entities/supplier.model";
import { OrdersSupStorConfigAttr } from '../interfaces/orders-sup-stor.interface';
import { OrdersSupplier } from "./orders-supplier.model";

@Table({tableName: 'order_sup_storage'})
export class OrdersSupStorage extends Model<OrdersSupStorage, OrdersSupStorConfigAttr> {

    @Column({type: DataType.BIGINT, unique: true, allowNull: false, primaryKey: true, autoIncrement:true})
    id_order_sup_storage: number;
   
    @Column({type: DataType.INTEGER, unique: false, allowNull: false})
    id: number;

    @Column({type: DataType.INTEGER, unique: false, allowNull: false})
    quantity: number;

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

    @ForeignKey(() => Storage)
    @Column({type: DataType.INTEGER, allowNull: true})
    id_storage: number;

    @ForeignKey(() => OrdersSupplier)
    @Column({type: DataType.INTEGER, allowNull: true})
    id_order_sup: number;

    //@ForeignKey(() => Orders)
    //@Column({type: DataType.INTEGER, allowNull: true})
    //id_order: number;

    @BelongsTo(() => Storage, 'id_storage')
    storage: Storage;

    @BelongsTo(() => OrdersSupplier, 'id_order_sup')
    order_sup: OrdersSupplier;

    //@BelongsTo(() => Orders, 'id_order')
    //order: Orders;
    
}