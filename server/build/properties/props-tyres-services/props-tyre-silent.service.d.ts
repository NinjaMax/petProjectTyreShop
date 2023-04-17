import { HttpException } from '@nestjs/common';
import { TyresService } from '../../tyres/tyres.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { TyreSilent } from '../entities/tyres/tyre-silent.model';
export declare class PropsTyreSilentService {
    private tyreSilentRepository;
    private tyresService;
    constructor(tyreSilentRepository: typeof TyreSilent, tyresService: TyresService);
    createTyreSilent(createPropertyDto: CreatePropertyDto): Promise<TyreSilent | [affectedCount: number]>;
    createTyreSilentFromPrice(id: number, silent: string): Promise<void>;
    findAllTyreCountry(): Promise<TyreSilent[]>;
    findTyreCountryById(getPropertyDto: GetPropertyDto): Promise<TyreSilent>;
    updateTyreCountry(updatePropertyDto: UpdatePropertyDto): Promise<[affectedCount: number] | HttpException>;
    removeTyreSilent(getPropertyDto: GetPropertyDto): Promise<number>;
}
