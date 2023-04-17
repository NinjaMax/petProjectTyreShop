import { CreateStockDto } from './dto/create-stock.dto';
import { GetStockDto } from './dto/get-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { StockTyres } from './entities/stock-tyres.model';
import { TyresService } from '../tyres/tyres.service';
import { SuppliersService } from '../suppliers/suppliers.service';
import { StorageService } from '../storage/storage.service';
export declare class StockTyresService {
    private stockTyresRepository;
    private tyresService;
    private suppliersService;
    private storageService;
    constructor(stockTyresRepository: typeof StockTyres, tyresService: TyresService, suppliersService: SuppliersService, storageService: StorageService);
    createStockTyre(createStockDto: CreateStockDto): Promise<import("../tyres/entities/tyres.model").Tyres>;
    createStockTyreFromPrice(id: number, stock: number, id_supplier: number, update_date: Date): Promise<StockTyres>;
    findAllStock(): Promise<StockTyres[]>;
    findStockTyreByIdtyre(getStockDto: GetStockDto): Promise<StockTyres>;
    findStockTyreById(getStockDto: GetStockDto): Promise<StockTyres>;
    findStockTyreParamId(id_tyre: number): Promise<StockTyres>;
    findStockTyreByIdForSale(id_tyre: number): Promise<StockTyres>;
    updateStockTyres(updateStockDto: UpdateStockDto): Promise<StockTyres>;
    removeStockTyre(getStockDto: GetStockDto): Promise<number>;
}
