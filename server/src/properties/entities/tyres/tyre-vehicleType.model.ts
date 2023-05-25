import {
  Column,
  DataType,
  Model,
  Table,
  HasMany,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Tyres } from '../../../tyres/entities/tyres.model';
import { TyrePropsConfigAttr } from '../../interfaces/tyres/tyre-props.interface';
import { Description } from 'src/description/entities/description.entity';

@Table({ tableName: 'tyre_vehicle_type', updatedAt: false, createdAt: false })
export class TyreVehicleType extends Model<
  TyreVehicleType,
  TyrePropsConfigAttr
> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    allowNull: false,
    primaryKey: true,
    autoIncrement: false,
  })
  id_vehicle_type: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  vehicle_type: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  vehicle_type_ua: string;

  @ForeignKey(() => Description)
  @Column({ type: DataType.INTEGER })
  id_description: number;

  @BelongsTo(() => Description, 'id_description')
  description: Description;

  @HasMany(() => Tyres, 'id_vehicle_type')
  tyres: Tyres[];
}
