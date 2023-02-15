import {Column, DataType, Model, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Supplier } from '../../suppliers/entities/supplier.model';
import { PriceOilsConfigAttr } from "../interfaces/price-oils.interface";
import { Oil } from "src/oils/entities/oil.model";
import { Storage } from "src/storage/entities/storage.model";

@Table({tableName: 'price_oil', createdAt: false, updatedAt: false})
export class PriceOil extends Model<PriceOil, PriceOilsConfigAttr>{ 
    
   @Column({type: DataType.INTEGER, unique: false, autoIncrement: false, primaryKey: true})
   id: number;

   @Column({type: DataType.INTEGER, unique: false, allowNull: true})
   price_wholesale: number;
   
   @Column({type: DataType.INTEGER, unique: false, allowNull: true})
   price: number;

   @ForeignKey(() => Oil)
   @Column({type: DataType.INTEGER})
   id_oil: number;

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

   @BelongsTo( () => Oil , 'id_oil')
   oil: Oil;

   @BelongsTo( () => Supplier , 'id_supplier')
   supplier: Supplier;

   @BelongsTo( () => Storage , 'id_storage')
   storage: Storage;

}
