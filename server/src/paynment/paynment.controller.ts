import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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

  @Get('/id')
  findOne(@Param() @Body()getPaynmentDto: GetPaynmentDto) {
    return this.paynmentService.findPaynmentById(getPaynmentDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaynmentDto: UpdatePaynmentDto) {
    return this.paynmentService.update(+id, updatePaynmentDto);
  }

  @Delete('/id')
  remove(@Param() @Body() getPaynmentDto: GetPaynmentDto) {
    return this.paynmentService.removePaynment(getPaynmentDto);
  }
}
