import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PropsTyreSeasonService } from '../props-tyres-services/props-tyre-season.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';

@Controller('properties')
export class PropertiesSeasonController {
  constructor(
    private readonly propsTyreSeasonService: PropsTyreSeasonService,
  ) {}

  @Post('/season')
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propsTyreSeasonService.createTyreSeason(createPropertyDto);
  }

  @Get('/allseasons')
  findAll() {
    return this.propsTyreSeasonService.findAllTyreSeason();
  }

  @Get('/season/:season')
  findOne(@Param('season') season: string) {
    return this.propsTyreSeasonService.findByTyreSeason(season);
  }

  @Patch('/season/update')
  update(@Body() updatePropertyDto: UpdatePropertyDto) {
    return this.propsTyreSeasonService.updateTyreSeason(updatePropertyDto);
  }

  @Delete('/remove')
  remove(@Param() @Body() getPropertyDto: GetPropertyDto) {
    return this.propsTyreSeasonService.removeTyreSeason(getPropertyDto);
  }
}
