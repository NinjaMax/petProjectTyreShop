import { Column, DataType, Model, Table, BelongsTo, ForeignKey} from "sequelize-typescript";
import {StockBatteriesConfigAttr} from "../interfaces/stock-batteries.interface";
import { Supplier } from '../../suppliers/entities/supplier.model';
import { Battery } from "src/batteries/entities/battery.model";
import { Storage } from "src/storage/entities/storage.model";

@Table({tableName: 'stock_batterie', createdAt: false, updatedAt: false})
export class StockBatteries extends Model<StockBatteries, StockBatteriesConfigAttr> {

    @ForeignKey(() => Battery)
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: false, primaryKey: true})
    id_battery: number;
    
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

    @BelongsTo( () => Battery , 'id_battery')
    battery: Battery;

    @BelongsTo( () => Supplier , 'id_supplier')
    supplier: Supplier;

    @BelongsTo( () => Storage , 'id_storage')
    storage: Storage;

}
