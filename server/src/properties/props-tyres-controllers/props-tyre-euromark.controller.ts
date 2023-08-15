import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
  } from '@nestjs/common';
  import { CreatePropertyDto } from '../dto/create-property.dto';
  import { GetPropertyDto } from '../dto/get-property.dto';
  import { UpdatePropertyDto } from '../dto/update-property.dto';
  import { PropsTyreEuromarkService } from '../props-tyres-services/props-tyre-euromark.service';
  
  @Controller('properties')
  export class PropertiesEuromarkController {
    constructor(
      private readonly propertiesEuromarkService: PropsTyreEuromarkService,
    ) {}
  
    @Post('euromark/loadindex')
    create(@Body() createPropertyDto: CreatePropertyDto) {
      return this.propertiesEuromarkService.createTyreEuromark(
        createPropertyDto,
      );
    }
  
    @Get('euromark/allloadindex')
    findAll() {
      return this.propertiesEuromarkService.findAllTyreEuromark();
    }
  
    @Get('euromark/loadindex/id')
    findOne(@Param() getPropertyDto: GetPropertyDto) {
      return this.propertiesEuromarkService.findTyreEuromarkById(
        getPropertyDto,
      );
    }
  
    @Patch('euromark/loadindex/update')
    update(@Body() updatePropertyDto: UpdatePropertyDto) {
      return this.propertiesEuromarkService.updateTyreEuromark(
        updatePropertyDto,
      );
    }
  
    @Delete('euromark/loadindex/remove')
    remove(@Param() @Body() getPropertyDto: GetPropertyDto) {
      return this.propertiesEuromarkService.removeTyreEuromark(getPropertyDto);
    }
  }
  