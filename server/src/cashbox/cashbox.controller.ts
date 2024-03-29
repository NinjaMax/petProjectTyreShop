import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CashboxService } from './cashbox.service';
import { CreateCashboxDto } from './dto/create-cashbox.dto';
import { GetCashboxDto } from './dto/get-cashbox.dto';
import { UpdateCashboxDto } from './dto/update-cashbox.dto';

@Controller('cashbox')
export class CashboxController {
  constructor(private readonly cashboxService: CashboxService) {}

  @Post()
  create(@Body() createCashboxDto: CreateCashboxDto) {
    return this.cashboxService.createCashbox(createCashboxDto);
  }

  @Get('/all')
  findAll() {
    return this.cashboxService.findAllCashbox();
  }

  @Get('/id')
  findOne(@Param() @Body() getCashboxDto: GetCashboxDto) {
    return this.cashboxService.findCashboxById(getCashboxDto);
  }

  @Patch('/update')
  update(@Body() updateCashboxDto: UpdateCashboxDto) {
    return this.cashboxService.updateCashbox(updateCashboxDto);
  }

  @Delete('/remove')
  remove(@Param() @Body() getCashboxDto: GetCashboxDto) {
    return this.cashboxService.removeCashbox(getCashboxDto);
  }
}
