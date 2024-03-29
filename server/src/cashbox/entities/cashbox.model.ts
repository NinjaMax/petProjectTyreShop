import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import { CashboxConfigAttr } from '../interfaces/cashbox.interface';
import { Paynment } from '../../paynment/entities/paynment.model';

@Table({ tableName: 'cashbox', createdAt: false, updatedAt: false })
export class Cashbox extends Model<Cashbox, CashboxConfigAttr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id_cashbox: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  cashbox: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  organisation: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  cashboxType: string;

  @Column({
    type: DataType.INTEGER,
    unique: false,
    allowNull: true,
    defaultValue: 0,
  })
  funds: number;

  @HasMany(() => Paynment, 'id_cashbox')
  paynment: Paynment[];
}

