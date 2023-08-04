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
import { PropsModelService } from '../props-tyres-services/props-tyre-model.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';

@Controller('properties')
export class PropertiesModelController {
  constructor(private readonly propertiesModelService: PropsModelService) {}

  @Post('/tyres/model')
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertiesModelService.createTyreModel(createPropertyDto);
  };

  @Get('/tyres/allmodels')
  findAll() {
    return this.propertiesModelService.findAllTyreModel();
  };

  @Get('/tyres/model/id')
  findOne(@Param() getPropertyDto: GetPropertyDto) {
    return this.propertiesModelService.findModelById(getPropertyDto);
  };

  @Get('/tyres/model-by-brand')
  findAllModelsByBrand(@Query('brand') brand: string) {
    return this.propertiesModelService.findAllTyresModelByBrand(+brand);
  };

  @Patch('/tyres/model/update')
  update(@Body() updatePropertyDto: UpdatePropertyDto) {
    return this.propertiesModelService.updateTyreModel(updatePropertyDto);
  };

  @Delete('/tyres/remove')
  remove(@Param() @Body() getPropertyDto: GetPropertyDto) {
    return this.propertiesModelService.removeTyreModel(getPropertyDto);
  };
}