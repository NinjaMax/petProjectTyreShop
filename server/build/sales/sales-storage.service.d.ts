import { OrdersService } from '../orders/orders.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { GetSaleDto } from './dto/get-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { SaleStorage } from './entities/sales-storage.model';
export declare class SalesStorageService {
    private salesStorageRepository;
    private ordersService;
    constructor(salesStorageRepository: typeof SaleStorage, ordersService: OrdersService);
    createOrderSupStorage(createSaleDto: CreateSaleDto): Promise<SaleStorage>;
    createSalesStorageNew(id: number, id_order: number, id_supplier: number, quantity: number, price: number, sale_index: number, storage_index: number): Promise<SaleStorage>;
    findAllSalesStorage(): Promise<SaleStorage[]>;
    findAllSalesStorageByOrd(getSaleDto: GetSaleDto): Promise<SaleStorage[]>;
    findAllSaleStorageBySale(getSaleDto: GetSaleDto): Promise<SaleStorage[]>;
    findSaleStorageById(getSaleDto: GetSaleDto): Promise<SaleStorage>;
    updateOrderStorage(updateSaleDto: UpdateSaleDto): Promise<[affectedCount: number]>;
    removeOrderSupStorage(getSaleDto: GetSaleDto): Promise<number>;
}
