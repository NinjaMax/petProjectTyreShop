import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { GetSaleDto } from './dto/get-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  async createSale(@Body() createSaleDto: CreateSaleDto) {
    return this.salesService.createSale(createSaleDto);
  }

  @Post('/add')
  async addGoodsSale(@Body() createSaleDto: CreateSaleDto) {
    return this.salesService.addGoodsSale(createSaleDto);
  }

  @Get('/all')
  findAll() {
    return this.salesService.findAllSales();
  }

  @Get('/all-by-date')
  findAllDate(
    @Query('date_start') dateStart: string,
    @Query('date_end') dateEnd: string
  ) {
    return this.salesService.findAllSalesByDate(dateStart, dateEnd);
  }

  @Get('/id')
  findOne(@Param() @Body() getSaleDto: GetSaleDto) {
    return this.salesService.findSaleById(getSaleDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto) {
    return this.salesService.update(+id, updateSaleDto);
  }

  @Delete('/remove')
  remove(@Param() @Body() getSaleDto: GetSaleDto) {
    return this.salesService.removeSale(getSaleDto);
  }
}
