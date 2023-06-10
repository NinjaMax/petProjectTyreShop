import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PropsTyreWidthService } from '../props-tyres-services/props-tyre-width.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';

@Controller('properties')
export class PropertiesWidthController {
  constructor(private readonly propertiesWidthService: PropsTyreWidthService) {}

  @Post('/width')
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertiesWidthService.createTyreWidth(createPropertyDto);
  }

  @Get('/allwidth')
  findAll() {
    return this.propertiesWidthService.findAllTyreWidth();
  }

  @Get('/width/id')
  findOne(@Param() getPropertyDto: GetPropertyDto) {
    return this.propertiesWidthService.findTyreWidthById(getPropertyDto);
  }

  @Patch('/width/update')
  update(@Body() updatePropertyDto: UpdatePropertyDto) {
    return this.propertiesWidthService.updateTyreWidth(updatePropertyDto);
  }

  @Delete('/width/remove')
  remove(@Param() @Body() getPropertyDto: GetPropertyDto) {
    return this.propertiesWidthService.removeTyreWidth(getPropertyDto);
  }
}
