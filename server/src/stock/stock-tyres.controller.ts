import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StockTyresService } from './stock-tyres.service';
import { CreateStockDto } from './dto/create-stock_tyres.dto';
import { UpdateStockTyresDto } from './dto/update-stock_tyres.dto';
import { GetStockDto } from './dto/get-stock_tyres.dto';

@Controller('stock')
export class StockTyresController {

  constructor(private readonly stockService: StockTyresService) {}

  @Post('/tyres')
  create(@Body() createStockDto: CreateStockDto) {
    return this.stockService.createStockTyre(createStockDto);
  }

  @Get('/tyres')
  findAll() {
    return this.stockService.findAllStock();
  }

  @Get('/id')
  findOne(@Param() getStockDto : GetStockDto) {
    return this.stockService.findStockTyreById(getStockDto);
  }

  @Patch('/update')
  update(@Body() updateStockDto: UpdateStockTyresDto) {
    return this.stockService.updateStockTyres(updateStockDto);
  }

  @Delete('/remove')
  remove(@Body() getStockDto: GetStockDto) {
    return this.stockService.removeStockTyre(getStockDto);
  }
}
