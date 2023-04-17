import { StockTyresService } from './stock-tyres.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { GetStockDto } from './dto/get-stock.dto';
export declare class StockTyresController {
    private readonly stockTyresService;
    constructor(stockTyresService: StockTyresService);
    createStockTyre(createStockDto: CreateStockDto): Promise<import("../tyres/entities/tyres.model").Tyres>;
    findAllStock(): Promise<import("./entities/stock-tyres.model").StockTyres[]>;
    findStockTyreById(getStockDto: GetStockDto): Promise<import("./entities/stock-tyres.model").StockTyres>;
    findStockTyreParamId(id: number): Promise<import("./entities/stock-tyres.model").StockTyres>;
    updateStockTyres(updateStockDto: UpdateStockDto): Promise<import("./entities/stock-tyres.model").StockTyres>;
    removeStockTyre(getStockDto: GetStockDto): Promise<number>;
}
