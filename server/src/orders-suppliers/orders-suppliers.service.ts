import { Injectable } from '@nestjs/common';
import { CreateOrdersSupplierDto } from './dto/create-orders-supplier.dto';
import { UpdateOrdersSupplierDto } from './dto/update-orders-supplier.dto';

@Injectable()
export class OrdersSuppliersService {
  create(createOrdersSupplierDto: CreateOrdersSupplierDto) {
    return 'This action adds a new ordersSupplier';
  }

  findAll() {
    return `This action returns all ordersSuppliers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ordersSupplier`;
  }

  update(id: number, updateOrdersSupplierDto: UpdateOrdersSupplierDto) {
    return `This action updates a #${id} ordersSupplier`;
  }

  remove(id: number) {
    return `This action removes a #${id} ordersSupplier`;
  }
}
