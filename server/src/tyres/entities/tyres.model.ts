import {
  Column,
  DataType,
  Model,
  Table,
  HasMany,
  BelongsTo,
  BelongsToMany,
  ForeignKey,
} from 'sequelize-typescript';
import { TyresConfigAttr } from '../interfaces/tyres.interface';
import { PriceTyres } from '../../prices/entities/price-tyres.model';
import { StockTyres } from '../../stock/entities/stock-tyres.model';
import { Category } from '../../categorys/entities/category.model';
import { TyreBrand } from '../../properties/entities/tyres/tyre-brand.model';
import { TyreCountry } from '../../properties/entities/tyres/tyre-country.model';
import { TyreDemo } from '../../properties/entities/tyres/tyre-demo.model';
import { TyreDiameter } from '../../properties/entities/tyres/tyre-diameter.model';
import { TyreHeight } from '../../properties/entities/tyres/tyre-height.model';
import { TyreHomologation } from '../../properties/entities/tyres/tyre-homologation.model';
import { TyreLoadIndex } from '../../properties/entities/tyres/tyre-loadIndex.model';
import { TyreModel } from '../../properties/entities/tyres/tyre-model.model';
import { TyreParams } from '../../properties/entities/tyres/tyre-params.model';
import { TyreReinforce } from '../../properties/entities/tyres/tyre-reinforce.model';
import { TyreRunFlat } from '../../properties/entities/tyres/tyre-runFlat.model';
import { TyreSeal } from '../../properties/entities/tyres/tyre-seal.model';
import { TyreSeason } from '../../properties/entities/tyres/tyre-season.model';
import { TyreSilent } from '../../properties/entities/tyres/tyre-silent.model';
import { TyreSizeDigits } from '../../properties/entities/tyres/tyre-sizeDigits.model';
import { TyreSpeedIndex } from '../../properties/entities/tyres/tyre-speedIndex.model';
import { TyreStudded } from '../../properties/entities/tyres/tyre-studded.model';
import { TyreVehicleType } from '../../properties/entities/tyres/tyre-vehicleType.model';
import { TyreWidth } from '../../properties/entities/tyres/tyre-width.model';
import { TyreYear } from '../../properties/entities/tyres/tyre-year.model';
import { RatingTyres } from '../../ratings/entities/rating-tyres.model';
import { ReviewTyres } from '../../reviews/entities/review-tyres.model';
import { Description } from '../../description/entities/description.entity';
import { TyreEuromark } from '../../properties/entities/tyres/tyre-euromark.model';
import { Question } from '../../questions/entities/question.entity';

@Table({ tableName: 'tyres', updatedAt: false })
export class Tyres extends Model<Tyres, TyresConfigAttr> {
  @Column({
    type: DataType.BIGINT,
    unique: true,
    allowNull: false,
    primaryKey: true,
    autoIncrement: false,
  })
  id: number;

  @Column({ type: DataType.BIGINT, unique: false, allowNull: true })
  id_goods_sup: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  full_name: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  photo_url: string;

  @Column({ type: DataType.DATE, unique: false, allowNull: true })
  update_date: Date;

  @ForeignKey(() => TyreBrand)
  @Column({ type: DataType.INTEGER })
  id_brand: number;

  @ForeignKey(() => TyreModel)
  @Column({ type: DataType.INTEGER })
  id_model: number;

  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER})
  id_cat: number;

  @ForeignKey(() => TyreParams)
  @Column({ type: DataType.INTEGER })
  id_params: number;

  @ForeignKey(() => TyreSeason)
  @Column({ type: DataType.INTEGER })
  id_season: number;

  @ForeignKey(() => TyreWidth)
  @Column({ type: DataType.INTEGER })
  id_width: number;

  @ForeignKey(() => TyreHeight)
  @Column({ type: DataType.INTEGER })
  id_height: number;

  @ForeignKey(() => TyreDiameter)
  @Column({ type: DataType.INTEGER })
  id_diameter: number;

  @ForeignKey(() => TyreLoadIndex)
  @Column({ type: DataType.INTEGER })
  id_load_index: number;

  @ForeignKey(() => TyreSpeedIndex)
  @Column({ type: DataType.INTEGER })
  id_speed_index: number;

  @ForeignKey(() => TyreCountry)
  @Column({ type: DataType.INTEGER })
  id_country: number;

  @ForeignKey(() => TyreYear)
  @Column({ type: DataType.INTEGER })
  id_year: number;

  @ForeignKey(() => TyreVehicleType)
  @Column({ type: DataType.INTEGER })
  id_vehicle_type: number;

  @ForeignKey(() => TyreReinforce)
  @Column({ type: DataType.INTEGER })
  id_reinforce: number;

  @ForeignKey(() => TyreRunFlat)
  @Column({ type: DataType.INTEGER })
  id_run_flat: number;

  @ForeignKey(() => TyreStudded)
  @Column({ type: DataType.INTEGER })
  id_studded: number;

  @ForeignKey(() => TyreHomologation)
  @Column({ type: DataType.INTEGER })
  id_homologation: number;

  @ForeignKey(() => TyreDemo)
  @Column({ type: DataType.INTEGER })
  id_demo: number;

  @ForeignKey(() => TyreSizeDigits)
  @Column({ type: DataType.INTEGER })
  id_size_digits: number;

  @ForeignKey(() => TyreSeal)
  @Column({ type: DataType.INTEGER })
  id_seal: number;

  @ForeignKey(() => TyreSilent)
  @Column({ type: DataType.INTEGER })
  id_silent: number;

  @ForeignKey(() => Description)
  @Column({ type: DataType.INTEGER })
  id_description: number;

  @ForeignKey(() => TyreEuromark)
  @Column({ type: DataType.INTEGER })
  id_euromark: number;

  @HasMany(() => StockTyres, 'id_tyre')
  stock: StockTyres[];

  @HasMany(() => PriceTyres, 'id_tyre')
  price: PriceTyres[];

  @HasMany(() => ReviewTyres, 'id')
  reviews: ReviewTyres[];

  @HasMany(() => RatingTyres, 'id')
  rating: RatingTyres[];

  @HasMany(() => Question, 'id')
  question: Question[];

  @BelongsTo(() => Category, 'id_cat')
  category: Category;

  @BelongsTo(() => TyreParams, 'id_params')
  params: TyreParams;

  @BelongsTo(() => TyreBrand, 'id_brand')
  tyre_brand: TyreBrand;

  @BelongsTo(() => TyreModel, 'id_model')
  tyre_model: TyreModel;

  @BelongsTo(() => TyreSeason, 'id_season')
  season: TyreSeason;

  @BelongsTo(() => TyreWidth, 'id_width')
  width: TyreWidth;

  @BelongsTo(() => TyreHeight, 'id_height')
  height: TyreHeight;

  @BelongsTo(() => TyreDiameter, 'id_diameter')
  diameter: TyreDiameter;

  @BelongsTo(() => TyreLoadIndex, 'id_load_index')
  load_index: TyreLoadIndex;

  @BelongsTo(() => TyreSpeedIndex, 'id_speed_index')
  speed_index: TyreSpeedIndex;

  @BelongsTo(() => TyreCountry, 'id_country')
  country: TyreCountry;

  @BelongsTo(() => TyreYear, 'id_year')
  year: TyreYear;

  @BelongsTo(() => TyreVehicleType, 'id_vehicle_type')
  vehicle_type: TyreVehicleType;

  @BelongsTo(() => TyreReinforce, 'id_reinforce')
  reinforce: TyreReinforce;

  @BelongsTo(() => TyreRunFlat, 'id_run_flat')
  run_flat: TyreRunFlat;

  @BelongsTo(() => TyreStudded, 'id_studded')
  studded: TyreStudded;

  @BelongsTo(() => TyreHomologation, 'id_homologation')
  homologation: TyreHomologation;

  @BelongsTo(() => TyreDemo, 'id_demo')
  demo: TyreDemo;

  @BelongsTo(() => TyreSizeDigits, 'id_size_digits')
  size_digits: TyreSizeDigits;

  @BelongsTo(() => TyreSeal, 'id_seal')
  seal: TyreSeal;

  @BelongsTo(() => TyreSilent, 'id_silent')
  silent: TyreSilent;

  @BelongsTo(() => Description, 'id_description')
  description: Description;

  @BelongsTo(() => TyreEuromark, 'id_euromark')
  euromark: TyreEuromark;
}
