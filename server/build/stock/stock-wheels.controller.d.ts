import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { GetStockDto } from './dto/get-stock.dto';
import { StockWheelsService } from './stock-wheels.service';
export declare class StockWheelsController {
    private readonly stockWheelsService;
    constructor(stockWheelsService: StockWheelsService);
    createStockWheel(createStockDto: CreateStockDto): Promise<import("../wheels/entities/wheel.model").Wheel>;
    findAll(): Promise<import("./entities/stock-wheels.model").StockWheels[]>;
    findOne(getStockDto: GetStockDto): Promise<import("./entities/stock-wheels.model").StockWheels>;
    update(updateStockDto: UpdateStockDto): Promise<import("./entities/stock-wheels.model").StockWheels>;
    remove(getStockDto: GetStockDto): Promise<number>;
}
