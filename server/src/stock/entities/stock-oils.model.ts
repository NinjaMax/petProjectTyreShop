import { Column, DataType, Model, Table, BelongsTo, ForeignKey} from "sequelize-typescript";
import {StockOilsConfigAttr} from "../interfaces/stock-oils.interface";
import { Supplier } from '../../suppliers/entities/supplier.model';
import { Oil } from "src/oils/entities/oil.model";
import { Storage } from "src/storage/entities/storage.model";

@Table({tableName: 'stock_oil', createdAt: false, updatedAt: false})
export class StockOils extends Model<StockOils, StockOilsConfigAttr> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: false, primaryKey: true})
    id: number;

    @ForeignKey(() => Oil)
    @Column({type: DataType.INTEGER})
    id_oil: number;
    
    @Column({type: DataType.INTEGER, unique: false, allowNull: true})
    stock: number;

    @Column({type: DataType.INTEGER, unique: false, allowNull: true, defaultValue: 0,
        set () {

            const getRemainder : number = this.getDataValue('stock') - this.getDataValue('reserve');
            const getReserve : number = this.getDataValue('stock') - this.getDataValue('remainder');
            
            if( getRemainder < 0 ) {
                this.setDataValue('reserve', getReserve - getRemainder);
                this.setDataValue('remainder', 0 ); 
                return `You can not set more "reserve" because does not have remainder. "Remainder 0".`;
            } else {
                
                this.setDataValue('remainder', getRemainder );
            }          
        }
    })
    reserve: number;

    @Column({type: DataType.INTEGER, unique: false, allowNull: true, defaultValue: 0})
    remainder: number;

    @ForeignKey(() => Supplier)
    @Column({type: DataType.INTEGER})
    id_supplier: number;

    @ForeignKey(() => Storage)
    @Column({type: DataType.INTEGER})
    id_storage: number;

    @Column({type: DataType.DATE, unique: false, allowNull: false})
    update_date: Date;

    @BelongsTo( () => Oil , 'id_oil')
    oil: Oil;

    @BelongsTo( () => Supplier , 'id_supplier')
    supplier: Supplier;

    @BelongsTo( () => Storage , 'id_storage')
    storage: Storage;

}
