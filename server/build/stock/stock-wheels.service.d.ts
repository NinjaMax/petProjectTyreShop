import { CreateStockDto } from './dto/create-stock.dto';
import { GetStockDto } from './dto/get-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { SuppliersService } from '../suppliers/suppliers.service';
import { StockWheels } from './entities/stock-wheels.model';
import { StorageService } from '../storage/storage.service';
import { WheelsService } from '../wheels/wheels.service';
export declare class StockWheelsService {
    private stockWheelsRepository;
    private wheelsService;
    private suppliersService;
    private storageService;
    constructor(stockWheelsRepository: typeof StockWheels, wheelsService: WheelsService, suppliersService: SuppliersService, storageService: StorageService);
    createStockWheel(createStockDto: CreateStockDto): Promise<import("../wheels/entities/wheel.model").Wheel>;
    createStockWheelFromPrice(id: number, stock: number, id_supplier: number, update_date: Date): Promise<StockWheels>;
    findAllStock(): Promise<StockWheels[]>;
    findStockWheelByIdWheel(getStockDto: GetStockDto): Promise<StockWheels>;
    findStockWheelById(getStockDto: GetStockDto): Promise<StockWheels>;
    findStockWheelByIdForSale(id_wheel: number): Promise<StockWheels>;
    updateStockWheel(updateStockDto: UpdateStockDto): Promise<StockWheels>;
    removeStockWheel(getStockDto: GetStockDto): Promise<number>;
}
