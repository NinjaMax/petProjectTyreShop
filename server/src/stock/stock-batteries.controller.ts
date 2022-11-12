import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { GetStockDto } from './dto/get-stock.dto';
import { StockBatteriesService } from './stock-batteries.service';

@Controller('stock')
export class StockBatteriesController {

  constructor(private readonly stockBatteriesService: StockBatteriesService) {}

  @Post('/battery')
  create(@Body() createStockDto: CreateStockDto) {
    return this.stockBatteriesService.createStockBattery(createStockDto);
  }

  @Get('/battery')
  findAll() {
    return this.stockBatteriesService.findAllStock();
  }

  @Get('/battery/id')
  findOne(@Param() @Body() getStockDto : GetStockDto) {
    return this.stockBatteriesService.findStockBatteryById(getStockDto);
  }

  @Patch('/battery/update')
  update(@Body() updateStockDto: UpdateStockDto) {
    return this.stockBatteriesService.updateStockBattery(updateStockDto);
  }

  @Delete('/battery/remove')
  remove(@Body() getStockDto: GetStockDto) {
    return this.stockBatteriesService.removeStockBattery(getStockDto);
  }
}
