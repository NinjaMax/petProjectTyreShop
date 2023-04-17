import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceTyresDto } from './dto/update-price_tyres.dto';
import { GetPriceDto } from './dto/get-price.dto';
import { PriceOilsService } from './price-oils.service';
export declare class PriceOilsController {
    private readonly priceOilsService;
    constructor(priceOilsService: PriceOilsService);
    create(createPriceDto: CreatePriceDto): Promise<import("../oils/entities/oil.model").Oil>;
    findAll(): Promise<import("./entities/price-oils.model").PriceOil[]>;
    findOne(getPriceDto: GetPriceDto): Promise<import("./entities/price-oils.model").PriceOil>;
    update(updatePriceDto: UpdatePriceTyresDto): Promise<import("./entities/price-oils.model").PriceOil>;
    remove(getPriceDto: GetPriceDto): Promise<number>;
}
