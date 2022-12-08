import { Injectable, HttpException, HttpStatus  } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { format } from 'path';
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

      if(order) {
        
        //const orderSupId = await this.ordersSupRepository.findByPk(orderSup.id_order_sup);
        const orderGoods = await this.ordersStorageService.findGoodsOrderStorage(createOrdersSupplierDto);
        //const orderId = await this.ordersService.findOrderById(createOrdersSupplierDto);
        const ordersGoodsIdSup = orderGoods.map(item => item.id_supplier);
        const idSuppliers = Array.from(new Set(ordersGoodsIdSup));
        
        for( let i = 0; i < idSuppliers.length; i++ ) {
          await this.ordersSupRepository.create(
           { id_order: order.id_order,
            id_supplier: idSuppliers[i] },
           { fields: ["id_order", "id_supplier", 
           "delivery", "status", "notes"] }
          );

        }
        
 
          for(let j = 0; j < orderGoods.length; j++) {

            await this.ordersSupStorageService.createOrderSupStorageNew(
              orderGoods[j].id,
              orderGoods[j].id_order,
              orderGoods[j].id_supplier,
              orderGoods[j].quantity,
              orderGoods[j].price,
              orderGoods[j].storage_index 
             );

         }

        const orderSupAll = await this.ordersSupRepository.findAll({include:{all: true}});
        return orderSupAll;  

      } 

      return 'DO NOT WORK';

    } catch {

      throw new HttpException('Data is incorrect and must be uniq', HttpStatus.NOT_FOUND);

    }
  }

  async addGoodsToOrderSup(createOrdersSupplierDto: CreateOrdersSupplierDto) {
    
    try {
      
      

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
