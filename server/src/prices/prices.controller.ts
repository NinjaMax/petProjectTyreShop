import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PricesService } from './prices.service';
import { CreatePriceTyresDto } from './dto/create-price_tyres.dto';
import { UpdatePriceTyresDto } from './dto/update-price_tyres.dto';
import { GetPriceTyresDto } from './dto/get-price_tyres.dto';

@Controller('prices')
export class PricesController {
  
  constructor(private readonly pricesService: PricesService) {}

  @Post('/tyres')
  create(@Body() createPriceDto: CreatePriceTyresDto) {
    return this.pricesService.createPriceTyres(createPriceDto);
  }

  @Get()
  findAll() {
    return this.pricesService.findAll();
  }

  @Get('/id')
  findOne(@Body() getPriceTyresDto : GetPriceTyresDto) {
    return this.pricesService.findPriceTyresById(getPriceTyresDto);
  }

  @Patch('/update')
  update(@Body() updatePriceDto: UpdatePriceTyresDto) {
    return this.pricesService.updatePriceTyres(updatePriceDto);
  }

  @Delete('/remove')
  remove(@Body() getPriceTyresDto: GetPriceTyresDto) {
    return this.pricesService.removePrice(getPriceTyresDto);
  }
}
