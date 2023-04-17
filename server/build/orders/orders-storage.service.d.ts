import { Order_Storage } from '../orders/entities/order-storage.model';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrdersDto } from './dto/get-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
export declare class OrdersStorageService {
    private ordersStorageRepository;
    constructor(ordersStorageRepository: typeof Order_Storage);
    createOrderStorage(createOrderDto: CreateOrderDto): Promise<Order_Storage>;
    findAllOrdersStorage(): Promise<Order_Storage[]>;
    findAllOrdersStorageId(getOrdersDto: GetOrdersDto): Promise<Order_Storage[]>;
    findOrderStorageById(getOrdersDto: GetOrdersDto): Promise<Order_Storage>;
    findOrderStorageOne(getOrdersDto: GetOrdersDto): Promise<Order_Storage>;
    findAllGoodsOrderStorage(getOrdersDto: GetOrdersDto): Promise<Order_Storage[]>;
    updateOrderStorage(updateOrderDto: UpdateOrderDto): Promise<[affectedCount: number]>;
    removeOrderSup(getOrdersDto: GetOrdersDto): Promise<number>;
}
