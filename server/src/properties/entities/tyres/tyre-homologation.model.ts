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
import { Description } from '../../../description/entities/description.entity';

@Table({ tableName: 'tyre_homologation', updatedAt: false, createdAt: false })
export class TyreHomologation extends Model<
  TyreHomologation,
  TyrePropsConfigAttr
> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id_homologation: number;
   
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  homologation: string;

  @ForeignKey(() => Description)
  @Column({ type: DataType.INTEGER })
  id_description: number;
  
  @BelongsTo(() => Description, 'id_description')
  description: Description;

  @HasMany(() => Tyres, 'id_homologation')
  tyres: Tyres[];
}