import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PropsTyreSpeedIndexService } from '../props-tyres-services/props-tyre-speedIndex.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';

@Controller('properties')
export class PropertiesSpeedIndexController {
  constructor(
    private readonly propertiesSpeedIndexService: PropsTyreSpeedIndexService,
  ) {}

  @Post('/speedindex')
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertiesSpeedIndexService.createTyreSpeedIndex(
      createPropertyDto,
    );
  }

  @Get('/allspeedindex')
  findAll() {
    return this.propertiesSpeedIndexService.findAllTyreSpeedIndex();
  }

  @Get('/speedindex/id')
  findOne(@Param() getPropertyDto: GetPropertyDto) {
    return this.propertiesSpeedIndexService.findTyreSpeedIndexById(
      getPropertyDto,
    );
  }

  @Patch('/speedindex/update')
  update(@Body() updatePropertyDto: UpdatePropertyDto) {
    return this.propertiesSpeedIndexService.updateTyreSpeedIndex(
      updatePropertyDto,
    );
  }

  @Delete('/speedindex/remove')
  remove(@Param() @Body() getPropertyDto: GetPropertyDto) {
    return this.propertiesSpeedIndexService.removeTyreSpeedIndex(
      getPropertyDto,
    );
  }
}
