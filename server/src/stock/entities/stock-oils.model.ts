import { Column, DataType, Model, Table, BelongsTo, ForeignKey} from "sequelize-typescript";
import {StockOilsConfigAttr} from "../interfaces/stock-oils.interface";
import { Supplier } from '../../suppliers/entities/supplier.model';
import { Oil } from "src/oils/entities/oil.model";

@Table({tableName: 'stock_oil', createdAt: false, updatedAt: false})
export class StockOils extends Model<StockOils, StockOilsConfigAttr> {

    @ForeignKey(() => Oil)
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: false, primaryKey: true})
    id_oil: number;
    
    @Column({type: DataType.INTEGER, unique: false, allowNull: true})
    stock: number;

    @ForeignKey(() => Supplier)
    @Column({type: DataType.INTEGER})
    id_sup: number;

    @Column({type: DataType.DATE, unique: false, allowNull: false})
    update_date: Date;

    @BelongsTo( () => Oil , 'id_oil')
    oil: Oil;

    @BelongsTo( () => Supplier , 'id_sup')
    supplier: Supplier;


}
