import { CreateStockDto } from './dto/create-stock.dto';
import { GetStockDto } from './dto/get-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { SuppliersService } from '../suppliers/suppliers.service';
import { StockBatteries } from './entities/stock-batteries.model';
import { StorageService } from '../storage/storage.service';
import { BatteriesService } from '../batteries/batteries.service';
export declare class StockBatteriesService {
    private stockBatteriesRepository;
    private batteriesService;
    private suppliersService;
    private storageService;
    constructor(stockBatteriesRepository: typeof StockBatteries, batteriesService: BatteriesService, suppliersService: SuppliersService, storageService: StorageService);
    createStockBattery(createStockDto: CreateStockDto): Promise<import("../batteries/entities/battery.model").Battery>;
    findAllStock(): Promise<StockBatteries[]>;
    findStockBatteryByIdBattery(getStockDto: GetStockDto): Promise<StockBatteries>;
    findStockBatteryById(getStockDto: GetStockDto): Promise<StockBatteries>;
    findStockBatteryByIdForSale(id_battery: number): Promise<StockBatteries>;
    updateStockBattery(updateStockDto: UpdateStockDto): Promise<StockBatteries>;
    removeStockBattery(getStockDto: GetStockDto): Promise<number>;
}
