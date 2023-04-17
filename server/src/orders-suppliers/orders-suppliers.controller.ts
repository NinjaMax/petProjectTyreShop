import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrdersSuppliersService } from './orders-suppliers.service';
import { CreateOrdersSupplierDto } from './dto/create-orders-supplier.dto';
import { GetOrdersSuppliersDto } from './dto/get-orders-supplier.dto';
import { UpdateOrdersSupplierDto } from './dto/update-orders-supplier.dto';

@Controller('orders-suppliers')
export class OrdersSuppliersController {
  constructor(private readonly ordersSuppliersService: OrdersSuppliersService) {}

  @Post()
  createOrderSup(@Body() createOrdersSupplierDto: CreateOrdersSupplierDto) {
    return this.ordersSuppliersService.createOrderSup(createOrdersSupplierDto);
  }

  @Post('/add')
  addGoodsToOrderSup(@Body() createOrdersSupplierDto: CreateOrdersSupplierDto) {
    return this.ordersSuppliersService.addGoodsToOrderSup(createOrdersSupplierDto);
  }

  @Post('/add/stock')
  addGoodsToStock(@Body() createOrdersSupplierDto: CreateOrdersSupplierDto) {
    return this.ordersSuppliersService.addGoodsToStock(createOrdersSupplierDto);
  }

  @Get()
  findAll() {
    return this.ordersSuppliersService.findAllOrdersSup();
  }

  @Get('/id')
  findOne( @Body() getOrdersSupDto: GetOrdersSuppliersDto) {
    return this.ordersSuppliersService.findOrderSupById(getOrdersSupDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrdersSupplierDto: UpdateOrdersSupplierDto) {
    return this.ordersSuppliersService.update(+id, updateOrdersSupplierDto);
  }

  @Delete('/remove')
  remove( @Body() getOrdersSupDto: GetOrdersSuppliersDto) {
    return this.ordersSuppliersService.removeOrderSup(getOrdersSupDto);
  }
}
