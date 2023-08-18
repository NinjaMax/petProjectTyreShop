import { PartialType } from '@nestjs/mapped-types';
import { CreateArticleDto } from './create-article.dto';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {
  readonly id_articles: number;
  readonly description: string;
  readonly title: string;
  readonly link: string;
  readonly articles_pictures: string;
}
