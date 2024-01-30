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
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { PropsWheelModelService } from '../props-wheel-services/props-wheel-model.service';
import { CreatePropertyDto } from '../dto/create-property.dto';

@Controller('properties')
export class PropertiesWheelModelController {
  constructor(
    private readonly propsWheelModelService: PropsWheelModelService,
  ) {}

  @Post('/wheel/model')
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propsWheelModelService.createWheelModel(createPropertyDto);
  }

  @Get('/wheel/allmodels')
  findAll() {
    return this.propsWheelModelService.findAllWheelModel();
  }

  @Get('/wheel/model/id')
  findOne(@Param() getPropertyDto: GetPropertyDto) {
    return this.propsWheelModelService.findWheelModelById(getPropertyDto);
  }

  @Get('/wheel/model-by-brand')
  findAllModelsByBrand(@Query('brand') brand: string) {
    return this.propsWheelModelService.findAllWheelsModelByBrand(+brand);
  }

  @Get('/wheel/by-model')
  findAllModelsBy(@Query('brand_and_model') brand_and_model: string) {
    return this.propsWheelModelService.findAllWheelsModelByModelName(
      brand_and_model,
    );
  };
  
  @Patch('/wheel/model/update')
  update(@Body() updatePropertyDto: UpdatePropertyDto) {
    return this.propsWheelModelService.updateWheelModel(updatePropertyDto);
  }

  @Delete('/wheel/remove')
  remove(@Param() @Body() getPropertyDto: GetPropertyDto) {
    return this.propsWheelModelService.removeWheelModel(getPropertyDto);
  }
}
