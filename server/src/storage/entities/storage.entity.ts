import { Column, DataType, Model, Table, BelongsTo, ForeignKey} from "sequelize-typescript";
import { StorageConfigAttr } from '../interfaces/storage.interface';
import { OrdersSupplier } from "src/orders-suppliers/entities/orders-supplier.model";

@Table({tableName: 'storage' , createdAt: false, updatedAt: false})
export class Storage extends Model<Storage, StorageConfigAttr> {

    @Column({type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement:true})
    id_storage: number;
   
    @Column({type: DataType.BIGINT, unique: true, allowNull: false})
    id_goods: number;

    @Column({type: DataType.STRING, unique: false, allowNull: false})
    goods: string;

    @Column({type: DataType.INTEGER, unique: false, allowNull: true})
    quantity: number;

    @Column({type: DataType.INTEGER, unique: false, allowNull: true})
    price: number;

    @ForeignKey(() => OrdersSupplier)
    @Column({type: DataType.BIGINT, unique: true, allowNull: true})
    id_order_sup: number;

    @BelongsTo(() => OrdersSupplier , 'id_sup')
    order_sup: OrdersSupplier;

   
}
