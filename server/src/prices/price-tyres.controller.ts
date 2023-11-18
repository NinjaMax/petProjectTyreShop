import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PriceTyresService } from './price-tyres.service';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceTyresDto } from './dto/update-price_tyres.dto';
import { GetPriceDto } from './dto/get-price.dto';

@Controller('price/tyres')
export class PriceTyresController {
  
  constructor(private readonly pricesService: PriceTyresService) {}

  @Post('/add')
  create(@Body() createPriceDto: CreatePriceDto) {
    return this.pricesService.createPriceTyres(createPriceDto);
  }

  @Get('/all')
  findAll() {
    return this.pricesService.findAllTyres();
  }

  @Get('/idtyre')
  findPriceTyresById(@Query('id_tyre') id_tyre: string) {
    return this.pricesService.findAdminPriceTyresById(+id_tyre);
  }

  @Patch('/update')
  update(@Body() updatePriceDto: UpdatePriceTyresDto) {
    return this.pricesService.updatePriceTyres(updatePriceDto);
  }

  @Delete('/remove')
  remove(@Body() getPriceDto: GetPriceDto) {
    return this.pricesService.removePrice(getPriceDto);
  }
}
