import {Column, DataType, Model, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { Tyres } from "../../tyres/entities/tyres.model";
import { Supplier } from '../../suppliers/entities/supplier.model';
import { PriceTyresConfigAttr } from "../interfaces/price-tyres.interface";
import { Storage } from "src/storage/entities/storage.model";

@Table({tableName: 'price_tyres', createdAt: false, updatedAt: false})
export class PriceTyres extends Model<PriceTyres, PriceTyresConfigAttr>{ 
    
   @ForeignKey(() => Tyres)
   @Column({type: DataType.INTEGER, unique: true, autoIncrement: false, primaryKey: true})
   id_tyres: number;

   @Column({type: DataType.INTEGER, unique: false, allowNull: true})
   price_wholesale: number;
   
   @Column({type: DataType.INTEGER, unique: false, allowNull: true})
   price: number;

   @ForeignKey(() => Supplier)
   @Column({type: DataType.INTEGER})
   id_sup: number;

   @ForeignKey(() => Storage)
   @Column({type: DataType.INTEGER})
   id_storage: number;

   @Column({type: DataType.INTEGER, unique: false, allowNull: true})
   delivery_price: number;

   @Column({type: DataType.INTEGER, unique: false, allowNull: true})
   price_plus_delivery: number;

   @Column({type: DataType.DATE, unique: false, allowNull: false})
   update_date: Date;

   @BelongsTo( () => Tyres , 'id_tyres')
   tyres: Tyres;

   @BelongsTo( () => Supplier , 'id_sup')
   supplier: Supplier;

   @BelongsTo( () => Storage , 'id_storage')
   storage: Storage;

}
