//import sequelize from "sequelize";
import {
  Column,
  DataType,
  Model,
  Table,
  BelongsTo,
  HasMany,
  ForeignKey,
  Sequelize,
} from 'sequelize-typescript';
import { OrdersConfigAttr } from '../interfaces/orders.interface';
//import { Orders_Goods } from "./order-goods.model";
import { Order_Storage } from './order-storage.model';
import { Basket } from '../../basket/entities/basket.model';
import { Comments } from '../../comments/entities/comment.model';
import { Customer } from '../../customers/entities/customer.model';
import { OrdersSupplier } from '../../orders-suppliers/entities/orders-supplier.model';
import { Paynment } from '../../paynment/entities/paynment.model';
import { Sales } from '../../sales/entities/sale.model';
import { Users } from '../../users/entities/users.model';

@Table({ tableName: 'order' })
export class Orders extends Model<Orders, OrdersConfigAttr> {
  @Column({
    type: DataType.BIGINT,
    unique: true,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id_order: number;

  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
    defaultValue: 'ФОП Шемендюк К.В.',
  })
  organisation: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  storage: string;

  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
    defaultValue: 'Сайт'})
  order_view: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  delivery: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  delivery_city: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  delivery_city_ref: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  delivery_city_depart: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  delivery_city_depart_ref: string;

  @Column({ type: DataType.INTEGER, unique: false, allowNull: true })
  delivery_cost: number;

  @Column({ type: DataType.INTEGER, unique: false, allowNull: true })
  dop_garanty: number;

  @Column({ type: DataType.INTEGER, unique: false, allowNull: true })
  commission_cost: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  bonus_decrease: number;

  @Column({ type: DataType.INTEGER, unique: false, allowNull: true })
  total_cost: number;

  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
    defaultValue: 'Новий'})
  status_delivery: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  delivery_ttn: string;

  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
    defaultValue: 'Новий' })
  status: string;

  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
    defaultValue: 'Новий' })
  pay_view: string;

  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
    defaultValue: 'Новий' })
  status_pay: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  notes: string;

  @ForeignKey(() => Customer)
  @Column({ type: DataType.INTEGER, allowNull: true })
  id_customer: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  id_contract: number;

  @ForeignKey(() => Users)
  @Column({ type: DataType.INTEGER, allowNull: true })
  id_user: number;

  @ForeignKey(() => Basket)
  @Column({ type: DataType.INTEGER, allowNull: true })
  id_basket: number;

  @BelongsTo(() => Users, 'id_user')
  user: Users;

  @BelongsTo(() => Customer, 'id_customer')
  customer: Customer;

  @BelongsTo(() => Basket, 'id_basket')
  basket: Basket;

  @HasMany(() => Comments, 'id_order')
  comments: Comments[];

  @HasMany(() => Order_Storage, 'id_order')
  order_storage: Order_Storage[];

  @HasMany(() => OrdersSupplier, 'id_order')
  order_sup: OrdersSupplier[];

  @HasMany(() => Paynment, 'id_order')
  paynment: Paynment[];

  @HasMany(() => Sales, 'id_order')
  sales: Sales[];
}
