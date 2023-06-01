import {Column, DataType, Model, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Supplier } from '../../suppliers/entities/supplier.model';
import { PriceWheelsConfigAttr } from "../interfaces/price-wheels.interface";
import { Storage } from "../../storage/entities/storage.model";
import { Wheel } from "../../wheels/entities/wheel.model";

@Table({tableName: 'price_wheel', createdAt: false, updatedAt: false})
export class PriceWheels extends Model<PriceWheels, PriceWheelsConfigAttr>{ 
    
   @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
   id: number;

   @ForeignKey(() => Wheel)
   @Column({type: DataType.INTEGER})
   id_wheel: number;

   @Column({type: DataType.INTEGER, unique: false, allowNull: true})
   price_wholesale: number;
   
   @Column({type: DataType.INTEGER, unique: false, allowNull: true})
   price: number;

   @Column({type: DataType.INTEGER, unique: false, allowNull: true})
   old_price: number;

   @ForeignKey(() => Supplier)
   @Column({type: DataType.INTEGER})
   id_supplier: number;

   @ForeignKey(() => Storage)
   @Column({type: DataType.INTEGER})
   id_storage: number;

   @Column({type: DataType.INTEGER, unique: false, allowNull: true})
   delivery_price: number;

   @Column({type: DataType.INTEGER, unique: false, allowNull: true})
   price_plus_delivery: number;

   @Column({type: DataType.DATE, unique: false, allowNull: false})
   update_date: Date;

   @BelongsTo( () => Wheel , 'id_wheel')
   wheel: Wheel;

   @BelongsTo( () => Supplier , 'id_supplier')
   supplier: Supplier;

   @BelongsTo( () => Storage , 'id_storage')
   storage: Storage;

}