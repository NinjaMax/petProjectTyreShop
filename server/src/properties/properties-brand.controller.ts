import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PropertiesBrandService } from './properties-brand.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { GetPropertyDto } from './dto/get-property.dto';

@Controller('properties')
export class PropertiesBrandController {
  constructor(private readonly propertiesBrandService: PropertiesBrandService) {}

  @Post('/brand')
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertiesBrandService.createTyreBrand(createPropertyDto);
  }

  @Get('/allbrands')
  findAll() {
    return this.propertiesBrandService.findAllTyreBrand();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertiesBrandService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePropertyDto: UpdatePropertyDto) {
    return this.propertiesBrandService.update(+id, updatePropertyDto);
  }

  @Delete(':id')
  remove(@Param('id') getPropertyDto: GetPropertyDto) {
    return this.propertiesBrandService.removeTyreBrand(getPropertyDto);
  }
}
