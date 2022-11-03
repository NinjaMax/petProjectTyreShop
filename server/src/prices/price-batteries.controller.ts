import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceTyresDto } from './dto/update-price_tyres.dto';
import { GetPriceDto } from './dto/get-price.dto';
import { PriceBatteryService } from './price-batteries.service';

@Controller('prices')
export class PriceBatteriesController {
  
  constructor(private readonly priceBatteriesService: PriceBatteryService) {}

  @Post('/battery')
  create(@Body() createPriceDto: CreatePriceDto) {
    return this.priceBatteriesService.createPriceBatteries(createPriceDto);
  }

  @Get('/batteries')
  findAll() {
    return this.priceBatteriesService.findAll();
  }

  @Get('battery/id')
  findOne(@Body() getPriceDto : GetPriceDto) {
    return this.priceBatteriesService.findPriceBatteriesById(getPriceDto);
  }

  @Patch('battery/update')
  update(@Body() updatePriceDto: UpdatePriceTyresDto) {
    return this.priceBatteriesService.updatePriceBattery(updatePriceDto);
  }

  @Delete('battery/remove')
  remove(@Body() getPriceDto: GetPriceDto) {
    return this.priceBatteriesService.removePriceBattery(getPriceDto);
  }
}
