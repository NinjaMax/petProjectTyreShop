import { Column, DataType, Model, Table, ForeignKey} from "sequelize-typescript";
import { Storage } from "../../storage/entities/storage.model";
import { Orders } from "./order.model";

@Table({tableName: 'order_storage' , createdAt: false, updatedAt: false})
export class OrderStorage extends Model<OrderStorage> {

    @Column({type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement:true})
    id_order_storage: number;

    @ForeignKey(() => Orders)
    @Column({type: DataType.BIGINT, unique: true, allowNull: true})
    id_order: number;

    @ForeignKey(() => Storage)
    @Column({type: DataType.BIGINT, unique: true, allowNull: true})
    id_storage: number;

   
}
