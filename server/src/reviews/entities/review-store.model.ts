import { BelongsTo, Column, DataType, Model, Table } from 'sequelize-typescript';
import { ReviewsStoreConfigAttr } from '../interfaces/review-store.interface';
import { Customer } from 'src/customers/entities/customer.model';

@Table({ tableName: 'review_store', createdAt: true, updatedAt: false })
export class ReviewStore extends Model<ReviewStore, ReviewsStoreConfigAttr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id_review_store: number;

  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  description: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  positive: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  negative: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  email: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  customer_pictures: string;

  @Column({
    type: DataType.INTEGER,
    unique: false,
    defaultValue: 0,
    allowNull: true,
  })
  rating: number;

  @BelongsTo(() => Customer, 'id_customer')
  customer: Customer;
}
