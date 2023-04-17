import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceTyresDto } from './dto/update-price_tyres.dto';
import { GetPriceDto } from './dto/get-price.dto';
import { PriceBatteries } from './entities/price-battery.model';
import { BatteriesService } from '../batteries/batteries.service';
import { StorageService } from '../storage/storage.service';
import { SuppliersService } from '../suppliers/suppliers.service';
export declare class PriceBatteryService {
    private priceBatteryRepository;
    private batteriesService;
    private suppliersService;
    private storageService;
    constructor(priceBatteryRepository: typeof PriceBatteries, batteriesService: BatteriesService, suppliersService: SuppliersService, storageService: StorageService);
    createPriceBatteries(createPriceDto: CreatePriceDto): Promise<import("../batteries/entities/battery.model").Battery>;
    findAll(): Promise<PriceBatteries[]>;
    findPriceBatteriesById(getPriceDto: GetPriceDto): Promise<PriceBatteries>;
    updatePriceBattery(updatePriceDto: UpdatePriceTyresDto): Promise<PriceBatteries>;
    removePriceBattery(getPriceDto: GetPriceDto): Promise<number>;
}
