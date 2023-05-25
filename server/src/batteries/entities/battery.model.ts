import {
  Column,
  DataType,
  Model,
  Table,
  BelongsTo,
  HasMany,
  ForeignKey,
} from 'sequelize-typescript';
import { BatteryConfigAttr } from '../interfaces/batteries.interface';
import { Category } from '../../categorys/entities/category.model';
import { PriceBatteries } from '../../prices/entities/price-battery.model';
import { StockBatteries } from '../../stock/entities/stock-batteries.model';
import { Description } from '../../description/entities/description.entity';

@Table({ tableName: 'batterie', createdAt: false })
export class Battery extends Model<Battery, BatteryConfigAttr> {
  @Column({
    type: DataType.BIGINT,
    unique: true,
    allowNull: false,
    primaryKey: true,
    autoIncrement: false,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  full_name: string;

  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER })
  id_cat: number;

  @ForeignKey(() => Description)
  @Column({ type: DataType.INTEGER })
  id_description: number;

  @BelongsTo(() => Category, 'id_cat')
  category: Category;

  @BelongsTo(() => Description, 'id_description')
  description: Description;

  @HasMany(() => PriceBatteries, 'id_battery')
  price: PriceBatteries[];

  @HasMany(() => StockBatteries, 'id_battery')
  stock: StockBatteries[];
}
