import { Column, DataType, Model, Table, BelongsTo, ForeignKey} from "sequelize-typescript";
import {StockBatteriesConfigAttr} from "../interfaces/stock-batteries.interface";
import { Supplier } from '../../suppliers/entities/supplier.model';
import { Battery } from "src/batteries/entities/battery.model";

@Table({tableName: 'stock_batterie', createdAt: false, updatedAt: false})
export class StockBatteries extends Model<StockBatteries, StockBatteriesConfigAttr> {

    @ForeignKey(() => Battery)
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: false, primaryKey: true})
    id_battery: number;
    
    @Column({type: DataType.INTEGER, unique: false, allowNull: true})
    stock: number;

    @ForeignKey(() => Supplier)
    @Column({type: DataType.INTEGER})
    id_sup: number;

    @Column({type: DataType.DATE, unique: false, allowNull: false})
    update_date: Date;

    @BelongsTo( () => Battery , 'id_battery')
    battery: Battery;

    @BelongsTo( () => Supplier , 'id_sup')
    supplier: Supplier;


}
