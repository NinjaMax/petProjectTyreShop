import { Column, DataType, Model, Table, BelongsTo, ForeignKey} from "sequelize-typescript";
import {StockWheelsConfigAttr} from "../interfaces/stock-wheels.interface";
import { Supplier } from '../../suppliers/entities/supplier.model';
import { Wheel } from "src/wheels/entities/wheel.model";

@Table({tableName: 'stock_wheel', createdAt: false, updatedAt: false})
export class StockWheels extends Model<StockWheels, StockWheelsConfigAttr> {

    @ForeignKey(() => Wheel)
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: false, primaryKey: true})
    id_wheel: number;
    
    @Column({type: DataType.INTEGER, unique: false, allowNull: true})
    stock: number;

    @ForeignKey(() => Supplier)
    @Column({type: DataType.INTEGER})
    id_sup: number;

    @Column({type: DataType.DATE, unique: false, allowNull: false})
    update_date: Date;

    @BelongsTo( () => Wheel , 'id_wheel')
    wheel: Wheel;

    @BelongsTo( () => Supplier , 'id_sup')
    supplier: Supplier;


}
