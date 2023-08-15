import { Column, DataType, Model, Table, HasMany, BelongsTo, ForeignKey} from "sequelize-typescript";
import { TyreBrandConfigAttr } from '../../interfaces/tyres/tyre-brand.interface';
import { RatingTyres } from '../../../ratings/entities/rating-tyres.model';
import { Tyres } from '../../../tyres/entities/tyres.model';
import { ReviewTyres } from '../../../reviews/entities/review-tyres.model';
import { Description } from '../../../description/entities/description.entity';
import { Question } from '../../../questions/entities/question.entity';

@Table({ tableName: 'tyre_brand', updatedAt: false, createdAt: false })
export class TyreBrand extends Model<TyreBrand, TyreBrandConfigAttr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    allowNull: false,
    primaryKey: true,
    autoIncrement: false,
  })
  id_brand: number;
   
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  brand: string;

  @ForeignKey(() => Description)
  @Column({ type: DataType.INTEGER })
  id_description: number;

  @BelongsTo(() => Description, 'id_description')
  description: Description;

  @HasMany(() => Tyres, 'id_brand')
  tyres: Tyres[];

  @HasMany(() => RatingTyres, 'id_brand')
  ratings: RatingTyres[];

  @HasMany(() => ReviewTyres, 'id_brand')
  reviews: ReviewTyres[];

  @HasMany(() => Question, 'id_brand')
  question: Question[];
}
