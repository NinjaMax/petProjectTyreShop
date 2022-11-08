import { Column, DataType, Model, Table, BelongsTo, ForeignKey} from "sequelize-typescript";
import {StockTyresConfigAttr} from "../interfaces/stock-tyres.interface";
import { Tyres } from "src/tyres/entities/tyres.model";
import { Supplier } from '../../suppliers/entities/supplier.model';
import { Storage } from "src/storage/entities/storage.model";

@Table({tableName: 'stock_tyres', createdAt: false, updatedAt: false})
export class StockTyres extends Model<StockTyres, StockTyresConfigAttr> {

    @ForeignKey(() => Tyres)
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: false, primaryKey: true})
    id_tyres: number;
    
    @Column({type: DataType.INTEGER, unique: false, allowNull: true})
    stock: number;

    @Column({type: DataType.INTEGER, unique: false, allowNull: true,
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

    @Column({type: DataType.INTEGER, unique: false, allowNull: true})
    remainder: number;  

    @ForeignKey(() => Supplier)
    @Column({type: DataType.INTEGER})
    id_sup: number;

    @ForeignKey(() => Storage)
    @Column({type: DataType.INTEGER})
    id_storage: number;

    @Column({type: DataType.DATE, unique: false, allowNull: false})
    update_date: Date;

    @BelongsTo( () => Tyres , 'id_tyres')
    tyres: Tyres;

    @BelongsTo( () => Supplier , 'id_sup')
    supplier: Supplier;

    @BelongsTo( () => Storage , 'id_storage')
    storage: Storage;

}
