import { Column, DataType, Model, Table, BelongsTo, ForeignKey, HasMany} from "sequelize-typescript";
import { Orders } from "src/orders/entities/order.model";
import { Supplier } from "src/suppliers/entities/supplier.model";
import { OrdersSupConfigAttr } from '../interfaces/order-sup.interface';

@Table({tableName: 'order_sup_storage'})
export class OrdersSupStorage extends Model<OrdersSupStorage, OrdersSupConfigAttr> {

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

    @ForeignKey(() => Orders)
    @Column({type: DataType.INTEGER})
    id_order: number;

    @ForeignKey(() => Supplier)
    @Column({type: DataType.INTEGER})
    id_sup: number;

    @BelongsTo(() => Orders, 'id_order')
    order: Orders;

    @BelongsTo(() => Supplier, 'id_sup')
    supplier: Supplier;
    
}