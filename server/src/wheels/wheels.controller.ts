import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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

  @Get()
  findAll() {
    return this.wheelsService.findAllWheels();
  }

  @Get('/id')
  findOne(@Param() getWheelDto: GetWheelDto) {
    return this.wheelsService.findWheelById(getWheelDto);
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
