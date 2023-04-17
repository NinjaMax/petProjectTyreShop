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

  @BelongsTo(() => Category, 'id_cat')
  category: Category;

  @HasMany(() => PriceBatteries, 'id_battery')
  price: PriceBatteries[];

  @HasMany(() => StockBatteries, 'id_battery')
  stock: StockBatteries[];

  //@BelongsToMany(() => Orders, () => Orders_Goods)
  //orders: Orders[];
}
