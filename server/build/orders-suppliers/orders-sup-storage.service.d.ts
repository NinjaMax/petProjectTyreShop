import { OrdersService } from '../orders/orders.service';
import { CreateOrdersSupplierDto } from './dto/create-orders-supplier.dto';
import { GetOrdersSuppliersDto } from './dto/get-orders-supplier.dto';
import { UpdateOrdersSupplierDto } from './dto/update-orders-supplier.dto';
import { OrdersSupStorage } from './entities/orders-sup-storage.model';
export declare class OrdersSupStorageService {
    private ordersSupStorageRepository;
    private ordersService;
    constructor(ordersSupStorageRepository: typeof OrdersSupStorage, ordersService: OrdersService);
    createOrderSupStorage(createOrdersSupplierDto: CreateOrdersSupplierDto): Promise<OrdersSupStorage>;
    createOrderSupStorageNew(id: number, id_order: number, id_supplier: number, quantity: number, price: number, storage_index: number): Promise<OrdersSupStorage>;
    findAllOrdersSupStorage(): Promise<OrdersSupStorage[]>;
    findAllOrdersSupStorageByOrd(getOrdersSupDto: GetOrdersSuppliersDto): Promise<OrdersSupStorage[]>;
    findOrdersSupStorageByOrdSup(getOrdersSupDto: GetOrdersSuppliersDto): Promise<OrdersSupStorage>;
    findAllOrdersSupStorageByOrdSup(getOrdersSupDto: GetOrdersSuppliersDto): Promise<OrdersSupStorage[]>;
    findOrderSupStorageById(getOrdersSupDto: GetOrdersSuppliersDto): Promise<OrdersSupStorage>;
    updateOrderSupStorage(updateOrdersSupplierDto: UpdateOrdersSupplierDto): Promise<[affectedCount: number]>;
    removeOrderSupStorage(getOrdersSupDto: GetOrdersSuppliersDto): Promise<number>;
}
