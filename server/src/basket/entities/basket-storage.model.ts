import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { BasketStorageConfigAttr } from '../interfaces/basket-storage.interface';
import { Basket } from './basket.model';

@Table({ tableName: 'basket_storage', createdAt: true, updatedAt: true })
export class Basket_Storage extends Model<
  Basket_Storage,
  BasketStorageConfigAttr
> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id_basket_storage: number;

  @Column({ type: DataType.INTEGER, unique: false, allowNull: true })
  id: number;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  full_name: string;

  @Column({ type: DataType.INTEGER, unique: false, allowNull: true })
  id_cat: number;
  
  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  category: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  season: string;

  @ForeignKey(() => Basket)
  @Column({ type: DataType.INTEGER, unique: false, allowNull: true })
  id_basket: number;

  @Column({ type: DataType.INTEGER, unique: false, allowNull: true })
  id_storage: number;

  @Column({
    type: DataType.FLOAT,
    unique: false,
    allowNull: true,
    defaultValue: 0,
  })
  ratingCount: number;

  @Column({ type: DataType.INTEGER, unique: false, allowNull: true })
  id_supplier: number;

  @Column({
    type: DataType.INTEGER,
    unique: false,
    allowNull: true,
    defaultValue: 0,
  })
  reviewCount: number;

  @Column({ type: DataType.INTEGER, unique: false, allowNull: true })
  quantity: number;

  @Column({
    type: DataType.INTEGER,
    unique: false,
    allowNull: true,
    defaultValue: 0,
  })
  price: number;

  @Column({type: DataType.INTEGER, unique: false, allowNull: true})
  price_wholesale: number;

  @Column({
    type: DataType.BIGINT,
    unique: false,
    allowNull: true,

    get() {
      const getTotal: number =
        this.getDataValue('price') * this.getDataValue('quantity');
      return getTotal;
    },
    set(getTotal) {
      this.setDataValue('total', getTotal);
    },
  })
  total: number;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  diameter: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  ref_diameter: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  weight: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  ref_weight: string;

  @BelongsTo(() => Basket, 'id_basket')
  basket: Basket;
}
