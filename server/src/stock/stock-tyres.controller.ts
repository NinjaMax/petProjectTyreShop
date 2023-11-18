import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { StockTyresService } from './stock-tyres.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { GetStockDto } from './dto/get-stock.dto';

@Controller('/stock/tyres')
export class StockTyresController {

  constructor(private readonly stockTyresService: StockTyresService) {}

  @Post('/add')
  createStockTyre(@Body() createStockDto: CreateStockDto) {
    return this.stockTyresService.createStockTyre(createStockDto);
  }

  @Get('/all')
  findAllStock() {
    return this.stockTyresService.findAllStock();
  }

  @Get('/idtyre')
  findStockTyreById(@Query('id_tyre') id_tyre: string) {
    return this.stockTyresService.findAdminStockTyreByIdtyre(+id_tyre); 
  }

  @Get(':id')
  findStockTyreParamId(@Param('id', ParseIntPipe) id: number) {
    return this.stockTyresService.findStockTyreParamId(id); 
  }

  @Patch('/update')
  updateStockTyres(@Body() updateStockDto: UpdateStockDto) {
    return this.stockTyresService.updateStockTyres(updateStockDto);
  }

  @Delete('/remove')
  removeStockTyre(@Body() getStockDto: GetStockDto) {
    return this.stockTyresService.removeStockTyre(getStockDto);
  }
}
