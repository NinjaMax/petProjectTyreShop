import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { GetStockDto } from './dto/get-stock.dto';
import { StockBatteriesService } from './stock-batteries.service';
export declare class StockBatteriesController {
    private readonly stockBatteriesService;
    constructor(stockBatteriesService: StockBatteriesService);
    create(createStockDto: CreateStockDto): Promise<import("../batteries/entities/battery.model").Battery>;
    findAll(): Promise<import("./entities/stock-batteries.model").StockBatteries[]>;
    findOne(getStockDto: GetStockDto): Promise<import("./entities/stock-batteries.model").StockBatteries>;
    update(updateStockDto: UpdateStockDto): Promise<import("./entities/stock-batteries.model").StockBatteries>;
    remove(getStockDto: GetStockDto): Promise<number>;
}
