import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdersSuppliersService } from './orders-suppliers.service';
import { CreateOrdersSupplierDto } from './dto/create-orders-supplier.dto';
import { UpdateOrdersSupplierDto } from './dto/update-orders-supplier.dto';

@Controller('orders-suppliers')
export class OrdersSuppliersController {
  constructor(private readonly ordersSuppliersService: OrdersSuppliersService) {}

  @Post()
  create(@Body() createOrdersSupplierDto: CreateOrdersSupplierDto) {
    return this.ordersSuppliersService.create(createOrdersSupplierDto);
  }

  @Get()
  findAll() {
    return this.ordersSuppliersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersSuppliersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrdersSupplierDto: UpdateOrdersSupplierDto) {
    return this.ordersSuppliersService.update(+id, updateOrdersSupplierDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersSuppliersService.remove(+id);
  }
}
