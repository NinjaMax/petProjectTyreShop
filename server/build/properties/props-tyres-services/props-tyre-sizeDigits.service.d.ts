import { HttpException } from '@nestjs/common';
import { TyresService } from '../../tyres/tyres.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { TyreSizeDigits } from '../entities/tyres/tyre-sizeDigits.model';
export declare class PropsTyreSizeDigitsService {
    private tyreCountryRepository;
    private tyresService;
    constructor(tyreCountryRepository: typeof TyreSizeDigits, tyresService: TyresService);
    createTyreSizeDigits(createPropertyDto: CreatePropertyDto): Promise<TyreSizeDigits | [affectedCount: number]>;
    createTyreSizeDigitsFromPrice(id: number, size_only_digits: string): Promise<void>;
    findAllTyreSizeDigits(): Promise<TyreSizeDigits[]>;
    findTyreSizeDigitsyById(getPropertyDto: GetPropertyDto): Promise<TyreSizeDigits>;
    updateTyreSizeDigits(updatePropertyDto: UpdatePropertyDto): Promise<[affectedCount: number] | HttpException>;
    removeTyreSizeDigits(getPropertyDto: GetPropertyDto): Promise<number>;
}
