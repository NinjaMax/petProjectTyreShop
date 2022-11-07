import { Column, DataType, Model, Table, ForeignKey} from "sequelize-typescript";
import { Storage } from "../../storage/entities/storage.model";
import { Sales } from "./sale.model";

@Table({tableName: 'sales_storage' , createdAt: false, updatedAt: false})
export class SaleStorage extends Model<SaleStorage> {

    @Column({type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement:true})
    id_order_storage: number;

    @ForeignKey(() => Sales)
    @Column({type: DataType.BIGINT, unique: true, allowNull: true})
    id_sale: number;

    @ForeignKey(() => Storage)
    @Column({type: DataType.BIGINT, unique: true, allowNull: true})
    id_storage: number;

   
}