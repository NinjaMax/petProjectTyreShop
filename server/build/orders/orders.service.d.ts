import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrdersDto } from './dto/get-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Orders } from './entities/order.model';
import { OrdersStorageService } from './orders-storage.service';
import { BasketService } from '../basket/basket.service';
import { StockBatteriesService } from '../stock/stock-batteries.service';
import { StockOilsService } from '../stock/stock-oils.service';
import { StockTyresService } from '../stock/stock-tyres.service';
import { StockWheelsService } from '../stock/stock-wheels.service';
import { StorageService } from '../storage/storage.service';
export declare class OrdersService {
    private ordersRepository;
    private basketService;
    private stockTyresService;
    private stockWheelsService;
    private stockBatteriesService;
    private stockOilsService;
    private storageService;
    private ordersStorageService;
    constructor(ordersRepository: typeof Orders, basketService: BasketService, stockTyresService: StockTyresService, stockWheelsService: StockWheelsService, stockBatteriesService: StockBatteriesService, stockOilsService: StockOilsService, storageService: StorageService, ordersStorageService: OrdersStorageService);
    createOrder(createOrderDto: CreateOrderDto): Promise<Orders>;
    findAllOrders(): Promise<Orders[]>;
    findOrderById(getOrdersDto: GetOrdersDto): Promise<Orders>;
    findOrderByCustomer(getOrdersDto: GetOrdersDto): Promise<Orders>;
    createGoodsToOrder(createOrderDto: CreateOrderDto): Promise<import("./entities/order-storage.model").Order_Storage>;
    tyreStockOrder(createOrderDto: CreateOrderDto): Promise<Orders>;
    wheelStockOrder(createOrderDto: CreateOrderDto): Promise<Orders>;
    batteryStockOrder(createOrderDto: CreateOrderDto): Promise<Orders>;
    oilStockOrder(createOrderDto: CreateOrderDto): Promise<Orders>;
    addGoodsToOrder(createOrderDto: CreateOrderDto): Promise<Orders>;
    updateOrder(updateOrderDto: UpdateOrderDto): Promise<Orders>;
    removeOrder(getOrdersDto: GetOrdersDto): Promise<number>;
}
