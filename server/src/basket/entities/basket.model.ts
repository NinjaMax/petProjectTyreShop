import {
  Column,
  DataType,
  Model,
  Table,
  HasOne,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Orders } from '../../orders/entities/order.model';
import { BasketConfigAttr } from '../interfaces/basket.interface';
import { Customer } from '../../customers/entities/customer.model';
import { Users } from '../../users/entities/users.model';

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

  @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
  id_cat: number;

  @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
  id_goods: number;

  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  goods: string;

  @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
  quantity: number;

  @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
  price: number;

  @Column({
    type: DataType.BIGINT,
    unique: false,
    allowNull: false,
    set() {
      this.setDataValue(
        'total',
        this.getDataValue('price') * this.getDataValue('quantity'),
      );
    },
  })
  total: number;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  notes: string;

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
}
