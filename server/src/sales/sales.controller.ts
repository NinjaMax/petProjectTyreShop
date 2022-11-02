import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { GetSaleDto } from './dto/get-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  create(@Body() createSaleDto: CreateSaleDto) {
    return this.salesService.createSale(createSaleDto);
  }

  @Get()
  findAll() {
    return this.salesService.findAllSales();
  }

  @Get('/id')
  findOne(@Param() getSaleDto: GetSaleDto) {
    return this.salesService.findSaleById(getSaleDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto) {
    return this.salesService.update(+id, updateSaleDto);
  }

  @Delete('/remove')
  remove(@Param() getSaleDto: GetSaleDto) {
    return this.salesService.removeSale(getSaleDto);
  }
}
