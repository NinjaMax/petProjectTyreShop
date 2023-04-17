import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceTyresDto } from './dto/update-price_tyres.dto';
import { GetPriceDto } from './dto/get-price.dto';
import { PriceOil } from './entities/price-oils.model';
import { OilsService } from '../oils/oils.service';
import { StorageService } from '../storage/storage.service';
import { SuppliersService } from '../suppliers/suppliers.service';
export declare class PriceOilsService {
    private priceOilsRepository;
    private oilsService;
    private suppliersService;
    private storageService;
    constructor(priceOilsRepository: typeof PriceOil, oilsService: OilsService, suppliersService: SuppliersService, storageService: StorageService);
    createPriceOils(createPriceDto: CreatePriceDto): Promise<import("../oils/entities/oil.model").Oil>;
    findAll(): Promise<PriceOil[]>;
    findPriceOilsById(getPriceDto: GetPriceDto): Promise<PriceOil>;
    updatePriceOils(updatePriceDto: UpdatePriceTyresDto): Promise<PriceOil>;
    removePriceOils(getPriceDto: GetPriceDto): Promise<number>;
}
