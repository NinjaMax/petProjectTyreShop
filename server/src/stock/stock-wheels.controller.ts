import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock_tyres.dto';
import { UpdateStockTyresDto } from './dto/update-stock_tyres.dto';
import { GetStockDto } from './dto/get-stock_tyres.dto';
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
  findOne(@Param() getStockDto : GetStockDto) {
    return this.stockWheelsService.findStockWheelById(getStockDto);
  }

  @Patch('/wheels/update')
  update(@Body() updateStockDto: UpdateStockTyresDto) {
    return this.stockWheelsService.updateStockWheel(updateStockDto);
  }

  @Delete('/wheels/remove')
  remove(@Body() getStockDto: GetStockDto) {
    return this.stockWheelsService.removeStockWheel(getStockDto);
  }
}
