import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BatteriesService } from './batteries.service';
import { CreateBatteryDto } from './dto/create-battery.dto';
import { GetBatteryDto } from './dto/get-battery.dto';
import { UpdateBatteryDto } from './dto/update-battery.dto';

@Controller('batteries')
export class BatteriesController {
  constructor(private readonly batteriesService: BatteriesService) {}

  @Post()
  create(@Body() createBatteryDto: CreateBatteryDto) {
    return this.batteriesService.createBattery(createBatteryDto);
  }

  @Get()
  findAll() {
    return this.batteriesService.findAllBatteries();
  }

  @Get('/id')
  findOne(@Param() getBatteryDto: GetBatteryDto) {
    return this.batteriesService.findBatteryById(getBatteryDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBatteryDto: UpdateBatteryDto) {
    return this.batteriesService.update(+id, updateBatteryDto);
  }

  @Delete('/remove')
  remove(@Param() getBatteryDto: GetBatteryDto) {
    return this.batteriesService.removeBattery(getBatteryDto);
  }
}
