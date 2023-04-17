import { CreateTyreDto } from './dto/create-tyre.dto';
import { GetTyreDto } from './dto/get-tyre.dto';
import { UpdateTyreDto } from './dto/update-tyre.dto';
import { Tyres } from './entities/tyres.model';
export declare class TyresService {
    private tyresRepository;
    constructor(tyresRepository: typeof Tyres);
    createTyres(createTyreDto: CreateTyreDto): Promise<Tyres>;
    createTyresFromPrice(id: number, full_name: string, photo_url: string, update_date: Date): Promise<Tyres>;
    findAllTyres(): Promise<Tyres[]>;
    findTyresById(getTyreDto: GetTyreDto): Promise<Tyres>;
    findTyresByIdPrice(id: number): Promise<Tyres>;
    updateTyres(updateTyreDto: UpdateTyreDto): Promise<Tyres>;
    remove(getTyreDto: GetTyreDto): Promise<number>;
}
