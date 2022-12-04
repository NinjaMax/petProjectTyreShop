import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrdersStorageService } from 'src/orders/orders-storage.service';
import { OrdersService } from 'src/orders/orders.service';
import { CreateOrdersSupplierDto } from './dto/create-orders-supplier.dto';
import { GetOrdersSuppliersDto } from './dto/get-orders-supplier.dto';
import { UpdateOrdersSupplierDto } from './dto/update-orders-supplier.dto';
import { OrdersSupplier } from './entities/orders-supplier.model';
import { OrdersSupStorageService } from './orders-sup-storage.service';

@Injectable()
export class OrdersSuppliersService {

  constructor(@InjectModel(OrdersSupplier) private ordersSupRepository: typeof OrdersSupplier,
    private ordersService: OrdersService,
    private ordersSupStorageService: OrdersSupStorageService,
    private ordersStorageService: OrdersStorageService
  ) {}

  async createOrderSup(createOrdersSupplierDto: CreateOrdersSupplierDto) {
    
    try {
      
      const order = await this.ordersService.findOrderById(createOrdersSupplierDto);
      const orderSup = await this.ordersSupRepository.create(createOrdersSupplierDto);

      if(createOrdersSupplierDto.id_order) {
        
        const orderSupId = await this.ordersSupRepository.findByPk(orderSup.id_order_sup);
        
        const orderGoods = await this.ordersStorageService.findGoodsOrderStorage(createOrdersSupplierDto);
        const ordersGoodsIdSup = orderGoods.map(item => item.id_supplier);
        const idSuppliers = Array.from(new Set(ordersGoodsIdSup));
        
        for( let i = 0; i < idSuppliers.length; i++ ) {

          const filterSup = orderGoods.filter(item => item.id_supplier == idSuppliers[i]);
          
          if(filterSup[0].id_supplier == idSuppliers[0]) {
            await orderSupId.$add('order', order.id_order);
            await orderSupId.$add('orders_sup_storage', orderGoods[0]);
            await orderSupId.$add('supplier', orderGoods[0].id_supplier);
            
            orderSupId.reload();

            return orderSupId;
          }
          
          const orderSupNew = await this.ordersSupRepository.create(createOrdersSupplierDto);
          await orderSupNew.$add('order', order.id_order);
          await orderSupNew.$add('orders_sup_storage', orderGoods[i]);
          await orderSupNew.$add('supplier', orderGoods[i].id_supplier);
          
          await orderSupNew.reload();

          return orderSupNew;
        }
      }

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  async addGoodsOrderSup(createOrdersSupplierDto: CreateOrdersSupplierDto) {
    
    try {
      
      const order = await this.ordersService.findOrderById(createOrdersSupplierDto);
      const orderSup = await this.ordersSupRepository.create(createOrdersSupplierDto);

      if(order) {
        
        const orderSupId = await this.ordersSupRepository.findByPk(orderSup.id_order_sup);
        await orderSupId.$add('order', order.id_order);
        //order.order_sup_storage.push(orderSupId);

        return orderSupId;
      }
      
      return orderSup;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  async findAllOrdersSup() {

    try {
      
      const orderSupAll = await this.ordersSupRepository.findAll({include:{all: true}});

      return orderSupAll;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  async findOrderSupById(getOrdersSupDto: GetOrdersSuppliersDto) {

    try {
      
      const orderSupId = await this.ordersSupRepository.findByPk(getOrdersSupDto.id_order_sup, {include: {all: true}});

      return orderSupId;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  update(id: number, updateOrdersSupplierDto: UpdateOrdersSupplierDto) {
    return `This action updates a #${id} ordersSupplier`;
  }

  async removeOrderSup(getOrdersSupDto: GetOrdersSuppliersDto) {

    try {
      
      const orderSup = await this.ordersSupRepository.destroy({where: {id_order_sup: getOrdersSupDto.id_order_sup}});

      return orderSup;

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }
}
