import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceTyresDto } from './dto/update-price_tyres.dto';
import { GetPriceDto } from './dto/get-price.dto';
import { PriceBatteryService } from './price-batteries.service';
export declare class PriceBatteriesController {
    private readonly priceBatteriesService;
    constructor(priceBatteriesService: PriceBatteryService);
    create(createPriceDto: CreatePriceDto): Promise<import("../batteries/entities/battery.model").Battery>;
    findAll(): Promise<import("./entities/price-battery.model").PriceBatteries[]>;
    findOne(getPriceDto: GetPriceDto): Promise<import("./entities/price-battery.model").PriceBatteries>;
    update(updatePriceDto: UpdatePriceTyresDto): Promise<import("./entities/price-battery.model").PriceBatteries>;
    remove(getPriceDto: GetPriceDto): Promise<number>;
}
