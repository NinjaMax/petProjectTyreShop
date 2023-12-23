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
import { OrdersSupplier } from '../../orders-suppliers/entities/orders-supplier.model';
import { Orders } from '../../orders/entities/order.model';
import { Paytype } from '../../paytypes/entities/paytype.entity';
import { Payview } from '../../payviews/entities/payview.entity';

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

  @ForeignKey(() => Cashbox)
  @Column({ type: DataType.INTEGER, allowNull: false })
  id_cashbox: number;

  @ForeignKey(() => Orders)
  @Column({ type: DataType.INTEGER, unique: false, allowNull: true })
  id_order: number;

  @ForeignKey(() => OrdersSupplier)
  @Column({ type: DataType.INTEGER, unique: false, allowNull: true })
  id_order_sup: number;

  @ForeignKey(() => Contract)
  @Column({ type: DataType.INTEGER, unique: false, allowNull: true })
  id_contract: number;

  @ForeignKey(() => Paytype)
  @Column({ type: DataType.INTEGER, unique: false, allowNull: true })
  id_paytype: number;

  @ForeignKey(() => Payview)
  @Column({ type: DataType.INTEGER, unique: false, allowNull: true })
  id_payviews: number;

  @BelongsTo(() => Cashbox, 'id_cashbox')
  cashbox: Cashbox;

  @BelongsTo(() => Orders, 'id_order')
  order: Orders;

  @BelongsTo(() => OrdersSupplier, 'id_order_sup')
  order_sup: OrdersSupplier;

  @BelongsTo(() => Paytype, 'id_paytype')
  paytype: Paytype;

  @BelongsTo(() => Payview, 'id_payviews')
  payview: Payview;

  @BelongsTo(() => Contract, 'id_contract')
  contract: Contract;
}
