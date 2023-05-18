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

@Controller('ordersup')
export class OrdersSuppliersController {
  constructor(
    private readonly ordersSuppliersService: OrdersSuppliersService,
  ) {}

  @Post()
  createOrderSup(@Body() createOrdersSupplierDto: CreateOrdersSupplierDto) {
    return this.ordersSuppliersService.createOrderSup(createOrdersSupplierDto);
  }

  @Post('/creategoods')
  createOrderSupGoods(
    @Body() createOrdersSupplierDto: CreateOrdersSupplierDto,
  ) {
    return this.ordersSuppliersService.createOrderSupGoods(
      createOrdersSupplierDto,
    );
  }

  @Post('/add')
  addGoodsToOrderSup(@Body() createOrdersSupplierDto: CreateOrdersSupplierDto) {
    return this.ordersSuppliersService.addGoodsToOrderSup(
      createOrdersSupplierDto,
    );
  }

  @Post('/add/stock')
  addGoodsToStock(@Body() createOrdersSupplierDto: CreateOrdersSupplierDto) {
    return this.ordersSuppliersService.addGoodsToStock(createOrdersSupplierDto);
  }

  @Get('all')
  findAll() {
    return this.ordersSuppliersService.findAllOrdersSup();
  }

  @Get('/id')
  findOne(@Body() getOrdersSupDto: GetOrdersSuppliersDto) {
    return this.ordersSuppliersService.findOrderSupById(getOrdersSupDto);
  }

  @Patch('/update')
  update(
    //@Param('id') id: string,
    @Body() updateOrdersSupplierDto: UpdateOrdersSupplierDto,
  ) {
    return this.ordersSuppliersService.updateOrderSup(updateOrdersSupplierDto);
  }

  @Delete('/remove')
  remove(@Body() getOrdersSupDto: GetOrdersSuppliersDto) {
    return this.ordersSuppliersService.removeOrderSup(getOrdersSupDto);
  }

  @Delete('/remove/ordersupstorage')
  removeOrderSup(@Body() getOrdersSupDto: GetOrdersSuppliersDto) {
    return this.ordersSuppliersService.removeOrderSupStorage(getOrdersSupDto);
  }
}
