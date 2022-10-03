import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OilsService } from './oils.service';
import { CreateOilDto } from './dto/create-oil.dto';
import { UpdateOilDto } from './dto/update-oil.dto';

@Controller('oils')
export class OilsController {
  constructor(private readonly oilsService: OilsService) {}

  @Post()
  create(@Body() createOilDto: CreateOilDto) {
    return this.oilsService.create(createOilDto);
  }

  @Get()
  findAll() {
    return this.oilsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.oilsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOilDto: UpdateOilDto) {
    return this.oilsService.update(+id, updateOilDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.oilsService.remove(+id);
  }
}
