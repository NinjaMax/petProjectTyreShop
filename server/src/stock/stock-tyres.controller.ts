import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StockTyresService } from './stock-tyres.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { GetStockDto } from './dto/get-stock.dto';

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
  findOne( @Body() getStockDto : GetStockDto) {
    return this.stockTyresService.findStockTyreById(getStockDto);
  }

  @Patch('/update')
  update(@Body() updateStockDto: UpdateStockDto) {
    return this.stockTyresService.updateStockTyres(updateStockDto);
  }

  @Delete('/remove')
  remove(@Body() getStockDto: GetStockDto) {
    return this.stockTyresService.removeStockTyre(getStockDto);
  }
}
