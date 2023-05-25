import {
  Column,
  DataType,
  Model,
  Table,
  BelongsTo,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import { Category } from '../../categorys/entities/category.model';
import { PriceWheels } from '../../prices/entities/price-wheels.model';
import { WheelBoltCount } from '../../properties/entities/wheels/wheel-boltCount.model';
import { WheelBoltCountPcd } from '../../properties/entities/wheels/wheel-boltCountPcd.model';
import { WheelBrand } from '../../properties/entities/wheels/wheel-brand.model';
import { WheelColor } from '../../properties/entities/wheels/wheel-color.model';
import { WheelDia } from '../../properties/entities/wheels/wheel-dia.model';
import { WheelDiameter } from '../../properties/entities/wheels/wheel-diameter.model';
import { WheelEt } from '../../properties/entities/wheels/wheel-et.model';
import { WheelModel } from '../../properties/entities/wheels/wheel-model.model';
import { WheelPcd } from '../../properties/entities/wheels/wheel-pcd.model';
import { WheelPcd2 } from '../../properties/entities/wheels/wheel-pcd2.model';
import { WheelSizeDigits } from '../../properties/entities/wheels/wheel-sizeDigits.model';
import { WheelType } from '../../properties/entities/wheels/wheel-type.model';
import { WheelWidth } from '../../properties/entities/wheels/wheel-width.model';
import { StockWheels } from '../../stock/entities/stock-wheels.model';
import { WheelConfigAttr } from '../interfaces/wheel.interface';
import { Description } from '../../description/entities/description.entity';

@Table({ tableName: 'wheel', updatedAt: false })
export class Wheel extends Model<Wheel, WheelConfigAttr> {
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

  @Column({ type: DataType.STRING, unique: true, allowNull: true })
  full_name_color: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: true })
  full_name_hotline: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  photo_url: string;

  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER })
  id_cat: number;

  @Column({ type: DataType.DATE, unique: false, allowNull: false })
  update_date: Date;

  @ForeignKey(() => WheelBrand)
  @Column({ type: DataType.INTEGER })
  id_brand: number;

  @ForeignKey(() => WheelModel)
  @Column({ type: DataType.INTEGER })
  id_model: number;

  @ForeignKey(() => WheelBoltCount)
  @Column({ type: DataType.INTEGER })
  id_bolt_count: number;

  @ForeignKey(() => WheelBoltCountPcd)
  @Column({ type: DataType.INTEGER })
  id_bolt_count_pcd: number;

  @ForeignKey(() => WheelColor)
  @Column({ type: DataType.STRING })
  id_color: string;

  @ForeignKey(() => WheelDia)
  @Column({ type: DataType.INTEGER })
  id_dia: number;

  @ForeignKey(() => WheelDiameter)
  @Column({ type: DataType.INTEGER })
  id_diameter: number;

  @ForeignKey(() => WheelEt)
  @Column({ type: DataType.INTEGER })
  id_et: number;

  @ForeignKey(() => WheelPcd)
  @Column({ type: DataType.INTEGER })
  id_pcd: number;

  @ForeignKey(() => WheelPcd2)
  @Column({ type: DataType.INTEGER })
  id_pcd2: number;

  @ForeignKey(() => WheelSizeDigits)
  @Column({ type: DataType.INTEGER })
  id_size_digits: number;

  @ForeignKey(() => WheelType)
  @Column({ type: DataType.STRING })
  id_type: string;

  @ForeignKey(() => WheelWidth)
  @Column({ type: DataType.INTEGER })
  id_width: number;

  @ForeignKey(() => Description)
  @Column({ type: DataType.INTEGER })
  id_description: number;

  @BelongsTo(() => Category, 'id_cat')
  category: Category;

  @HasMany(() => StockWheels, 'id_wheel')
  stock: StockWheels[];

  @HasMany(() => PriceWheels, 'id_wheel')
  price: PriceWheels[];

  @BelongsTo(() => WheelBrand, 'id_brand')
  wheel_brand: WheelBrand;

  @BelongsTo(() => WheelModel, 'id_model')
  wheel_model: WheelModel;

  @BelongsTo(() => WheelBoltCount, 'id_bolt_count')
  bolt_count: WheelBoltCount;

  @BelongsTo(() => WheelBoltCountPcd, 'id_bolt_count_pcd')
  bolt_count_pcd: WheelBoltCountPcd;

  @BelongsTo(() => WheelColor, 'id_color')
  color: WheelColor;

  @BelongsTo(() => WheelDia, 'id_dia')
  dia: WheelDia;

  @BelongsTo(() => WheelDiameter, 'id_diameter')
  diameter: WheelDiameter;

  @BelongsTo(() => WheelEt, 'id_et')
  et: WheelEt;

  @BelongsTo(() => WheelPcd, 'id_pcd')
  pcd: WheelPcd;

  @BelongsTo(() => WheelPcd2, 'id_pcd2')
  pcd2: WheelPcd2;

  @BelongsTo(() => WheelSizeDigits, 'id_size_digits')
  size_digits: WheelSizeDigits;

  @BelongsTo(() => WheelType, 'id_type')
  type: WheelType;

  @BelongsTo(() => WheelWidth, 'id_width')
  width: WheelWidth;

  @BelongsTo(() => Description, 'id_description')
  description: Description;
}
