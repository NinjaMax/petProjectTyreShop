import {
  Column,
  DataType,
  Model,
  Table,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { RatingTyresConfigAttr } from '../interfaces/rating-tyres.interface';
import { TyreBrand } from '../../properties/entities/tyres/tyre-brand.model';
import { TyreModel } from '../../properties/entities/tyres/tyre-model.model';
import { ReviewTyres } from '../../reviews/entities/review-tyres.model';
import { Tyres } from '../../tyres/entities/tyres.model';

@Table({ tableName: 'rating_tyres', createdAt: false, updatedAt: false })
export class RatingTyres extends Model<RatingTyres, RatingTyresConfigAttr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id_rating: number;

  @ForeignKey(() => Tyres)
  @Column({ type: DataType.INTEGER })
  id: number;

  @ForeignKey(() => ReviewTyres)
  @Column({ type: DataType.INTEGER })
  id_review: number;

  @Column({ type: DataType.FLOAT, unique: false, allowNull: false })
  rating_overall: number;

  @Column({ type: DataType.FLOAT, unique: false, allowNull: true })
  rating_dry_road: number;

  @Column({ type: DataType.FLOAT, unique: false, allowNull: true })
  rating_wet_road: number;

  @Column({ type: DataType.FLOAT, unique: false, allowNull: true })
  rating_snow_road: number;

  @Column({ type: DataType.FLOAT, unique: false, allowNull: true })
  rating_ice_road: number;

  @Column({ type: DataType.FLOAT, unique: false, allowNull: true })
  rating_cross_country: number;

  @Column({ type: DataType.FLOAT, unique: false, allowNull: true })
  rating_treadwear: number;

  @Column({ type: DataType.FLOAT, unique: false, allowNull: true })
  rating_price_quality: number;

  @ForeignKey(() => TyreModel)
  @Column({ type: DataType.INTEGER })
  id_model: number;

  @ForeignKey(() => TyreBrand)
  @Column({ type: DataType.INTEGER })
  id_brand: number;

  @Column({ type: DataType.INTEGER })
  id_season: number;

  @BelongsTo(() => Tyres, 'id')
  tyres: Tyres;

  @BelongsTo(() => ReviewTyres, 'id_review')
  review: ReviewTyres;

  @BelongsTo(() => TyreModel, 'id_model')
  tyre_model: TyreModel;

  @BelongsTo(() => TyreBrand, 'id_brand')
  tyre_brand: TyreBrand;
}
