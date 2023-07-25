import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { ContractConfigAttr } from '../interfaces/contract.interface';
import { Customer } from '../../customers/entities/customer.model';
import { Paynment } from '../../paynment/entities/paynment.model';
import { Supplier } from '../../suppliers/entities/supplier.model';
import { Users } from '../../users/entities/users.model';

@Table({ tableName: 'contract' })
export class Contract extends Model<Contract, ContractConfigAttr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id_contract: number;

  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  name: string;

  @Column({
    type: DataType.INTEGER,
    unique: false,
    allowNull: true,
    defaultValue: 0,
  })
  balance: number;

  @Column({
    type: DataType.INTEGER,
    unique: false,
    allowNull: true,
    defaultValue: 0,
  })
  bonus: number;

  @ForeignKey(() => Users)
  @Column({ type: DataType.INTEGER })
  id_user: number;

  @ForeignKey(() => Customer)
  @Column({ type: DataType.INTEGER })
  id_customer: number;

  @ForeignKey(() => Supplier)
  @Column({ type: DataType.INTEGER })
  id_supplier: number;

  @BelongsTo(() => Users, 'id_user')
  user: Users;

  @BelongsTo(() => Customer, 'id_customer')
  customer: Customer;

  @BelongsTo(() => Supplier, 'id_supplier')
  supplier: Supplier;

  @HasMany(() => Paynment, 'id_contract')
  paynment: Paynment;
}
