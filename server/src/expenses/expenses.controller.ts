import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { GetExpenseDto } from './dto/get-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expensesService.createExpense(createExpenseDto);
  }

  @Get()
  findAll() {
    return this.expensesService.findAllExpense();
  }

  @Get('/id')
  findOne(@Param() getExpenseDto: GetExpenseDto) {
    return this.expensesService.findExpenseById(getExpenseDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expensesService.update(+id, updateExpenseDto);
  }

  @Delete('/remove')
  remove(@Param() getExpenseDto: GetExpenseDto) {
    return this.expensesService.removeExpense(getExpenseDto);
  }
}
