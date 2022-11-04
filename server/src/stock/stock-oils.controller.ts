import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock_tyres.dto';
import { UpdateStockTyresDto } from './dto/update-stock_tyres.dto';
import { GetStockDto } from './dto/get-stock_tyres.dto';
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
  findOne(@Param() getStockDto : GetStockDto) {
    return this.stockOilsService.findStockOilById(getStockDto);
  }

  @Patch('/oils/update')
  update(@Body() updateStockDto: UpdateStockTyresDto) {
    return this.stockOilsService.updateStockOil(updateStockDto);
  }

  @Delete('/oils/remove')
  remove(@Body() getStockDto: GetStockDto) {
    return this.stockOilsService.removeStockOil(getStockDto);
  }
}
