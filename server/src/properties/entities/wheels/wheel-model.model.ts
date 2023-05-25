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
}
