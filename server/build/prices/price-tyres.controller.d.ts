import { PriceTyresService } from './price-tyres.service';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceTyresDto } from './dto/update-price_tyres.dto';
import { GetPriceDto } from './dto/get-price.dto';
export declare class PriceTyresController {
    private readonly pricesService;
    constructor(pricesService: PriceTyresService);
    create(createPriceDto: CreatePriceDto): Promise<import("../tyres/entities/tyres.model").Tyres>;
    findAll(): Promise<import("./entities/price-tyres.model").PriceTyres[]>;
    findPriceTyresById(getPriceDto: GetPriceDto): Promise<import("./entities/price-tyres.model").PriceTyres>;
    update(updatePriceDto: UpdatePriceTyresDto): Promise<import("./entities/price-tyres.model").PriceTyres>;
    remove(getPriceDto: GetPriceDto): Promise<number>;
}
