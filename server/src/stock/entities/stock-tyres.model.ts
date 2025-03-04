import { Column, DataType, Model, Table, BelongsTo, ForeignKey} from "sequelize-typescript";
import {StockTyresConfigAttr} from "../interfaces/stock-tyres.interface";
import { Tyres } from "../../tyres/entities/tyres.model";
import { Supplier } from '../../suppliers/entities/supplier.model';
import { Storage } from "../../storage/entities/storage.model";

@Table({tableName: 'stock_tyres', createdAt: false, updatedAt: false})
export class StockTyres extends Model<StockTyres, StockTyresConfigAttr> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    
    @ForeignKey(() => Tyres)
    @Column({type: DataType.INTEGER})
    id_tyre: number;
    
    @Column({type: DataType.INTEGER, unique: false, allowNull: true})
    stock: number;

    @Column({type: DataType.INTEGER, unique: false, allowNull: true, defaultValue: 0})
    reserve: number;

    @Column({type: DataType.INTEGER, unique: false, allowNull: true,     
        
        get () {
            const getRemainder : number = this.getDataValue('stock') - this.getDataValue('reserve');

            return getRemainder;
        },
        set (getRemainder) {

            if( getRemainder <= 0 ) {
                this.setDataValue('remainder', 0 ); 
                return `You can not set more "reserve" because does not have remainder. "Remainder 0".`;
            } 
            
        this.setDataValue('remainder', getRemainder );
                 
        }
    })
    remainder: number; 
    
    @ForeignKey(() => Supplier)
    @Column({type: DataType.INTEGER})
    id_supplier: number;

    @ForeignKey(() => Storage)
    @Column({type: DataType.INTEGER, defaultValue: 1})
    id_storage: number;

    @Column({type: DataType.DATE, unique: false, allowNull: false})
    update_date: Date;

    @BelongsTo( () => Tyres , 'id_tyre')
    tyres: Tyres;

    @BelongsTo( () => Supplier , 'id_supplier')
    supplier: Supplier;

    @BelongsTo( () => Storage , 'id_storage')
    storage: Storage;

}
