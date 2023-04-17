import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceTyresDto } from './dto/update-price_tyres.dto';
import { GetPriceDto } from './dto/get-price.dto';
import { PriceWheelsService } from './price-wheels.service';
export declare class PriceWheelsController {
    private readonly priceWheelsService;
    constructor(priceWheelsService: PriceWheelsService);
    create(createPriceDto: CreatePriceDto): Promise<import("../wheels/entities/wheel.model").Wheel>;
    findAllWheels(): Promise<import("./entities/price-wheels.model").PriceWheels[]>;
    findPriceWheelsById(getPriceDto: GetPriceDto): Promise<import("./entities/price-wheels.model").PriceWheels>;
    update(updatePriceDto: UpdatePriceTyresDto): Promise<import("./entities/price-wheels.model").PriceWheels>;
    remove(getPriceDto: GetPriceDto): Promise<number>;
}
