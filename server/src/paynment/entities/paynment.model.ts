import {Column, DataType, Model, Table, ForeignKey, BelongsTo } from "sequelize-typescript";
import { PaynmentConfigAttr } from "../interfaces/paynment.interface";
import { Cashbox } from "src/cashbox/entities/cashbox.model";
import { Sales } from "src/sales/entities/sale.model";
import { Orders } from "src/orders/entities/order.model";
import { OrdersSupplier } from "src/orders-suppliers/entities/orders-supplier.model";
import { Incomes } from "src/incomes/entities/income.model";
import { Expense } from "src/expenses/entities/expense.model";

@Table({tableName: 'paynment'})
export class Paynment extends Model<Paynment, PaynmentConfigAttr>{ 
    
   @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
   id_paynment: number;

   @Column({type: DataType.STRING, unique: false, allowNull: true})
   type_paynment: string;

   @Column({type: DataType.INTEGER, unique: false, allowNull: false})
   price: number;

   @Column({type: DataType.STRING, unique: false, allowNull: true})
   notes: string;

   @Column({type: DataType.STRING, unique: false, allowNull: true})
   status: string;

   @ForeignKey(() => Cashbox)
   @Column({type: DataType.INTEGER})
   id_cashbox: number;

   @ForeignKey(() => Orders)
   @Column({type: DataType.INTEGER})
   id_order: number;

   @ForeignKey(() => OrdersSupplier)
   @Column({type: DataType.INTEGER})
   id_order_sup: number;

   @ForeignKey(() => Incomes)
   @Column({type: DataType.INTEGER})
   id_income: number;

   @ForeignKey(() => Expense)
   @Column({type: DataType.INTEGER})
   id_expense: number;

   @BelongsTo( () => Cashbox , 'id_cashbox')
   cashbox: Cashbox;

   @BelongsTo( () => Sales , 'id_sale')
   sale: Sales;

   @BelongsTo( () => Orders , 'id_order')
   order: Orders;

   @BelongsTo( () => OrdersSupplier , 'id_order_sup')
   order_sup: OrdersSupplier;

   @BelongsTo( () => Incomes , 'id_income')
   incomes: Incomes;

   @BelongsTo( () => Expense , 'id_expense')
   expenses: Expense;

}
