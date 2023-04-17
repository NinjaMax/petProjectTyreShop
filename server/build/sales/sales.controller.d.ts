import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { GetSaleDto } from './dto/get-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
export declare class SalesController {
    private readonly salesService;
    constructor(salesService: SalesService);
    createSale(createSaleDto: CreateSaleDto): Promise<import("./entities/sale.model").Sales>;
    addGoodsSale(createSaleDto: CreateSaleDto): Promise<import("./entities/sale.model").Sales | "ORDER DOESN'T EXIST">;
    findAll(): Promise<import("./entities/sale.model").Sales[]>;
    findOne(getSaleDto: GetSaleDto): Promise<import("./entities/sale.model").Sales>;
    update(id: string, updateSaleDto: UpdateSaleDto): string;
    remove(getSaleDto: GetSaleDto): Promise<number>;
}
