import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceTyresDto } from './dto/update-price_tyres.dto';
import { GetPriceDto } from './dto/get-price.dto';
import { PriceTyres } from './entities/price-tyres.model';
import { StorageService } from '../storage/storage.service';
import { SuppliersService } from '../suppliers/suppliers.service';
import { TyresService } from '../tyres/tyres.service';
export declare class PriceTyresService {
    private priceTyresRepository;
    private tyresService;
    private suppliersService;
    private storageService;
    constructor(priceTyresRepository: typeof PriceTyres, tyresService: TyresService, suppliersService: SuppliersService, storageService: StorageService);
    createPriceTyres(createPriceDto: CreatePriceDto): Promise<import("../tyres/entities/tyres.model").Tyres>;
    createPriceTyresFromPrice(id: number, price_wholesale: number, price: number, delivery_price: number, price_plus_delivery: number, id_supplier: number, update_date: Date): Promise<PriceTyres>;
    findAllTyres(): Promise<PriceTyres[]>;
    findPriceTyresById(getPriceDto: GetPriceDto): Promise<PriceTyres>;
    updatePriceTyres(updatePriceDto: UpdatePriceTyresDto): Promise<PriceTyres>;
    removePrice(getPriceDto: GetPriceDto): Promise<number>;
}
