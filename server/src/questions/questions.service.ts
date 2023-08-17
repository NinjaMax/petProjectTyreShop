import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';
import { InjectModel } from '@nestjs/sequelize';
import { UsersService } from '../users/users.service';
import { TyresService } from '../tyres/tyres.service';
import { PropsBrandService } from '../properties/props-tyres-services/props-tyre-brand.service';
import { PropsModelService } from '../properties/props-tyres-services/props-tyre-model.service';
import { CustomersService } from '../customers/customers.service';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question) private questionsRepository: typeof Question,
    private usersService: UsersService,
    private tyresService: TyresService,
    private tyreBrandService: PropsBrandService,
    private tyreModelService: PropsModelService,
    private customersService: CustomersService,
  ) {}

  async createQuestion(createQuestionDto: CreateQuestionDto) {
    try {
      const tyreById = await this.tyresService.findTyresById(createQuestionDto);
      const tyreModel = await this.tyreModelService.findModelById(
        createQuestionDto,
      );
      const tyreBrand = await this.tyreBrandService.findBrandById(
        createQuestionDto,
      );
      const customer = await this.customersService.findCustomerById(
        createQuestionDto,
      );

      if (tyreById && tyreModel && tyreBrand) {
        const questionCreate = await this.questionsRepository.create(
          createQuestionDto,
        );

        await tyreById.$add('reviews', [questionCreate.id_question]);
        await tyreModel.$add('reviews', [questionCreate.id_question]);
        await tyreBrand.$add('reviews', [questionCreate.id_question]);
        if (customer) {
          await questionCreate.$add('customer', customer.id_customer);
        }
        tyreById.question.push(questionCreate);
        tyreModel.question.push(questionCreate);
        tyreBrand.question.push(questionCreate);

        questionCreate.reload();
        return questionCreate;
      }
    } catch (error) {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findAllQuestion() {
    try {
      const allQuestions = await this.questionsRepository.findAll({
        include: { all: true },
      });
      return allQuestions;
    } catch (error) {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findOneQuestion(id_question: number) {
    try {
      const oneQuestion = await this.questionsRepository.findByPk(id_question);
      return oneQuestion;
    } catch (error) {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  async removeQuestion(id_question: number) {
    try {
      const removeQuestion = await this.questionsRepository.destroy({
        where: { id_question: id_question },
    });
      return removeQuestion;
    } catch (error) {
      throw new HttpException(
        'Data is incorrect and must be uniq',
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
