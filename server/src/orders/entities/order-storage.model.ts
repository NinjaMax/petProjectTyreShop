import { Column, DataType, Model, Table, BelongsToMany, ForeignKey, Unique, BelongsTo} from "sequelize-typescript";
import { Storage } from "../../storage/entities/storage.model";
import { Orders } from "./order.model";
import { OrdersStorageConfigAttr } from '../interfaces/orders-storage.interface';

@Table({tableName: 'order_storage' , createdAt: false, updatedAt: false})
export class Order_Storage extends Model<Order_Storage, OrdersStorageConfigAttr> {

    //@Unique()
    @Column({type: DataType.INTEGER, unique: true, allowNull: true, primaryKey: true, autoIncrement:true})
    id_order_storage: number;

    @ForeignKey(() => Orders)
    @Column({type: DataType.INTEGER, unique: false, allowNull: true})
    id_order: number;

    @ForeignKey(() => Storage)
    @Column({type: DataType.INTEGER, unique: false, allowNull: true})
    id_storage: number;

    @Column({type: DataType.INTEGER, unique: false, allowNull: true})
    id: number;

    @Column({type: DataType.INTEGER, unique: false, allowNull: true})
    order_index: number;

    @Column({type: DataType.INTEGER, unique: false, allowNull: true})
    storage_index: number;

    @Column({type: DataType.INTEGER, unique: false, allowNull: true})
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

    @BelongsTo(() => Orders, 'id_order')
    order: Orders;

    @BelongsTo(() => Storage, 'id_storage')
    storage: Storage;

}
