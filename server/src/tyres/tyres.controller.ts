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

  @Get()
  findAllTyres() {
    return this.tyresService.findAllTyres();
  }

  @Get('/id')
  findOne(@Body() getTyreDto: GetTyreDto) {
    return this.tyresService.findTyresById(getTyreDto);
  }

  @Patch('/update')
  update(@Body() updateTyreDto: UpdateTyreDto) {
    return this.tyresService.updateTyres(updateTyreDto);
  }

  @Delete('/delete')
  remove(@Body() getTyreDto: GetTyreDto) {
    return this.tyresService.remove(getTyreDto);
  }
}
