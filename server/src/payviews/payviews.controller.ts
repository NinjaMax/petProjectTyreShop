import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PayviewsService } from './payviews.service';
import { CreatePayviewDto } from './dto/create-payview.dto';
import { UpdatePayviewDto } from './dto/update-payview.dto';

@Controller('payviews')
export class PayviewsController {
  constructor(private readonly payviewsService: PayviewsService) {}

  @Post()
  create(@Body() createPayviewDto: CreatePayviewDto) {
    return this.payviewsService.create(createPayviewDto);
  }

  @Get('/all')
  findAll() {
    return this.payviewsService.findAllPayViews();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.payviewsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePayviewDto: UpdatePayviewDto) {
    return this.payviewsService.update(+id, updatePayviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.payviewsService.remove(+id);
  }
}
