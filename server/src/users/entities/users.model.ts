import {
  Column,
  DataType,
  Model,
  Table,
  HasMany,
  HasOne,
} from 'sequelize-typescript';
import { UsersConfigAttr } from '../interfaces/users.interface';
import { Orders } from '../../orders/entities/order.model';
import { Basket } from '../../basket/entities/basket.model';
import { Comments } from '../../comments/entities/comment.model';
import { OrdersSupplier } from '../../orders-suppliers/entities/orders-supplier.model';
import { Contract } from '../../contract/entities/contract.model';
import { Question } from '../../questions/entities/question.entity';
import { Paynment } from '../../paynment/entities/paynment.model';

@Table({ tableName: 'user', createdAt: false, updatedAt: false })
export class Users extends Model<Users, UsersConfigAttr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  })
  id_user: number;

  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  full_name: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  password: string;

  @Column({ type: DataType.BIGINT, unique: true, allowNull: false })
  phone: bigint;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  email: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  picture: string;

  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
    defaultValue: 'manager',
  })
  role: string;

  @HasOne(() => Basket, 'id_user')
  basket: Basket;

  @HasOne(() => Paynment, 'id_user')
  paynment: Paynment;

  @HasMany(() => Orders, 'id_user')
  orders: Orders[];

  @HasMany(() => Comments, 'id_user')
  comments: Comments[];

  @HasMany(() => OrdersSupplier, 'id_user')
  orders_sup: OrdersSupplier[];

  @HasMany(() => Contract, 'id_user')
  contract: Contract[];

  @HasMany(() => Question, 'id_user')
  question: Question[];
}
