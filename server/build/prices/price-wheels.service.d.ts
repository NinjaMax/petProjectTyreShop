import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceTyresDto } from './dto/update-price_tyres.dto';
import { GetPriceDto } from './dto/get-price.dto';
import { PriceWheels } from './entities/price-wheels.model';
import { StorageService } from '../storage/storage.service';
import { SuppliersService } from '../suppliers/suppliers.service';
import { WheelsService } from '../wheels/wheels.service';
export declare class PriceWheelsService {
    private priceWheelsRepository;
    private wheelsService;
    private suppliersService;
    private storageService;
    constructor(priceWheelsRepository: typeof PriceWheels, wheelsService: WheelsService, suppliersService: SuppliersService, storageService: StorageService);
    createPriceWheels(createPriceDto: CreatePriceDto): Promise<import("../wheels/entities/wheel.model").Wheel>;
    createPriceWheelsFromPrice(id: number, price_wholesale: number, price: number, delivery_price: number, price_plus_delivery: number, id_supplier: number, update_date: Date): Promise<PriceWheels>;
    findAllWheels(): Promise<PriceWheels[]>;
    findPriceWheelsById(getPriceDto: GetPriceDto): Promise<PriceWheels>;
    updatePriceWheels(updatePriceDto: UpdatePriceTyresDto): Promise<PriceWheels>;
    removePriceWheels(getPriceDto: GetPriceDto): Promise<number>;
}
