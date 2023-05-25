import { Model, HasMany, Table, Column, DataType } from 'sequelize-typescript';
import { Battery } from '../../batteries/entities/battery.model';
import { Category } from '../../categorys/entities/category.model';
import { Oil } from '../../oils/entities/oil.model';
import { TyreBrand } from '../../properties/entities/tyres/tyre-brand.model';
import { TyreHomologation } from '../../properties/entities/tyres/tyre-homologation.model';
import { TyreModel } from '../../properties/entities/tyres/tyre-model.model';
import { TyreVehicleType } from '../../properties/entities/tyres/tyre-vehicleType.model';
import { WheelBrand } from '../../properties/entities/wheels/wheel-brand.model';
import { WheelModel } from '../../properties/entities/wheels/wheel-model.model';
import { WheelType } from '../../properties/entities/wheels/wheel-type.model';
import { Wheel } from '../../wheels/entities/wheel.model';
import { Tyres } from '../../tyres/entities/tyres.model';
import { DescriptionConfigAttr } from '../interfaces/description.interface';

@Table({ tableName: 'description', createdAt: false, updatedAt: false })
export class Description extends Model<Description, DescriptionConfigAttr> {
  @Column({
    type: DataType.BIGINT,
    unique: true,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id_description: number;

  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  description: string;

  @HasMany(() => Tyres, 'id_description')
  tyres: Tyres[];

  @HasMany(() => Wheel, 'id_description')
  wheels: Wheel[];

  @HasMany(() => Oil, 'id_description')
  oils: Oil[];

  @HasMany(() => Battery, 'id_description')
  batteries: Battery[];

  @HasMany(() => TyreBrand, 'id_description')
  tyre_brand: TyreBrand[];

  @HasMany(() => TyreModel, 'id_description')
  tyre_model: TyreModel[];

  @HasMany(() => TyreHomologation, 'id_description')
  homologation: TyreHomologation[];

  @HasMany(() => TyreVehicleType, 'id_description')
  vehicle_type: TyreVehicleType[];

  @HasMany(() => Category, 'id_description')
  category: Category[];

  @HasMany(() => WheelBrand, 'id_description')
  wheel_brand: WheelBrand;

  @HasMany(() => WheelModel, 'id_description')
  wheel_model: WheelModel;

  @HasMany(() => WheelType, 'id_description')
  wheel_type: WheelType;
}
