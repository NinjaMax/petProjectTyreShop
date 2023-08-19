import {
  Column,
  DataType,
  Model,
  Table,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Wheel } from '../../wheels/entities/wheel.model';
import { WheelModel } from '../../properties/entities/wheels/wheel-model.model';
import { WheelBrand } from '../../properties/entities/wheels/wheel-brand.model';
import { ReviewWheels } from '../../reviews/entities/review-wheels.model';
import { RatingWheelsConfigAttr } from '../interfaces/rating-wheels.interface';

@Table({ tableName: 'rating_wheels', createdAt: false, updatedAt: false })
export class RatingWheels extends Model<RatingWheels, RatingWheelsConfigAttr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id_rating: number;

  @ForeignKey(() => Wheel)
  @Column({ type: DataType.INTEGER })
  id: number;

  @ForeignKey(() => ReviewWheels)
  @Column({ type: DataType.INTEGER })
  id_review: number;

  @Column({ type: DataType.FLOAT, unique: false, allowNull: false })
  rating_overall: number;

  @ForeignKey(() => WheelModel)
  @Column({ type: DataType.INTEGER })
  id_model: number;

  @ForeignKey(() => WheelBrand)
  @Column({ type: DataType.INTEGER })
  id_brand: number;

  @BelongsTo(() => Wheel, 'id')
  wheels: Wheel;

  @BelongsTo(() => ReviewWheels, 'id_review')
  review: ReviewWheels;

  @BelongsTo(() => WheelModel, 'id_model')
  wheel_model: WheelModel;

  @BelongsTo(() => WheelBrand, 'id_brand')
  wheel_brand: WheelBrand;
}
