import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TyresService } from './tyres.service';
import { CreateTyreDto } from './dto/create-tyre.dto';
import { UpdateTyreDto } from './dto/update-tyre.dto';
import { GetTyreDto } from './dto/get-tyre.dto';
//import { CreateStockTyresDto } from '../stock/dto/create-stock_tyres.dto';

@Controller('tyres')
export class TyresController {

  constructor(private readonly tyresService: TyresService) {}

  @Post()
  createTyres(@Body() createTyreDto: CreateTyreDto) {
    return this.tyresService.createTyres(createTyreDto);
  }

  @Get()
  findAllTyres() {
    return this.tyresService.findAllTyres();
  }

  @Get('/id')
  findTyresById(@Body() getTyreDto: GetTyreDto) {
    return this.tyresService.findTyresById(getTyreDto);
  }

  @Get('/offset')
  findTyresByLimit(@Query('offset') offset: number) {
    return this.tyresService.findAllTyresWithOffset(offset);
  }

  @Get('/season/:season')
  findTyresSeason(@Param('season') season: string) {
    return this.tyresService.findAllTyresBySeason(season);
  }

  @Get('/type/:type')
  findTyresType(@Param('diameter') type: string) {
    return this.tyresService.findAllTyresByType(type);
  }

  @Get('/diameter/:diameter')
  findTyresDiameter(@Param('diameter') diameter: string) {
    return this.tyresService.findAllTyresByDiameter(diameter);
  }

  @Get('/params/:params')
  findTyresParams(@Param('params') params: string) {
    return this.tyresService.findAllTyresByParams(params);
  }

  @Get('/fullname/:fullname')
  findTyresFullName(@Param('fullname') fullname: string) {
    return this.tyresService.findAllTyresByFullName(fullname);
  }

  @Patch('/update')
  updateTyres(@Body() updateTyreDto: UpdateTyreDto) {
    return this.tyresService.updateTyres(updateTyreDto);
  }

  @Delete('/delete')
  remove(@Body() getTyreDto: GetTyreDto) {
    return this.tyresService.remove(getTyreDto);
  }
}
