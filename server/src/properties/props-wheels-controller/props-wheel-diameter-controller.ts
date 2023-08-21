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
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { PropsWheelDiameterService } from '../props-wheel-services/props-wheel-diameter.service';

@Controller('properties')
export class PropertiesWheelDiameterController {
  constructor(
    private readonly propsWheelDiameterService: PropsWheelDiameterService,
  ) {}

  @Post('wheels/diameter')
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propsWheelDiameterService.createWheelDiameter(
      createPropertyDto,
    );
  }

  @Get('/wheels/alldiameter')
  findAll() {
    return this.propsWheelDiameterService.findAllWheelDiameter();
  }

  @Get('wheels/diameter/id')
  findOne(@Param() getPropertyDto: GetPropertyDto) {
    return this.propsWheelDiameterService.findWheelDiameterById(getPropertyDto);
  }

  @Get('/wheels/diameter/by-model')
  findAllParamsByModel(@Query('model') model: string) {
    return this.propsWheelDiameterService.findAllWheelsDiametersByModel(+model);
  }

  @Patch('/wheels/diameter/update')
  update(@Body() updatePropertyDto: UpdatePropertyDto) {
    return this.propsWheelDiameterService.updateWheelDiameter(
      updatePropertyDto,
    );
  }

  @Delete('/wheels/diameter/remove')
  remove(@Param() @Body() getPropertyDto: GetPropertyDto) {
    return this.propsWheelDiameterService.removeWheelDiameter(getPropertyDto);
  }
}
