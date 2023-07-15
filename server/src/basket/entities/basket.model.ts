import {
  Column,
  DataType,
  Model,
  Table,
  HasOne,
  BelongsTo,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import { Orders } from '../../orders/entities/order.model';
import { BasketConfigAttr } from '../interfaces/basket.interface';
import { Customer } from '../../customers/entities/customer.model';
import { Users } from '../../users/entities/users.model';
import { Basket_Storage } from './basket-storage.model';

@Table({ tableName: 'basket' })
export class Basket extends Model<Basket, BasketConfigAttr> {
  @Column({
    type: DataType.BIGINT,
    unique: true,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id_basket: number;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  name: string;

  @Column({ type: DataType.BIGINT, unique: true, allowNull: true })
  phone: bigint;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  email: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  address: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  notes: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  storage: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  delivery: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  pay_view: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  dop_garanty: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  session_id: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false})
  checkedIn: boolean;
  
  @ForeignKey(() => Users)
  @Column({ type: DataType.INTEGER })
  id_user: number;

  @ForeignKey(() => Customer)
  @Column({ type: DataType.INTEGER })
  id_customer: number;

  @BelongsTo(() => Users, 'id_user')
  user: Users;

  @BelongsTo(() => Customer, 'id_customer')
  customer: Customer;

  @HasOne(() => Orders, 'id_basket')
  order: Orders;

  @HasMany(() => Basket_Storage, 'id_basket')
  basket_storage: Basket_Storage[];
}
