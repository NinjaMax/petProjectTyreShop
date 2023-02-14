import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { GetStockDto } from './dto/get-stock.dto';
import { StockWheelsService } from './stock-wheels.service';

@Controller('stock/wheels')
export class StockWheelsController {

  constructor(private readonly stockWheelsService: StockWheelsService) {}

  @Post('/add')
  createStockWheel(@Body() createStockDto: CreateStockDto) {
    return this.stockWheelsService.createStockWheel(createStockDto);
  }

  @Get('/all')
  findAll() {
    return this.stockWheelsService.findAllStock();
  }

  @Get()
  findOne(@Query() getStockDto : GetStockDto) {
    return this.stockWheelsService.findStockWheelById(getStockDto);
  }

  @Patch('/update')
  update(@Body() updateStockDto: UpdateStockDto) {
    return this.stockWheelsService.updateStockWheel(updateStockDto);
  }

  @Delete('/remove')
  remove(@Body() getStockDto: GetStockDto) {
    return this.stockWheelsService.removeStockWheel(getStockDto);
  }
}
