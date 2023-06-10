import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PropsTyreHeightService } from '../props-tyres-services/props-tyre-height.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';

@Controller('properties')
export class PropertiesHeightController {
  constructor(
    private readonly propertiesHeightService: PropsTyreHeightService,
  ) {}

  @Post('/height')
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertiesHeightService.createTyreHeight(createPropertyDto);
  }

  @Get('/allheight')
  findAll() {
    return this.propertiesHeightService.findAllTyreHeight();
  }

  @Get('/height/id')
  findOne(@Param() getPropertyDto: GetPropertyDto) {
    return this.propertiesHeightService.findTyreHeightById(getPropertyDto);
  }

  @Patch('/height/update')
  update(@Body() updatePropertyDto: UpdatePropertyDto) {
    return this.propertiesHeightService.updateTyreHeight(updatePropertyDto);
  }

  @Delete('/height/remove')
  remove(@Param() @Body() getPropertyDto: GetPropertyDto) {
    return this.propertiesHeightService.removeTyreHeight(getPropertyDto);
  }
}
