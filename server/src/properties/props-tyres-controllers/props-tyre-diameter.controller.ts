import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PropsTyrDiametrService } from '../props-tyres-services/props-tyre-diameter.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';

@Controller('properties')
export class PropertiesDiameterController {
  constructor(
    private readonly propertiesDiameterService: PropsTyrDiametrService,
  ) {}

  @Post('/diameter')
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertiesDiameterService.createTyreDiameter(createPropertyDto);
  }

  @Get('/alldiameter')
  findAll() {
    return this.propertiesDiameterService.findAllTyreDiameter();
  }

  @Get('/diameter/id')
  findOne(@Param() getPropertyDto: GetPropertyDto) {
    return this.propertiesDiameterService.findTyreDiameterById(getPropertyDto);
  }

  @Patch('/diameter/update')
  update(@Body() updatePropertyDto: UpdatePropertyDto) {
    return this.propertiesDiameterService.updateTyreDiameter(updatePropertyDto);
  }

  @Delete('/diameter/remove')
  remove(@Param() @Body() getPropertyDto: GetPropertyDto) {
    return this.propertiesDiameterService.removeTyreDiameter(getPropertyDto);
  }
}
