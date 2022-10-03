import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WheelsService } from './wheels.service';
import { CreateWheelDto } from './dto/create-wheel.dto';
import { UpdateWheelDto } from './dto/update-wheel.dto';

@Controller('wheels')
export class WheelsController {
  constructor(private readonly wheelsService: WheelsService) {}

  @Post()
  create(@Body() createWheelDto: CreateWheelDto) {
    return this.wheelsService.create(createWheelDto);
  }

  @Get()
  findAll() {
    return this.wheelsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wheelsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWheelDto: UpdateWheelDto) {
    return this.wheelsService.update(+id, updateWheelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wheelsService.remove(+id);
  }
}
