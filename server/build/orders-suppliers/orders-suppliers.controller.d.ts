import { OrdersSuppliersService } from './orders-suppliers.service';
import { CreateOrdersSupplierDto } from './dto/create-orders-supplier.dto';
import { GetOrdersSuppliersDto } from './dto/get-orders-supplier.dto';
import { UpdateOrdersSupplierDto } from './dto/update-orders-supplier.dto';
export declare class OrdersSuppliersController {
    private readonly ordersSuppliersService;
    constructor(ordersSuppliersService: OrdersSuppliersService);
    createOrderSup(createOrdersSupplierDto: CreateOrdersSupplierDto): Promise<import("./entities/orders-supplier.model").OrdersSupplier | import("./entities/orders-supplier.model").OrdersSupplier[]>;
    addGoodsToOrderSup(createOrdersSupplierDto: CreateOrdersSupplierDto): Promise<import("./entities/orders-supplier.model").OrdersSupplier | import("./entities/orders-supplier.model").OrdersSupplier[]>;
    addGoodsToStock(createOrdersSupplierDto: CreateOrdersSupplierDto): Promise<import("../stock/entities/stock-tyres.model").StockTyres | import("../stock/entities/stock-wheels.model").StockWheels | import("../stock/entities/stock-batteries.model").StockBatteries | import("../stock/entities/stock-oils.model").StockOils>;
    findAll(): Promise<import("./entities/orders-supplier.model").OrdersSupplier[]>;
    findOne(getOrdersSupDto: GetOrdersSuppliersDto): Promise<import("./entities/orders-supplier.model").OrdersSupplier>;
    update(id: string, updateOrdersSupplierDto: UpdateOrdersSupplierDto): string;
    remove(getOrdersSupDto: GetOrdersSuppliersDto): Promise<number>;
}
