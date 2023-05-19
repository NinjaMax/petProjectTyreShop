import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import { IncomeConfigAttr } from '../interfaces/income.interface';
import { Paynment } from '../../paynment/entities/paynment.model';

@Table({ tableName: 'income', createdAt: false, updatedAt: false })
export class Incomes extends Model<Incomes, IncomeConfigAttr> {
  @Column({
    type: DataType.BIGINT,
    unique: true,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id_income: number;
   
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  income: string;

  @Column({ type: DataType.INTEGER })
  price: number;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  notes: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  status: string;

  @HasMany(() => Paynment, 'id_income')
  paynment: Paynment[];
}
