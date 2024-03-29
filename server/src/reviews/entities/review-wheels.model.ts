import {
  Column,
  DataType,
  Model,
  Table,
  BelongsTo,
  ForeignKey,
  HasOne,
} from 'sequelize-typescript';
import { ReviewsTyresConfigAttr } from '../interfaces/review-tyres.interface';
import { Customer } from '../../customers/entities/customer.model';
import { TyreBrand } from '../../properties/entities/tyres/tyre-brand.model';
import { WheelModel } from '../../properties/entities/wheels/wheel-model.model';
import { Tyres } from '../../tyres/entities/tyres.model';
import { Wheel } from '../../wheels/entities/wheel.model';
import { WheelBrand } from '../../properties/entities/wheels/wheel-brand.model';
import { RatingWheels } from '../../ratings/entities/rating-wheels.model';

@Table({ tableName: 'review_wheels', createdAt: true, updatedAt: false })
export class ReviewWheels extends Model<ReviewWheels, ReviewsTyresConfigAttr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id_review: number;

  @ForeignKey(() => Tyres)
  @Column({ type: DataType.INTEGER, allowNull: false })
  id: number;

  @ForeignKey(() => WheelModel)
  @Column({ type: DataType.INTEGER, allowNull: false })
  id_model: number;

  @ForeignKey(() => TyreBrand)
  @Column({ type: DataType.INTEGER, allowNull: false })
  id_brand: number;

  @ForeignKey(() => Customer)
  @Column({ type: DataType.INTEGER, unique: false, allowNull: true })
  id_customer: number;

  // @ForeignKey(() => Users)
  // @Column({ type: DataType.INTEGER, unique: false, allowNull: true })
  // id_user: number;

  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  description: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  positive: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  negative: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  driver_experience: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  car: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  email: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  customer_pictures: string;

  @Column({
    type: DataType.INTEGER,
    unique: false,
    defaultValue: 0,
    allowNull: true,
  })
  like_count: number;

  @Column({
    type: DataType.INTEGER,
    unique: false,
    defaultValue: 0,
    allowNull: true,
  })
  dislike_count: number;

  @BelongsTo(() => Customer, 'id_customer')
  customer: Customer;

  @BelongsTo(() => Wheel, 'id')
  wheels: Wheel;

  @HasOne(() => RatingWheels, 'id_review')
  rating: RatingWheels;

  @BelongsTo(() => WheelModel, 'id_model')
  model: WheelModel;

  @BelongsTo(() => WheelBrand, 'id_brand')
  brand: WheelBrand;
}
