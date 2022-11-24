import { Column, DataType, Model, Table, BelongsToMany, ForeignKey} from "sequelize-typescript";
import { Storage } from "../../storage/entities/storage.model";
import { Orders } from "./order.model";
import { OrdersStorageConfigAttr } from '../interfaces/orders-storage.interface';

@Table({tableName: 'order_storage' , createdAt: false, updatedAt: false})
export class Order_Storage extends Model<Order_Storage, OrdersStorageConfigAttr> {

    //@Column({type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement:true})
    //id_order_storage: number;

    @ForeignKey(() => Orders)
    @Column({type: DataType.BIGINT, unique: false, allowNull: false, primaryKey: true})
    id_order: number;

    @ForeignKey(() => Storage)
    @Column({type: DataType.BIGINT, unique: false, allowNull: true})
    id_storage: number;

    @Column({type: DataType.INTEGER, unique: false, allowNull: true})
    id: number;

    @Column({type: DataType.INTEGER, unique: false, allowNull: true})
    quantity: number;

    // @Column({type: DataType.INTEGER, unique: false, allowNull: true})
    // id: number;

    // @Column({type: DataType.INTEGER, unique: false, allowNull: true, defaultValue: 0})
    // quantity: number;

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


}
