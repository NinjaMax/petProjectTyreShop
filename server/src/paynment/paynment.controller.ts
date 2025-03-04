import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { PaynmentService } from './paynment.service';
import { CreatePaynmentDto } from './dto/create-paynment.dto';
import { GetPaynmentDto } from './dto/get-paynment.dto';
import { UpdatePaynmentDto } from './dto/update-paynment.dto';

@Controller('paynment')
export class PaynmentController {
  constructor(private readonly paynmentService: PaynmentService) {}

  @Post()
  create(@Body() createPaynmentDto: CreatePaynmentDto) {
    return this.paynmentService.createPaynment(createPaynmentDto);
  }

  @Get()
  findAll() {
    return this.paynmentService.findAllPaynment();
  }

  @Get('/all-by-date')
  findAllByDate(
    @Query('date_start') date_start: string,
    @Query('date_end') date_end: string,
  ) {
    return this.paynmentService.findAllPaynmentByDate(date_start, date_end);
  };

  @Get('/all-incomes')
  findAllIncomes() {
    return this.paynmentService.findAllIncomesPaynments();
  }

  @Get('/all-expenses')
  findAllExpenses() {
    return this.paynmentService.findAllExpensesPaynments();
  }

  @Get('/id')
  findOne(@Body() getPaynmentDto: GetPaynmentDto) {
    return this.paynmentService.findPaynmentById(getPaynmentDto);
  }

  @Patch('/update')
  update(@Body() updatePaynmentDto: UpdatePaynmentDto) {
    return this.paynmentService.updatePayment(updatePaynmentDto);
  }

  @Delete('/id')
  remove(@Body() getPaynmentDto: GetPaynmentDto) {
    return this.paynmentService.removePaynment(getPaynmentDto);
  }
}
