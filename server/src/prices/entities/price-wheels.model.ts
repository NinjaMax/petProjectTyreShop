import {Column, DataType, Model, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Supplier } from '../../suppliers/entities/supplier.model';
import { PriceWheelsConfigAttr } from "../interfaces/price-wheels.interface";
import { Wheel } from "src/wheels/entities/wheel.model";

@Table({tableName: 'price_wheel', createdAt: false, updatedAt: false})
export class PriceWheels extends Model<PriceWheels, PriceWheelsConfigAttr>{ 
    
   @ForeignKey(() => Wheel)
   @Column({type: DataType.INTEGER, unique: true, autoIncrement: false, primaryKey: true})
   id_wheel: number;

   @Column({type: DataType.INTEGER, unique: false, allowNull: true})
   price_wholesale: number;
   
   @Column({type: DataType.INTEGER, unique: false, allowNull: true})
   price: number;

   @ForeignKey(() => Supplier)
   @Column({type: DataType.INTEGER})
   id_sup: number;

   @Column({type: DataType.INTEGER, unique: false, allowNull: true})
   delivery_price: number;

   @Column({type: DataType.INTEGER, unique: false, allowNull: true})
   price_plus_delivery: number;

   @Column({type: DataType.DATE, unique: false, allowNull: false})
   update_date: Date;

   @BelongsTo( () => Wheel , 'id_wheel')
   wheel: Wheel;

   @BelongsTo( () => Supplier , 'id_sup')
   supplier: Supplier;

}