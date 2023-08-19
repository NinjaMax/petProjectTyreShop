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

@Table({ tableName: 'wheel_model', updatedAt: false, createdAt: false })
export class WheelModel extends Model<WheelModel, WheelPropsConfigAttr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    allowNull: false,
    primaryKey: true,
    autoIncrement: false,
  })
  id_model: number;

  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  model: string;

  @ForeignKey(() => Description)
  @Column({ type: DataType.INTEGER })
  id_description: number;

  @BelongsTo(() => Description, 'id_description')
  description: Description;

  @HasMany(() => Wheel, 'id_model')
  wheels: Wheel[];

  @HasMany(() => RatingWheels, 'id_model')
  ratings: RatingWheels[];

  @HasMany(() => ReviewWheels, 'id_model')
  reviews: ReviewWheels[];
}
