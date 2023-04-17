import { CreateStockDto } from './dto/create-stock.dto';
import { GetStockDto } from './dto/get-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { SuppliersService } from '../suppliers/suppliers.service';
import { StockOils } from './entities/stock-oils.model';
import { OilsService } from '../oils/oils.service';
import { StorageService } from '../storage/storage.service';
export declare class StockOilsService {
    private stockOilsRepository;
    private oilsService;
    private suppliersService;
    private storageService;
    constructor(stockOilsRepository: typeof StockOils, oilsService: OilsService, suppliersService: SuppliersService, storageService: StorageService);
    createStockOils(createStockDto: CreateStockDto): Promise<import("../oils/entities/oil.model").Oil>;
    findAllStock(): Promise<StockOils[]>;
    findStockOilByIdOil(getStockDto: GetStockDto): Promise<StockOils>;
    findStockOilById(getStockDto: GetStockDto): Promise<StockOils>;
    findStockOilByIdForSale(id_oil: number): Promise<StockOils>;
    updateStockOil(updateStockDto: UpdateStockDto): Promise<StockOils>;
    removeStockOil(getStockDto: GetStockDto): Promise<number>;
}
