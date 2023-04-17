import { OilsService } from './oils.service';
import { CreateOilDto } from './dto/create-oil.dto';
import { GetOilDto } from './dto/get-oil.dto';
import { UpdateOilDto } from './dto/update-oil.dto';
export declare class OilsController {
    private readonly oilsService;
    constructor(oilsService: OilsService);
    create(createOilDto: CreateOilDto): Promise<import("./entities/oil.model").Oil>;
    findAll(): Promise<import("./entities/oil.model").Oil[]>;
    findOne(getOilDto: GetOilDto): Promise<import("./entities/oil.model").Oil>;
    update(id: string, updateOilDto: UpdateOilDto): string;
    remove(getOilDto: GetOilDto): Promise<number>;
}
