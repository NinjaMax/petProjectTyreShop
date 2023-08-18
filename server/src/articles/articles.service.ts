import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article) private articlesRepository: typeof Article,
  ) {}
  async createArticle(createArticleDto: CreateArticleDto) {
    try {
      const newArticle = await this.articlesRepository.create(createArticleDto);
      return newArticle;
    } catch (error) {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllArticles() {
    try {
      const findAllArticles = await this.articlesRepository.findAll();
      return findAllArticles;
    } catch (error) {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findArticlesById(id: number) {
    try {
      const articlesById = await this.articlesRepository.findByPk(id);
      return articlesById;
    } catch (error) {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async updateArticles(id: number, updateArticleDto: UpdateArticleDto) {
    try {
      const updateArticles = await this.articlesRepository.update(
        {
          id_articles: updateArticleDto.id_articles,
          description: updateArticleDto.description,
          title: updateArticleDto.title,
          link: updateArticleDto.link,
          articles_pictures: updateArticleDto.articles_pictures,
        },
        { where: { id: id } },
      );
      return updateArticles;
    } catch (error) {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async removeArticle(id_articles: number) {
    try {
      const removeArticles = await this.articlesRepository.destroy({
        where: { id_articles: id_articles },
      });
      return removeArticles;
    } catch (error) {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
