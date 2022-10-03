import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TyresService } from './tyres.service';
import { CreateTyreDto } from './dto/create-tyre.dto';
import { UpdateTyreDto } from './dto/update-tyre.dto';

@Controller('tyres')
export class TyresController {
  constructor(private readonly tyresService: TyresService) {}

  @Post()
  create(@Body() createTyreDto: CreateTyreDto) {
    return this.tyresService.create(createTyreDto);
  }

  @Get()
  findAll() {
    return this.tyresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tyresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTyreDto: UpdateTyreDto) {
    return this.tyresService.update(+id, updateTyreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tyresService.remove(+id);
  }
}
