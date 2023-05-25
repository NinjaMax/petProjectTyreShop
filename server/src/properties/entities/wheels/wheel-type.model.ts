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

@Table({ tableName: 'wheel_type', updatedAt: false, createdAt: false })
export class WheelType extends Model<WheelType, WheelPropsConfigAttr> {
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
    primaryKey: true,
    autoIncrement: false,
  })
  id_type: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: true })
  type: string;

  @ForeignKey(() => Description)
  @Column({ type: DataType.INTEGER })
  id_description: number;

  @BelongsTo(() => Description, 'id_description')
  description: Description;

  @HasMany(() => Wheel, 'id_type')
  wheels: Wheel[];
}
