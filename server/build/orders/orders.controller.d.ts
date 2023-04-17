import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrdersDto } from './dto/get-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    createOrder(createOrderDto: CreateOrderDto): Promise<import("./entities/order.model").Orders>;
    addGoodsToOrder(createOrderDto: CreateOrderDto): Promise<import("./entities/order.model").Orders>;
    createGoodsToOrder(createOrderDto: CreateOrderDto): Promise<import("./entities/order-storage.model").Order_Storage>;
    findAllOrders(): Promise<import("./entities/order.model").Orders[]>;
    findOrderById(getOrdersDto: GetOrdersDto): Promise<import("./entities/order.model").Orders>;
    updateOrder(updateOrderDto: UpdateOrderDto): Promise<import("./entities/order.model").Orders>;
    removeOrder(getOrdersDto: GetOrdersDto): Promise<number>;
}
