import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { Article } from './entities/article.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [ArticlesController],
  providers: [ArticlesService],
  imports: [SequelizeModule.forFeature([Article])],
  exports: [ArticlesService],
})
export class ArticlesModule {}
