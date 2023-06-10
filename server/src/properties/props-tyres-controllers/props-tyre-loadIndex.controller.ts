import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PropsTyreLoadIndexService } from '../props-tyres-services/props-tyre-loadIndex.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';

@Controller('properties')
export class PropertiesLoadIndexController {
  constructor(
    private readonly propertiesLoadIndexService: PropsTyreLoadIndexService,
  ) {}

  @Post('/loadindex')
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertiesLoadIndexService.createTyreLoadIndex(
      createPropertyDto,
    );
  }

  @Get('/allloadindex')
  findAll() {
    return this.propertiesLoadIndexService.findAllTyreLoadIndex();
  }

  @Get('/loadindex/id')
  findOne(@Param() getPropertyDto: GetPropertyDto) {
    return this.propertiesLoadIndexService.findTyreLoadIndexById(
      getPropertyDto,
    );
  }

  @Patch('/loadindex/update')
  update(@Body() updatePropertyDto: UpdatePropertyDto) {
    return this.propertiesLoadIndexService.updateTyreLoadIndex(
      updatePropertyDto,
    );
  }

  @Delete('/loadindex/remove')
  remove(@Param() @Body() getPropertyDto: GetPropertyDto) {
    return this.propertiesLoadIndexService.removeTyreLoadIndex(getPropertyDto);
  }
}
