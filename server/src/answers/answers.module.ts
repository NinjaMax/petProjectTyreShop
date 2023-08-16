import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Answer } from './entities/answer.entity';
import { QuestionsModule } from '../questions/questions.module';
import { Question } from '../questions/entities/question.entity';
//import { Question } from 'src/questions/entities/question.entity';

@Module({
  controllers: [AnswersController],
  providers: [AnswersService],
  imports: [SequelizeModule.forFeature([Answer, Question]), QuestionsModule],
  exports: [AnswersService]
})
export class AnswersModule {}
