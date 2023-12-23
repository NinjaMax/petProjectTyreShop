import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { PayviewsConfigAttr } from '../interfaces/payviews.interface';
import { Paynment } from 'src/paynment/entities/paynment.model';

@Table({ tableName: 'payviews', createdAt: false, updatedAt: false })
export class Payview extends Model<Payview, PayviewsConfigAttr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id_payviews: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  payviews: string;

  @HasMany(() => Paynment, 'id_payviews')
  paynment: Paynment[];
}
