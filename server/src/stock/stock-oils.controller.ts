import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { GetStockDto } from './dto/get-stock.dto';
import { StockOilsService } from './stock-oils.service';

@Controller('stock/oils')
export class StockOilsController {

  constructor(private readonly stockOilsService: StockOilsService) {}

  @Post('/add')
  createStockOils(@Body() createStockDto: CreateStockDto) {
    return this.stockOilsService.createStockOils(createStockDto);
  }

  @Get('/all')
  findAllStock() {
    return this.stockOilsService.findAllStock();
  }

  @Get()
  findStockOilById(@Query() getStockDto : GetStockDto) {
    return this.stockOilsService.findStockOilById(getStockDto);
  }

  @Patch('/update')
  updateStockOil(@Body() updateStockDto: UpdateStockDto) {
    return this.stockOilsService.updateStockOil(updateStockDto);
  }

  @Delete('/remove')
  removeStockOil(@Body() getStockDto: GetStockDto) {
    return this.stockOilsService.removeStockOil(getStockDto);
  }
}
