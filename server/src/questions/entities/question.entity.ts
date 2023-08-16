import {
  Column,
  DataType,
  Model,
  Table,
  BelongsTo,
  ForeignKey,
  HasOne,
  HasMany,
} from 'sequelize-typescript';

import { Customer } from '../../customers/entities/customer.model';
import { TyreBrand } from '../../properties/entities/tyres/tyre-brand.model';
import { TyreModel } from '../../properties/entities/tyres/tyre-model.model';
import { Tyres } from '../../tyres/entities/tyres.model';
import { Users } from '../../users/entities/users.model';
import { QuestionConfigAttr } from '../interfaces/questions.interface';
import { Answer } from '../../answers/entities/answer.entity';

@Table({ tableName: 'question', createdAt: true, updatedAt: false })
export class Question extends Model<Question, QuestionConfigAttr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id_question: number;

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

  @ForeignKey(() => Users)
  @Column({ type: DataType.INTEGER, unique: false, allowNull: true })
  id_user: number;

  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  description: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  customer_pictures: string;

  @BelongsTo(() => Customer, 'id_customer')
  customer: Customer;

  @BelongsTo(() => Users, 'id_user')
  user: Users;

  @BelongsTo(() => Tyres, 'id')
  tyres: Tyres;

  @BelongsTo(() => TyreModel, 'id_model')
  model: TyreModel;

  @BelongsTo(() => TyreBrand, 'id_brand')
  brand: TyreBrand;

  @HasMany(() => Answer, 'id_answer')
  answer: Answer[];
}
