import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceTyresDto } from './dto/update-price_tyres.dto';
import { GetPriceDto } from './dto/get-price.dto';
import { PriceWheelsService } from './price-wheels.service';

@Controller('prices')
export class PriceWheelsController {
  
  constructor(private readonly priceWheelsService: PriceWheelsService) {}

  @Post('/wheels')
  create(@Body() createPriceDto: CreatePriceDto) {
    return this.priceWheelsService.createPriceWheels(createPriceDto);
  }

  @Get('/wheels')
  findAll() {
    return this.priceWheelsService.findAll();
  }

  @Get('wheels/id')
  findOne(@Body() getPriceDto : GetPriceDto) {
    return this.priceWheelsService.findPriceWheelsById(getPriceDto);
  }

  @Patch('wheels/update')
  update(@Body() updatePriceDto: UpdatePriceTyresDto) {
    return this.priceWheelsService.updatePriceWheels(updatePriceDto);
  }

  @Delete('wheels/remove')
  remove(@Body() getPriceDto: GetPriceDto) {
    return this.priceWheelsService.removePriceWheels(getPriceDto);
  }
}
