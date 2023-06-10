import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PropsTyreHomologationService } from '../props-tyres-services/props-tyre-homologation.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';

@Controller('properties')
export class PropertiesHomologationController {
  constructor(
    private readonly propertiesHomologationService: PropsTyreHomologationService,
  ) {}

  @Post('/homologation')
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertiesHomologationService.createTyreHomologation(
      createPropertyDto,
    );
  }

  @Get('/allhomologation')
  findAll() {
    return this.propertiesHomologationService.findAllTyreHomologation();
  }

  @Get('/homologation/id')
  findOne(@Param() getPropertyDto: GetPropertyDto) {
    return this.propertiesHomologationService.findTyreHomologationById(
      getPropertyDto,
    );
  }

  @Patch('/homologation/update')
  update(@Body() updatePropertyDto: UpdatePropertyDto) {
    return this.propertiesHomologationService.updateTyreHomologation(
      updatePropertyDto,
    );
  }

  @Delete('/homologation/remove')
  remove(@Param() @Body() getPropertyDto: GetPropertyDto) {
    return this.propertiesHomologationService.removeTyreHomologation(
      getPropertyDto,
    );
  }
}
