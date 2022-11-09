import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { GetExpenseDto } from './dto/get-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './entities/expense.model';

@Injectable()
export class ExpensesService {

  constructor(@InjectModel(Expense) private expenseRepository: typeof Expense,
  ) {}

  async createExpense(createExpenseDto: CreateExpenseDto) {

    try {
      
      const expense = await this.expenseRepository.create(createExpenseDto);

      return expense;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  async findAllExpense() {

    try {
      
      const expenseAll = await this.expenseRepository.findAll({include: {all: true}});

      return expenseAll;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  async findExpenseById(getExpenseDto: GetExpenseDto) {

    try {
      
      const expenseById = await this.expenseRepository.findByPk(getExpenseDto.id_expense, {include: {all: true}});

      return expenseById;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return `This action updates a #${id} expense`;
  }

  async removeExpense(getExpenseDto: GetExpenseDto) {

    try {
      
      const expenseRemove = await this.expenseRepository.destroy({where: {id_expense: getExpenseDto.id_expense}});

      return expenseRemove;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }
}
