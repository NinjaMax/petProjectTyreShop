import { Column, DataType, Model, Table, BelongsTo, ForeignKey} from "sequelize-typescript";
import {StockTyresConfigAttr} from "../interfaces/stock-tyres.interface";
import { Tyres } from "src/tyres/entities/tyres.model";
import { Supplier } from '../../suppliers/entities/supplier.model';
import { Storage } from "src/storage/entities/storage.model";

@Table({tableName: 'stock_tyres', createdAt: false, updatedAt: false})
export class StockTyres extends Model<StockTyres, StockTyresConfigAttr> {

    @ForeignKey(() => Tyres)
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: false, primaryKey: true})
    id: number;
    
    @Column({type: DataType.INTEGER, unique: false, allowNull: true})
    stock: number;

    @Column({type: DataType.INTEGER, unique: false, allowNull: true, defaultValue: 0,
        
    //    get () {
    //        const getStock : number = this.getDataValue('stock');
    //        let reserve: number = this.getDataValue('reserve');
    //        const getRemainder : number = this.getDataValue('stock') - reserve;
    //        let getReserve : number = this.getDataValue('stock') - this.getDataValue('remainder');
//
    //        if( getRemainder >= reserve && getStock !== 0)  {
    //            //reserve = getRemainder
    //            return reserve;
    //        } 
    //        if( getRemainder < reserve && getStock !== 0) {
    //            reserve = reserve - (reserve - getRemainder);
    //          return reserve;  
    //        }
            
    //    },

    //    set (reserve: number) {
    
    //            this.setDataValue('reserve', reserve);
               
    //        }  

    })
    reserve: number;

    @Column({type: DataType.INTEGER, unique: false, allowNull: true, defaultValue: 0,     
        
        get () {
            const getRemainder : number = this.getDataValue('stock') - this.getDataValue('reserve');

            return getRemainder;
        },
        set (getRemainder) {

            if( getRemainder < 0 ) {
                this.setDataValue('remainder', 0 ); 
                return `You can not set more "reserve" because does not have remainder. "Remainder 0".`;
            } 
            
        this.setDataValue('remainder', getRemainder );
                 
        }
    })
    remainder: number;  

    @ForeignKey(() => Supplier)
    @Column({type: DataType.INTEGER})
    id_sup: number;

    @ForeignKey(() => Storage)
    @Column({type: DataType.INTEGER, defaultValue: 1})
    id_storage: number;

    @Column({type: DataType.DATE, unique: false, allowNull: false})
    update_date: Date;

    @BelongsTo( () => Tyres , 'id')
    tyres: Tyres;

    @BelongsTo( () => Supplier , 'id_sup')
    supplier: Supplier;

    @BelongsTo( () => Storage , 'id_storage')
    storage: Storage;

}
