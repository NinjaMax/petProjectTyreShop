import {Column, DataType, Model, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Battery } from "src/batteries/entities/battery.model";
import { Storage } from "src/storage/entities/storage.model";
import { Supplier } from '../../suppliers/entities/supplier.model';
import { PriceBatteryConfigAttr } from "../interfaces/price-battery.interface";

@Table({tableName: 'price_battery', createdAt: false, updatedAt: false})
export class PriceBatteries extends Model<PriceBatteries, PriceBatteryConfigAttr>{ 
    
   @Column({type: DataType.INTEGER, unique: false, autoIncrement: false, primaryKey: true})
   id: number;

   @Column({type: DataType.INTEGER, unique: false, allowNull: true})
   price_wholesale: number;
   
   @Column({type: DataType.INTEGER, unique: false, allowNull: true})
   price: number;

   @ForeignKey(() => Battery)
   @Column({type: DataType.INTEGER})
   id_battery: number;

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

   @BelongsTo( () => Battery , 'id_battery')
   battery: Battery;

   @BelongsTo( () => Supplier , 'id_supplier')
   supplier: Supplier;

   @BelongsTo( () => Storage , 'id_storage')
   storage: Storage;

}