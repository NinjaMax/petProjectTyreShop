import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ArticlesConfigAttr } from '../interfaces/articles.interface';

@Table({ tableName: 'article', createdAt: true, updatedAt: false })
export class Article extends Model<Article, ArticlesConfigAttr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id_articles: number;

  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  description: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  link: string;

  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  articles_pictures: string;
}
