import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceTyresDto } from './dto/update-price_tyres.dto';
import { GetPriceDto } from './dto/get-price.dto';
import { PriceOilsService } from './price-oils.service';

@Controller('prices')
export class PriceOilsController {
  
  constructor(private readonly priceOilsService: PriceOilsService) {}

  @Post('/oils')
  create(@Body() createPriceDto: CreatePriceDto) {
    return this.priceOilsService.createPriceOils(createPriceDto);
  }

  @Get('/oils')
  findAll() {
    return this.priceOilsService.findAll();
  }

  @Get('oils/id')
  findOne(@Body() getPriceDto : GetPriceDto) {
    return this.priceOilsService.findPriceOilsById(getPriceDto);
  }

  @Patch('oils/update')
  update(@Body() updatePriceDto: UpdatePriceTyresDto) {
    return this.priceOilsService.updatePriceOils(updatePriceDto);
  }

  @Delete('oils/remove')
  remove(@Body() getPriceDto: GetPriceDto) {
    return this.priceOilsService.removePriceOils(getPriceDto);
  }
}
