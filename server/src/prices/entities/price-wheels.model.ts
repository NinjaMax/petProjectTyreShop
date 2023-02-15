import {Column, DataType, Model, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Supplier } from '../../suppliers/entities/supplier.model';
import { PriceWheelsConfigAttr } from "../interfaces/price-wheels.interface";
import { Wheel } from "src/wheels/entities/wheel.model";
import { Storage } from "src/storage/entities/storage.model";

@Table({tableName: 'price_wheel', createdAt: false, updatedAt: false})
export class PriceWheels extends Model<PriceWheels, PriceWheelsConfigAttr>{ 
    
   @Column({type: DataType.INTEGER, unique: false, autoIncrement: false, primaryKey: true})
   id: number;

   @Column({type: DataType.INTEGER, unique: false, allowNull: true})
   price_wholesale: number;
   
   @Column({type: DataType.INTEGER, unique: false, allowNull: true})
   price: number;

   @ForeignKey(() => Wheel)
   @Column({type: DataType.INTEGER})
   id_wheel: number;

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

   @BelongsTo( () => Wheel , 'id')
   wheel: Wheel;

   @BelongsTo( () => Supplier , 'id_supplier')
   supplier: Supplier;

   @BelongsTo( () => Storage , 'id_storage')
   storage: Storage;

}