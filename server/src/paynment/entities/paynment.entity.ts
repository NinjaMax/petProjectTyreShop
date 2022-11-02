import {Column, DataType, Model, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { PaynmentConfigAttr } from "../interfaces/paynment.interface";
import { Cashbox } from "src/cashbox/entities/cashbox.entity";
import { Sales } from "src/sales/entities/sale.entity";
import { Orders } from "src/orders/entities/order.model";
import { OrdersSupplier } from "src/orders-suppliers/entities/orders-supplier.model";

@Table({tableName: 'paynment'})
export class Paynment extends Model<Paynment, PaynmentConfigAttr>{ 
    
   @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
   id_paynment: number;

   @Column({type: DataType.INTEGER, unique: false, allowNull: false})
   coming: number;
   
   @Column({type: DataType.INTEGER, unique: false, allowNull: false})
   rate: number;

   @Column({type: DataType.INTEGER, unique: false, allowNull: false})
   price: number;

   @Column({type: DataType.STRING, unique: false, allowNull: true})
   notes: string;

   @Column({type: DataType.STRING, unique: false, allowNull: true})
   status: string;

   @ForeignKey(() => Cashbox)
   @Column({type: DataType.INTEGER})
   id_cashbox: number;

   @ForeignKey(() => Sales)
   @Column({type: DataType.INTEGER})
   id_sale: number;

   @ForeignKey(() => Orders)
   @Column({type: DataType.INTEGER})
   id_order: number;

   @ForeignKey(() => OrdersSupplier)
   @Column({type: DataType.INTEGER})
   id_order_sup: number;

   @BelongsTo( () => Cashbox , 'id_cashbox')
   cashbox: Cashbox;

   @BelongsTo( () => Sales , 'id_sale')
   sale: Sales;

   @BelongsTo( () => Orders , 'id_order')
   order: Orders;

   @BelongsTo( () => OrdersSupplier , 'id_order_sup')
   order_sup: OrdersSupplier;

}
