import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateIncomeDto } from './dto/create-income.dto';
import { GetIncomeDto } from './dto/get-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { Incomes } from './entities/income.model';

@Injectable()
export class IncomesService {

  constructor(@InjectModel(Incomes) private incomeRepository: typeof Incomes,
  ) {}

  async createIncome(createIncomeDto: CreateIncomeDto) {

    try {
      
      const income = await this.incomeRepository.create(createIncomeDto);

      return income;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  async findAllIncome() {

    try {
      
      const incomeAll = await this.incomeRepository.findAll({include: {all: true}});

      return incomeAll;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  async findIncomeById(getIncomeDto: GetIncomeDto) {

    try {
      
      const incomeById = await this.incomeRepository.findByPk(getIncomeDto.id_income, {include: {all: true}});

      return incomeById;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  update(id: number, updateIncomeDto: UpdateIncomeDto) {
    return `This action updates a #${id} income`;
  }

  async removeIncome(getIncomeDto: GetIncomeDto) {
    try {
      
      const incomeRemove = await this.incomeRepository.destroy({where: {id_income: getIncomeDto.id_income}});

      return incomeRemove;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }
}
