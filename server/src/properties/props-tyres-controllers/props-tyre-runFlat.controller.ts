import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PropsTyreRunFlatService } from '../props-tyres-services/props-tyre-runFlat.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';

@Controller('properties')
export class PropertiesRunFlatController {
  constructor(
    private readonly propertiesRunFlatService: PropsTyreRunFlatService,
  ) {}

  @Post('/runflat')
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertiesRunFlatService.createTyreRunFlat(createPropertyDto);
  }

  @Get('/allrunflat')
  findAll() {
    return this.propertiesRunFlatService.findAllTyreRunFlat();
  }

  @Get('/runflat/id')
  findOne(@Param() getPropertyDto: GetPropertyDto) {
    return this.propertiesRunFlatService.findTyreRunFlatById(getPropertyDto);
  }

  @Patch('/runflat/update')
  update(@Body() updatePropertyDto: UpdatePropertyDto) {
    return this.propertiesRunFlatService.updateTyreRunFlat(updatePropertyDto);
  }

  @Delete('/runflat/remove')
  remove(@Param() @Body() getPropertyDto: GetPropertyDto) {
    return this.propertiesRunFlatService.removeTyreRunFlat(getPropertyDto);
  }
}
