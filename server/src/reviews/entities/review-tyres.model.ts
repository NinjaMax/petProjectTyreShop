import {
  Column,
  DataType,
  Model,
  Table,
  BelongsTo,
  ForeignKey,
  HasOne,
} from 'sequelize-typescript';
import { ReviewsTyresConfigAttr } from '../interfaces/review-tyres.interface';
import { Customer } from '../../customers/entities/customer.model';
import { TyreBrand } from '../../properties/entities/tyres/tyre-brand.model';
import { TyreModel } from '../../properties/entities/tyres/tyre-model.model';
import { RatingTyres } from '../../ratings/entities/rating-tyres.model';
import { Tyres } from '../../tyres/entities/tyres.model';
import { Users } from '../../users/entities/users.model';

@Table({ tableName: 'review_tyres', createdAt: true, updatedAt: false })
export class ReviewTyres extends Model<ReviewTyres, ReviewsTyresConfigAttr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id_review: number;

  @ForeignKey(() => Tyres)
  @Column({ type: DataType.INTEGER, allowNull: false })
  id: number;

  @ForeignKey(() => TyreModel)
  @Column({ type: DataType.INTEGER, allowNull: false })
  id_model: number;

  @ForeignKey(() => TyreBrand)
  @Column({ type: DataType.INTEGER, allowNull: false })
  id_brand: number;

  @ForeignKey(() => Customer)
  @Column({ type: DataType.INTEGER, unique: false, allowNull: true })
  id_customer: number;

  // @ForeignKey(() => Users)
  // @Column({ type: DataType.INTEGER, unique: false, allowNull: true })
  // id_user: number;

  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  description: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  positive: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  negative: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  driver_experience: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  car: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  email: string;

  @Column({
    type: DataType.INTEGER,
    unique: false,
    defaultValue: 0,
    allowNull: true,
  })
  like_count: number;

  @Column({
    type: DataType.INTEGER,
    unique: false,
    defaultValue: 0,
    allowNull: true,
  })
  dislike_count: number;
  // @BelongsTo(() => Users, 'id_user')
  // user: Users;

  @BelongsTo(() => Customer, 'id_customer')
  customer: Customer;

  @BelongsTo(() => Tyres, 'id')
  tyres: Tyres;

  @HasOne(() => RatingTyres, 'id_review')
  rating: RatingTyres;

  @BelongsTo(() => TyreModel, 'id_model')
  model: TyreModel;

  @BelongsTo(() => TyreBrand, 'id_brand')
  brand: TyreBrand;
}
