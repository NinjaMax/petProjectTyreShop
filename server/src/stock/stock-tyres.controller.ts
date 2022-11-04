import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StockTyresService } from './stock-tyres.service';
import { CreateStockDto } from './dto/create-stock_tyres.dto';
import { UpdateStockTyresDto } from './dto/update-stock_tyres.dto';
import { GetStockDto } from './dto/get-stock_tyres.dto';

@Controller('stock')
export class StockTyresController {

  constructor(private readonly stockTyresService: StockTyresService) {}

  @Post('/tyres')
  create(@Body() createStockDto: CreateStockDto) {
    return this.stockTyresService.createStockTyre(createStockDto);
  }

  @Get('/tyres')
  findAll() {
    return this.stockTyresService.findAllStock();
  }

  @Get('/id')
  findOne(@Param() getStockDto : GetStockDto) {
    return this.stockTyresService.findStockTyreById(getStockDto);
  }

  @Patch('/update')
  update(@Body() updateStockDto: UpdateStockTyresDto) {
    return this.stockTyresService.updateStockTyres(updateStockDto);
  }

  @Delete('/remove')
  remove(@Body() getStockDto: GetStockDto) {
    return this.stockTyresService.removeStockTyre(getStockDto);
  }
}
