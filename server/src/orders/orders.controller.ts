import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrdersDto } from './dto/get-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.createOrder(createOrderDto);
  }

  @Post('/add')
  addGoodsToOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.addGoodsToOrder(createOrderDto);
  }

  @Get()
  findAllorders() {
    return this.ordersService.findAllorders();
  }

  @Get('/id')
  findOrderById( @Body() getOrdersDto: GetOrdersDto ) {
    return this.ordersService.findOrderById(getOrdersDto);
  }

  @Patch('/update')
  updateOrder(@Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.updateOrder(updateOrderDto);
  }

  @Delete('/remove')
  removeOrder(@Param()  @Body() getOrdersDto: GetOrdersDto) {
    return this.ordersService.removeOrder(getOrdersDto);
  }
}
