import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Answer } from './entities/answer.entity';
import { QuestionsService } from 'src/questions/questions.service';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AnswersService {
  constructor(
    @InjectModel(Answer) private answerRepository: typeof Answer,
    private questionService: QuestionsService,
  ) {}
  async createAnswer(createAnswerDto: CreateAnswerDto) {
    try {
      const questionId = await this.questionService.findOneQuestion(
        createAnswerDto.id_question,
      );
      if (questionId) {
        const answer = await this.answerRepository.create(createAnswerDto);
        questionId.$add('answer', answer);
        answer.reload();
        return answer;
      }
    } catch (error) {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  findAll() {
    try {
      return 'This action adds a new answer';
    } catch (error) {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  findOne(id: number) {
    try {
      return 'This action adds a new answer';
    } catch (error) {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  update(id: number, updateAnswerDto: UpdateAnswerDto) {
    try {
      return 'This action adds a new answer';
    } catch (error) {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  remove(id: number) {
    try {
      return 'This action adds a new answer';
    } catch (error) {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
