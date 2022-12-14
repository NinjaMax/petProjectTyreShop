import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { GetStockDto } from './dto/get-stock.dto';
import { StockOilsService } from './stock-oils.service';

@Controller('stock')
export class StockOilsController {

  constructor(private readonly stockOilsService: StockOilsService) {}

  @Post('/oils')
  createStockOils(@Body() createStockDto: CreateStockDto) {
    return this.stockOilsService.createStockOils(createStockDto);
  }

  @Get('/oils')
  findAllStock() {
    return this.stockOilsService.findAllStock();
  }

  @Get('/oils/id')
  findStockOilById(@Param() @Body() getStockDto : GetStockDto) {
    return this.stockOilsService.findStockOilById(getStockDto);
  }

  @Patch('/oils/update')
  updateStockOil(@Body() updateStockDto: UpdateStockDto) {
    return this.stockOilsService.updateStockOil(updateStockDto);
  }

  @Delete('/oils/remove')
  removeStockOil(@Body() getStockDto: GetStockDto) {
    return this.stockOilsService.removeStockOil(getStockDto);
  }
}
