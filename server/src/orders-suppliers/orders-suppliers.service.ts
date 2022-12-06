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

      if(order) {
        
        //const orderSupId = await this.ordersSupRepository.findByPk(orderSup.id_order_sup);
        
        const orderGoods = await this.ordersStorageService.findGoodsOrderStorage(createOrdersSupplierDto);
        
        const ordersGoodsIdSup = orderGoods.map(item => item.id_supplier);
        const idSuppliers = Array.from(new Set(ordersGoodsIdSup));
        
        //for( let i = 0; i < idSuppliers.length; i++ ) {
          const orderSup = await this.ordersSupRepository.bulkCreate(
            Array.from(orderGoods), 
           { fields: ["id_order", "id_supplier", 
           "delivery", "status", "notes"] }
        
          );
          //orderSupNew.id_order = order.id_order;
          //orderSupNew.id_order = 2;
          
          //const filterSupOne = orderGoods.filter(item => item.id_supplier == idSuppliers[i]);
          //const filterSupOther = orderGoods.filter(item => item.id_supplier !== idSuppliers[0]);
          //orderSupNew.id_supplier = filterSupOne[i].id_supplier;
          //return filterSup;
          //for(let j = 0; j < filterSupOne.length; j++) {
            //await this.ordersSupStorageService.createOrderSupStorage(filterSupOne[j]);

          //   const orderSupStore = await this.ordersSupStorageService.createOrderSupStorageNew(
          //     orderGoods
          //   // filterSupOne[j].id, 
          //   // filterSupOne[j].quantity,
          //   // filterSupOne[j].price,
            
          //   // order.id_order
          // );
          
          // return orderSupStore;
         // }
          
        //}  
          // if(filterSupOne) {
          //   await orderSupId.$add('order', order.id_order);
          //   await orderSupId.$add('orders_sup_storage', filterSupOne);
          //   await orderSupId.$add('supplier', orderGoods[0].id_supplier);
            
          //   orderSupId.reload();

          //   return orderSupId;
          // }

          // for( let i = 0; i < idSuppliers.length; i++ ) {
          // if(filterSupOther)  {
          //   const orderSupNew = await this.ordersSupRepository.create(createOrdersSupplierDto);
          //   const newOrderSupStorege = await this.ordersSupStorageService.createOrderSupStorageNew(

          //   );
          //   await orderSupNew.$add('order', order.id_order);
          //   await orderSupNew.$add('orders_sup_storage', filterSupOther);
          //   await orderSupNew.$add('supplier', filterSupOther.id_supplier);
          
          //   await orderSupNew.reload();

          //   //return orderSupNew;
          // }
          // }
          return orderSup;
      } 
      //else {
      //  const orderSup = await this.ordersSupRepository.create(createOrdersSupplierDto);
      //  return orderSup;
      //}
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
