import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TyresService } from './tyres.service';
import { CreateTyreDto } from './dto/create-tyre.dto';
import { UpdateTyreDto } from './dto/update-tyre.dto';
import { GetTyreDto } from './dto/get-tyre.dto';
//import { CreateStockTyresDto } from '../stock/dto/create-stock_tyres.dto';

@Controller('tyres')
export class TyresController {

  constructor(private readonly tyresService: TyresService) {}

  @Post()
  create(@Body() createTyreDto: CreateTyreDto) {
    return this.tyresService.createTyres(createTyreDto);
  }

  @Post('/stock')
  createStock(@Body() getTyreDto: GetTyreDto ) {
    return this.tyresService.createTyresStock(getTyreDto);
  }

  @Get()
  findAllTyres() {
    return this.tyresService.findAllTyres();
  }

  @Get(':id')
  findOne(@Param('id') getTyreDto: GetTyreDto) {
    return this.tyresService.findTyresById(getTyreDto.id_tyres);
  }

  @Patch(':id')
  update(@Param('id') @Body() updateTyreDto: UpdateTyreDto) {
    return this.tyresService.updateTyres(updateTyreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tyresService.remove(+id);
  }
}
