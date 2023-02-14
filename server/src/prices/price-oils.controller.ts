import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceTyresDto } from './dto/update-price_tyres.dto';
import { GetPriceDto } from './dto/get-price.dto';
import { PriceOilsService } from './price-oils.service';

@Controller('prices/oils')
export class PriceOilsController {
  
  constructor(private readonly priceOilsService: PriceOilsService) {}

  @Post('/add')
  create(@Body() createPriceDto: CreatePriceDto) {
    return this.priceOilsService.createPriceOils(createPriceDto);
  }

  @Get('/all')
  findAll() {
    return this.priceOilsService.findAll();
  }

  @Get()
  findOne(@Query() getPriceDto : GetPriceDto) {
    return this.priceOilsService.findPriceOilsById(getPriceDto);
  }

  @Patch('/update')
  update(@Body() updatePriceDto: UpdatePriceTyresDto) {
    return this.priceOilsService.updatePriceOils(updatePriceDto);
  }

  @Delete('/remove')
  remove(@Body() getPriceDto: GetPriceDto) {
    return this.priceOilsService.removePriceOils(getPriceDto);
  }
}
