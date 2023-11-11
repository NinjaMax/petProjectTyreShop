import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PropsBrandService } from '../props-tyres-services/props-tyre-brand.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';

@Controller('properties')
export class PropertiesBrandController {
  constructor(private readonly propertiesBrandService: PropsBrandService) {}

  @Post('/brand')
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertiesBrandService.createTyreBrand(createPropertyDto);
  }

  @Get('/allbrands')
  findAll() {
    return this.propertiesBrandService.findAllTyreBrand();
  }

  @Get('/model/id')
  findOne(@Param() @Body() getPropertyDto: GetPropertyDto) {
    return this.propertiesBrandService.findBrandById(getPropertyDto);
  }

  @Get('tyres/brandname/:brand')
  findTyreBrandName(@Param('brand') brand: string) {
    return this.propertiesBrandService.findTyreBrandByName(brand);
  }

  @Patch('/brand/update')
  update(@Body() updatePropertyDto: UpdatePropertyDto) {
    return this.propertiesBrandService.updateTyreBrand(updatePropertyDto);
  }

  @Delete('/remove')
  remove(@Param() @Body() getPropertyDto: GetPropertyDto) {
    return this.propertiesBrandService.removeTyreBrand(getPropertyDto);
  }
}
