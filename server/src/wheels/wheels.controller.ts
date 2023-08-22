import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { WheelsService } from './wheels.service';
import { CreateWheelDto } from './dto/create-wheel.dto';
import { GetWheelDto } from './dto/get-wheel.dto';
import { UpdateWheelDto } from './dto/update-wheel.dto';

@Controller('wheels')
export class WheelsController {
  constructor(private readonly wheelsService: WheelsService) {}

  @Post()
  create(@Body() createWheelDto: CreateWheelDto) {
    return this.wheelsService.createWheel(createWheelDto);
  }

  @Get('/all')
  findAll() {
    return this.wheelsService.findAllWheels();
  }

  @Get('/id')
  findOne(@Param() getWheelDto: GetWheelDto) {
    return this.wheelsService.findWheelById(getWheelDto);
  }
  @Get('/no-offset')
  findWheelsWithoutLimit(
    @Query('width') width: string,
    @Query('diameter') diameter: string,
    @Query('bolt_count') bolt_count: string,
    @Query('bolt_count_pcd') bolt_count_pcd: string,
    @Query('brand') brand: string,
    @Query('price') price: string,
    @Query('type') type: string,
    @Query('color') color: string,
    @Query('dia') dia: string,
    @Query('et') et: string,
    @Query('pcd') pcd: string,
    @Query('pcd2') pcd2: string,
    @Query('sort') sort: string,
  ) {
    return this.wheelsService.findAllWheelsWithoutOffset(
      width,
      diameter,
      bolt_count,
      bolt_count_pcd,
      brand,
      price,
      type,
      color,
      dia,
      et,
      pcd,
      pcd2,
      sort,
    );
  }

  @Get('/params')
  findAllWheelsByParams(
    @Query('width') width: string,
    @Query('bolt_count_pcd') bolt_count_pcd: string,
    @Query('dia') dia: string,
    @Query('et') et: string,
    @Query('diameter') diameter: string
  ) {
    return this.wheelsService.findAllWheelsByParams(
      width,
      bolt_count_pcd,
      dia,
      et,
      diameter,
    );
  };

  @Get('/params-brand')
  findAllWheelsByBrandAndParams(
    @Query('brand') brand: string,
    @Query('width') width: string,
    @Query('bolt_count_pcd') bolt_count_pcd: string,
    @Query('dia') dia: string,
    @Query('et') et: string,
    @Query('diameter') diameter: string
  ) {
    return this.wheelsService.findAllWheelsByBrandParams(
      brand,
      width,
      bolt_count_pcd,
      dia,
      et,
      diameter,
    );
  };

  @Get('/paramid/:id')
  findTyresByParamId(@Param('id') id: string) {
    return this.wheelsService.findWheelsByIdParam(id);
  }
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWheelDto: UpdateWheelDto) {
    return this.wheelsService.update(+id, updateWheelDto);
  }

  @Delete('/remove')
  remove(@Param() getWheelDto: GetWheelDto) {
    return this.wheelsService.removeWheel(getWheelDto);
  }
}
