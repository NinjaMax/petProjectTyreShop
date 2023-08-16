import {
  Column,
  DataType,
  Model,
  Table,
  BelongsTo,
  ForeignKey,
  HasOne,
} from 'sequelize-typescript';

import { Customer } from '../../customers/entities/customer.model';
import { Users } from '../../users/entities/users.model';
import { Question } from '../../questions/entities/question.entity';
import { AnswerConfigAttr } from '../interfaces/answer.interface';

@Table({ tableName: 'answer', createdAt: true, updatedAt: false })
export class Answer extends Model<Answer, AnswerConfigAttr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id_answer: number;

  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  description: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  profile_pictures: string;

  @BelongsTo(() => Customer, 'id_customer')
  customer: Customer;

  @BelongsTo(() => Users, 'id_user')
  user: Users;

  @BelongsTo(() => Question, 'id_question')
  question: Question;
}
