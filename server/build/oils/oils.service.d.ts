import { CreateOilDto } from './dto/create-oil.dto';
import { GetOilDto } from './dto/get-oil.dto';
import { UpdateOilDto } from './dto/update-oil.dto';
import { Oil } from './entities/oil.model';
export declare class OilsService {
    private oilRepository;
    constructor(oilRepository: typeof Oil);
    createOil(createOilDto: CreateOilDto): Promise<Oil>;
    findAllOils(): Promise<Oil[]>;
    findOilById(getOilDto: GetOilDto): Promise<Oil>;
    update(id: number, updateOilDto: UpdateOilDto): string;
    removeOil(getOilDto: GetOilDto): Promise<number>;
}
