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
import { PropsWheelModelService } from '../properties/props-wheel-services/props-wheel-model.service';
import { PropsWheelBrandService } from '../properties/props-wheel-services/props-wheel-brand.service';
import { WheelsService } from '../wheels/wheels.service';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question) private questionsRepository: typeof Question,
    private usersService: UsersService,
    private tyresService: TyresService,
    private tyreBrandService: PropsBrandService,
    private tyreModelService: PropsModelService,
    private wheelService: WheelsService,
    private wheelModelService: PropsWheelModelService,
    private wheelBrandService: PropsWheelBrandService,
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
      const wheelById = await this.wheelService.findWheelById(
        createQuestionDto,
      );
      const wheelBrand = await this.wheelBrandService.findWheelBrandById(
        createQuestionDto,
      );
      const wheelModel = await this.wheelModelService.findWheelModelById(
        createQuestionDto,
      );
      const customer = await this.customersService.findCustomerById(
        createQuestionDto,
      );

      if (tyreById && tyreModel && tyreBrand) {
        const questionTyreCreate = await this.questionsRepository.create(
          createQuestionDto,
        );

        await tyreById.$add('reviews', [questionTyreCreate.id_question]);
        await tyreModel.$add('reviews', [questionTyreCreate.id_question]);
        await tyreBrand.$add('reviews', [questionTyreCreate.id_question]);
        if (customer) {
          await questionTyreCreate.$add('customer', customer.id_customer);
        }
        tyreById.question.push(questionTyreCreate);
        tyreModel.question.push(questionTyreCreate);
        tyreBrand.question.push(questionTyreCreate);

        questionTyreCreate.reload();
        return questionTyreCreate;
      }
      if (wheelById && wheelBrand && wheelModel) {
        const questionWheelCreate = await this.questionsRepository.create(
          createQuestionDto,
        );

        await wheelById.$add('reviews', [questionWheelCreate.id_question]);
        await wheelModel.$add('reviews', [questionWheelCreate.id_question]);
        await wheelBrand.$add('reviews', [questionWheelCreate.id_question]);
        if (customer) {
          await questionWheelCreate.$add('customer', customer.id_customer);
        }
        wheelById.question.push(questionWheelCreate);
        wheelModel.question.push(questionWheelCreate);
        wheelBrand.question.push(questionWheelCreate);

        questionWheelCreate.reload();
        return questionWheelCreate;
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

  async findAllQuestionByIdModel(id_model: number) {
    try {
      const allQuestionsByIdModel = await this.questionsRepository.findAll({
        where: { id_model: id_model },
        include: { all: true },
      });
      return allQuestionsByIdModel;
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
