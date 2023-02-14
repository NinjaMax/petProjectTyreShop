import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceTyresDto } from './dto/update-price_tyres.dto';
import { GetPriceDto } from './dto/get-price.dto';
import { PriceBatteryService } from './price-batteries.service';

@Controller('prices/battery')
export class PriceBatteriesController {
  
  constructor(private readonly priceBatteriesService: PriceBatteryService) {}

  @Post('/add')
  create(@Body() createPriceDto: CreatePriceDto) {
    return this.priceBatteriesService.createPriceBatteries(createPriceDto);
  }

  @Get('/all')
  findAll() {
    return this.priceBatteriesService.findAll();
  }

  @Get()
  findOne(@Query() getPriceDto: GetPriceDto) {
    return this.priceBatteriesService.findPriceBatteriesById(getPriceDto);
  }

  @Patch('/update')
  update(@Body() updatePriceDto: UpdatePriceTyresDto) {
    return this.priceBatteriesService.updatePriceBattery(updatePriceDto);
  }

  @Delete('/remove')
  remove(@Body() getPriceDto: GetPriceDto) {
    return this.priceBatteriesService.removePriceBattery(getPriceDto);
  }
}
