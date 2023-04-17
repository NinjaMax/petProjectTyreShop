import { HttpException } from '@nestjs/common';
import { TyresService } from '../../tyres/tyres.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { TyreSeason } from '../entities/tyres/tyre-season.model';
export declare class PropsTyreSeasonService {
    private tyreSeasonRepository;
    private tyresService;
    constructor(tyreSeasonRepository: typeof TyreSeason, tyresService: TyresService);
    createTyreSeason(createPropertyDto: CreatePropertyDto): Promise<TyreSeason | [affectedCount: number]>;
    createTyreSeasonFromPrice(id: number, id_season: number, season: string, season_ua: string): Promise<void>;
    findAllTyreSeason(): Promise<TyreSeason[]>;
    findTyreSeasonById(getPropertyDto: GetPropertyDto): Promise<TyreSeason>;
    updateTyreSeason(updatePropertyDto: UpdatePropertyDto): Promise<[affectedCount: number] | HttpException>;
    removeTyreCountry(getPropertyDto: GetPropertyDto): Promise<number>;
}
