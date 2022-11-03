import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PriceTyresService } from './price-tyres.service';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceTyresDto } from './dto/update-price_tyres.dto';
import { GetPriceDto } from './dto/get-price.dto';

@Controller('prices')
export class PriceTyresController {
  
  constructor(private readonly pricesService: PriceTyresService) {}

  @Post('/tyres')
  create(@Body() createPriceDto: CreatePriceDto) {
    return this.pricesService.createPriceTyres(createPriceDto);
  }

  @Get('/tyres')
  findAll() {
    return this.pricesService.findAll();
  }

  @Get('/tyres/id')
  findOne(@Body() getPriceDto : GetPriceDto) {
    return this.pricesService.findPriceTyresById(getPriceDto);
  }

  @Patch('/tyres/update')
  update(@Body() updatePriceDto: UpdatePriceTyresDto) {
    return this.pricesService.updatePriceTyres(updatePriceDto);
  }

  @Delete('/tyres/remove')
  remove(@Body() getPriceDto: GetPriceDto) {
    return this.pricesService.removePrice(getPriceDto);
  }
}
