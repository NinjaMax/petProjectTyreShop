import { Table, Column, DataType, Model, HasMany } from 'sequelize-typescript';
import { Paynment } from '../../paynment/entities/paynment.model';
import { PaytypesConfigAttr } from '../interfaces/paytype.interface';

@Table({ tableName: 'paytypes', createdAt: false, updatedAt: false })
export class Paytype extends Model<Paytype, PaytypesConfigAttr> {
  @Column({
    type: DataType.BIGINT,
    unique: true,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id_paytype: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  paytype: string;

  @HasMany(() => Paynment, 'id_paytype')
  paynment: Paynment[];
}
