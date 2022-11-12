import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { GetStockDto } from './dto/get-stock.dto';
import { StockOilsService } from './stock-oils.service';

@Controller('stock')
export class StockOilsController {

  constructor(private readonly stockOilsService: StockOilsService) {}

  @Post('/oils')
  create(@Body() createStockDto: CreateStockDto) {
    return this.stockOilsService.createStockOils(createStockDto);
  }

  @Get('/oils')
  findAll() {
    return this.stockOilsService.findAllStock();
  }

  @Get('/oils/id')
  findOne(@Param() @Body() getStockDto : GetStockDto) {
    return this.stockOilsService.findStockOilById(getStockDto);
  }

  @Patch('/oils/update')
  update(@Body() updateStockDto: UpdateStockDto) {
    return this.stockOilsService.updateStockOil(updateStockDto);
  }

  @Delete('/oils/remove')
  remove(@Body() getStockDto: GetStockDto) {
    return this.stockOilsService.removeStockOil(getStockDto);
  }
}
