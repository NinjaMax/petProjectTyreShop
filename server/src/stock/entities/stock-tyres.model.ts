import { Column, DataType, Model, Table, BelongsTo, ForeignKey} from "sequelize-typescript";
import {StockTyresConfigAttr} from "../interfaces/stock-tyres.interface";
import { Tyres } from "src/tyres/entities/tyres.model";
import { Supplier } from '../../suppliers/entities/supplier.model';

@Table({tableName: 'stock_tyres', createdAt: false, updatedAt: false})
export class StockTyres extends Model<StockTyres, StockTyresConfigAttr> {

    @ForeignKey(() => Tyres)
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: false, primaryKey: true})
    id_tyres: number;
    
    @Column({type: DataType.INTEGER, unique: false, allowNull: true})
    stock: number;

    @ForeignKey(() => Supplier)
    @Column({type: DataType.INTEGER})
    id_sup: number;

    @Column({type: DataType.DATE, unique: false, allowNull: false})
    update_date: Date;

    @BelongsTo( () => Tyres , 'id_tyres')
    tyres: Tyres;

    @BelongsTo( () => Supplier , 'id_sup')
    supplier: Supplier;


}
