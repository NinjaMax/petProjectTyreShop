import { Controller, Get, Param } from '@nestjs/common';
import { PropsWheelBrandService } from '../props-wheel-services/props-wheel-brand.service';

@Controller('properties')
export class PropertiesWheelBrandController {
  constructor(
    private readonly propsWheelBrandService: PropsWheelBrandService,
  ) {}

  @Get('/wheel/brandname/:brand')
  findOne(@Param('brand') brand: string) {
    return this.propsWheelBrandService.findWheelBrandByName(brand);
  }
}
