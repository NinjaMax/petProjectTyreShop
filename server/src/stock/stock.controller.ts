import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockTyresDto } from './dto/create-stock_tyres.dto';
import { UpdateStockTyresDto } from './dto/update-stock_tyres.dto';
import { GetStockTyresDto } from './dto/get-stock_tyres.dto';
//import { GetTyreDto } from 'src/tyres/dto/get-tyre.dto';

@Controller('stock')
export class StockController {

  constructor(private readonly stockService: StockService) {}

  @Post()
  create(@Body() createStockDto: CreateStockTyresDto) {
    return this.stockService.createStock(createStockDto);
  }

  @Get()
  findAll() {
    return this.stockService.findAllStock();
  }

  @Get(':id')
  findOne(@Param('id') getStockTyresDto : GetStockTyresDto) {
    return this.stockService.findStockById(getStockTyresDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockDto: UpdateStockTyresDto) {
    return this.stockService.update(+id, updateStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockService.remove(+id);
  }
}
