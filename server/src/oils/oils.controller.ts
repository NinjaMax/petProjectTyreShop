import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OilsService } from './oils.service';
import { CreateOilDto } from './dto/create-oil.dto';
import { GetOilDto } from './dto/get-oil.dto';
import { UpdateOilDto } from './dto/update-oil.dto';

@Controller('oils')
export class OilsController {
  constructor(private readonly oilsService: OilsService) {}

  @Post()
  create(@Body() createOilDto: CreateOilDto) {
    return this.oilsService.createOil(createOilDto);
  }

  @Get()
  findAll() {
    return this.oilsService.findAllOils();
  }

  @Get('/id')
  findOne(@Param() @Body() getOilDto: GetOilDto) {
    return this.oilsService.findOilById(getOilDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOilDto: UpdateOilDto) {
    return this.oilsService.update(+id, updateOilDto);
  }

  @Delete('/remove')
  remove(@Param() @Body() getOilDto: GetOilDto) {
    return this.oilsService.removeOil(getOilDto);
  }
}
