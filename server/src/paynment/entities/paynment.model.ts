import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { PaynmentConfigAttr } from '../interfaces/paynment.interface';
import { Cashbox } from '../../cashbox/entities/cashbox.model';
import { Contract } from '../../contract/entities/contract.model';
import { Expense } from '../../expenses/entities/expense.model';
import { Incomes } from '../../incomes/entities/income.model';
import { OrdersSupplier } from '../../orders-suppliers/entities/orders-supplier.model';
import { Orders } from '../../orders/entities/order.model';
import { Paytype } from '../../paytypes/entities/paytype.entity';

@Table({ tableName: 'paynment' })
export class Paynment extends Model<Paynment, PaynmentConfigAttr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id_paynment: number;

  @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
  price: number;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  notes: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  status: string;

  @ForeignKey(() => Cashbox)
  @Column({ type: DataType.INTEGER, allowNull: false })
  id_cashbox: number;

  @ForeignKey(() => Orders)
  @Column({ type: DataType.INTEGER })
  id_order: number;

  @ForeignKey(() => OrdersSupplier)
  @Column({ type: DataType.INTEGER })
  id_order_sup: number;

  @ForeignKey(() => Contract)
  @Column({ type: DataType.INTEGER })
  id_contract: number;

  @ForeignKey(() => Incomes)
  @Column({ type: DataType.INTEGER })
  id_income: number;

  @ForeignKey(() => Expense)
  @Column({ type: DataType.INTEGER })
  id_expense: number;

  @ForeignKey(() => Paytype)
  @Column({ type: DataType.INTEGER })
  id_paytype: number;

  @BelongsTo(() => Expense, 'id_expense')
  expenses: Expense;

  @BelongsTo(() => Cashbox, 'id_cashbox')
  cashbox: Cashbox;

  @BelongsTo(() => Orders, 'id_order')
  order: Orders;

  @BelongsTo(() => OrdersSupplier, 'id_order_sup')
  order_sup: OrdersSupplier;

  @BelongsTo(() => Incomes, 'id_income')
  incomes: Incomes;

  @BelongsTo(() => Paytype, 'id_paytype')
  paytype: Paytype;

  @BelongsTo(() => Contract, 'id_contract')
  contract: Contract;
}
