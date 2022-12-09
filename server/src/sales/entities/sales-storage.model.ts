import { Column, DataType, Model, Table, ForeignKey} from "sequelize-typescript";
import { Storage } from "../../storage/entities/storage.model";
import { Sales } from "./sale.model";

@Table({tableName: 'sales_storage' , createdAt: false, updatedAt: false})
export class SaleStorage extends Model<SaleStorage> {

    @Column({type: DataType.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement:true})
    id_sales_storage: number;

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

    @Column({type: DataType.INTEGER, unique: false, allowNull: true})
    id_supplier: number;

    @Column({type: DataType.INTEGER, unique: false, allowNull: true})
    id_order: number;

    @ForeignKey(() => Sales)
    @Column({type: DataType.BIGINT, unique: true, allowNull: true})
    id_sale: number;

    @ForeignKey(() => Storage)
    @Column({type: DataType.BIGINT, unique: true, allowNull: true})
    id_storage: number;

   
}