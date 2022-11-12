import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IncomesService } from './incomes.service';
import { CreateIncomeDto } from './dto/create-income.dto';
import { GetIncomeDto } from './dto/get-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';

@Controller('incomes')
export class IncomesController {
  constructor(private readonly incomesService: IncomesService) {}

  @Post()
  create(@Body() createIncomeDto: CreateIncomeDto) {
    return this.incomesService.createIncome(createIncomeDto);
  }

  @Get()
  findAll() {
    return this.incomesService.findAllIncome();
  }

  @Get('/id')
  findOne(@Param() @Body() getIncomeDto: GetIncomeDto) {
    return this.incomesService.findIncomeById(getIncomeDto);
  }

  @Patch(':id')
  update(@Param() id: string, @Body() updateIncomeDto: UpdateIncomeDto) {
    return this.incomesService.update(+id, updateIncomeDto);
  }

  @Delete('/remove')
  remove(@Param() @Body() getIncomeDto: GetIncomeDto) {
    return this.incomesService.removeIncome(getIncomeDto);
  }
}
