import { HttpException } from '@nestjs/common';
import { TyresService } from '../../tyres/tyres.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { TyreCountry } from '../entities/tyres/tyre-country.model';
export declare class PropsTyreCountryService {
    private tyreCountryRepository;
    private tyresService;
    constructor(tyreCountryRepository: typeof TyreCountry, tyresService: TyresService);
    createTyreCountry(createPropertyDto: CreatePropertyDto): Promise<TyreCountry | [affectedCount: number]>;
    createTyreCountryFromPrice(id: number, country_manufacturer: string, country_manufacturer_ua: string): Promise<void>;
    findAllTyreCountry(): Promise<TyreCountry[]>;
    findTyreCountryById(getPropertyDto: GetPropertyDto): Promise<TyreCountry>;
    updateTyreCountry(updatePropertyDto: UpdatePropertyDto): Promise<[affectedCount: number] | HttpException>;
    removeTyreCountry(getPropertyDto: GetPropertyDto): Promise<number>;
}
