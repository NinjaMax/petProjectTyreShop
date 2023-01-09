import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PropsModelService } from '../props-tyres-services/props-tyre-model.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';

@Controller('properties')
export class PropertiesModelController {
  constructor(private readonly propertiesModelService: PropsModelService) {}

  @Post('/model')
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertiesModelService.createTyreModel(createPropertyDto);
  }

  @Get('/allmodels')
  findAll() {
    return this.propertiesModelService.findAllTyreModel();
  }

  @Get('/model/id')
  findOne(@Param() getPropertyDto: GetPropertyDto) {
    return this.propertiesModelService.findModelById(getPropertyDto);
  }

  @Patch('/model/update')
  update( @Body() updatePropertyDto: UpdatePropertyDto) {
    return this.propertiesModelService.updateTyreModel(updatePropertyDto);
  }

  @Delete('/remove')
  remove(@Param() @Body() getPropertyDto: GetPropertyDto) {
    return this.propertiesModelService.removeTyreModel(getPropertyDto);
  }
}