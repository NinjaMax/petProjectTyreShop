import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PropsTyreStuddedService } from '../props-tyres-services/props-tyre-studded.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';

@Controller('properties')
export class PropertiesStuddedController {
  constructor(
    private readonly propertiesStuddedService: PropsTyreStuddedService,
  ) {}

  @Post('/studded')
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertiesStuddedService.createTyreStudded(createPropertyDto);
  }

  @Get('/allstudded')
  findAll() {
    return this.propertiesStuddedService.findAllTyreStudded();
  }

  @Get('/studded/id')
  findOne(@Param() getPropertyDto: GetPropertyDto) {
    return this.propertiesStuddedService.findTyreStuddedById(getPropertyDto);
  }

  @Patch('/studded/update')
  update(@Body() updatePropertyDto: UpdatePropertyDto) {
    return this.propertiesStuddedService.updateTyreStudded(updatePropertyDto);
  }

  @Delete('/studded/remove')
  remove(@Param() @Body() getPropertyDto: GetPropertyDto) {
    return this.propertiesStuddedService.removeTyreStudded(getPropertyDto);
  }
}
