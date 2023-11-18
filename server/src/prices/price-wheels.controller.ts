import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceTyresDto } from './dto/update-price_tyres.dto';
import { GetPriceDto } from './dto/get-price.dto';
import { PriceWheelsService } from './price-wheels.service';

@Controller('price/wheels')
export class PriceWheelsController {
  
  constructor(private readonly priceWheelsService: PriceWheelsService) {}

  @Post('/add')
  create(@Body() createPriceDto: CreatePriceDto) {
    return this.priceWheelsService.createPriceWheels(createPriceDto);
  }

  @Get('/all')
  findAllWheels() {
    return this.priceWheelsService.findAllWheels();
  }

  @Get('/idwheel')
  findPriceWheelsById(@Query('id_wheel') id_wheel: string) {
    return this.priceWheelsService.findAdminPriceWheelsById(+id_wheel);
  }

  @Patch('/update')
  update(@Body() updatePriceDto: UpdatePriceTyresDto) {
    return this.priceWheelsService.updatePriceWheels(updatePriceDto);
  }

  @Delete('/remove')
  remove(@Body() getPriceDto: GetPriceDto) {
    return this.priceWheelsService.removePriceWheels(getPriceDto);
  }
}
