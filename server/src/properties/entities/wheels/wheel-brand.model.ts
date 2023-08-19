import {
  Column,
  DataType,
  Model,
  Table,
  HasMany,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Wheel } from '../../../wheels/entities/wheel.model';
import { WheelPropsConfigAttr } from '../../interfaces/wheels/wheel-props.interface';
import { Description } from '../../../description/entities/description.entity';
import { RatingWheels } from '../../../ratings/entities/rating-wheels.model';
import { ReviewWheels } from '../../../reviews/entities/review-wheels.model';

@Table({ tableName: 'wheel_brand', updatedAt: false, createdAt: false })
export class WheelBrand extends Model<WheelBrand, WheelPropsConfigAttr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id_brand: number;
   
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  brand: string;

  @ForeignKey(() => Description)
  @Column({ type: DataType.INTEGER })
  id_description: number;

  @BelongsTo(() => Description, 'id_description')
  description: Description;

  @HasMany(() => Wheel, 'id_brand')
  wheels: Wheel[];

  @HasMany(() => RatingWheels, 'id_brand')
  ratings: RatingWheels[];

  @HasMany(() => ReviewWheels, 'id_brand')
  reviews: ReviewWheels[];
}