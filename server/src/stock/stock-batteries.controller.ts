import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { GetStockDto } from './dto/get-stock.dto';
import { StockBatteriesService } from './stock-batteries.service';

@Controller('stock/battery')
export class StockBatteriesController {

  constructor(private readonly stockBatteriesService: StockBatteriesService) {}

  @Post('/add')
  create(@Body() createStockDto: CreateStockDto) {
    return this.stockBatteriesService.createStockBattery(createStockDto);
  }

  @Get('/all')
  findAll() {
    return this.stockBatteriesService.findAllStock();
  }

  @Get()
  findOne(@Query() getStockDto : GetStockDto) {
    return this.stockBatteriesService.findStockBatteryById(getStockDto);
  }

  @Patch('/update')
  update(@Body() updateStockDto: UpdateStockDto) {
    return this.stockBatteriesService.updateStockBattery(updateStockDto);
  }

  @Delete('/remove')
  remove(@Body() getStockDto: GetStockDto) {
    return this.stockBatteriesService.removeStockBattery(getStockDto);
  }
}
