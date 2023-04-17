import { TyresService } from './tyres.service';
import { CreateTyreDto } from './dto/create-tyre.dto';
import { UpdateTyreDto } from './dto/update-tyre.dto';
import { GetTyreDto } from './dto/get-tyre.dto';
export declare class TyresController {
    private readonly tyresService;
    constructor(tyresService: TyresService);
    createTyres(createTyreDto: CreateTyreDto): Promise<import("./entities/tyres.model").Tyres>;
    findAllTyres(): Promise<import("./entities/tyres.model").Tyres[]>;
    findTyresById(getTyreDto: GetTyreDto): Promise<import("./entities/tyres.model").Tyres>;
    updateTyres(updateTyreDto: UpdateTyreDto): Promise<import("./entities/tyres.model").Tyres>;
    remove(getTyreDto: GetTyreDto): Promise<number>;
}
