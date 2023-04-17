import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { GetStockDto } from './dto/get-stock.dto';
import { StockOilsService } from './stock-oils.service';
export declare class StockOilsController {
    private readonly stockOilsService;
    constructor(stockOilsService: StockOilsService);
    createStockOils(createStockDto: CreateStockDto): Promise<import("../oils/entities/oil.model").Oil>;
    findAllStock(): Promise<import("./entities/stock-oils.model").StockOils[]>;
    findStockOilById(getStockDto: GetStockDto): Promise<import("./entities/stock-oils.model").StockOils>;
    updateStockOil(updateStockDto: UpdateStockDto): Promise<import("./entities/stock-oils.model").StockOils>;
    removeStockOil(getStockDto: GetStockDto): Promise<number>;
}
