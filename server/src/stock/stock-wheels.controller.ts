import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { GetStockDto } from './dto/get-stock.dto';
import { StockWheelsService } from './stock-wheels.service';

@Controller('stock')
export class StockWheelsController {

  constructor(private readonly stockWheelsService: StockWheelsService) {}

  @Post('/wheels')
  create(@Body() createStockDto: CreateStockDto) {
    return this.stockWheelsService.createStockWheel(createStockDto);
  }

  @Get('/wheels')
  findAll() {
    return this.stockWheelsService.findAllStock();
  }

  @Get('/wheels/id')
  findOne(@Param() @Body() getStockDto : GetStockDto) {
    return this.stockWheelsService.findStockWheelById(getStockDto);
  }

  @Patch('/wheels/update')
  update(@Body() updateStockDto: UpdateStockDto) {
    return this.stockWheelsService.updateStockWheel(updateStockDto);
  }

  @Delete('/wheels/remove')
  remove(@Body() getStockDto: GetStockDto) {
    return this.stockWheelsService.removeStockWheel(getStockDto);
  }
}
