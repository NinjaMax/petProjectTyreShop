import { HttpException } from '@nestjs/common';
import { TyresService } from '../../tyres/tyres.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { TyreWidth } from '../entities/tyres/tyre-width.model';
export declare class PropsTyreWidthService {
    private tyreCountryRepository;
    private tyresService;
    constructor(tyreCountryRepository: typeof TyreWidth, tyresService: TyresService);
    createTyreWidth(createPropertyDto: CreatePropertyDto): Promise<TyreWidth | [affectedCount: number]>;
    createTyreWidthFromPrice(id: number, width: string): Promise<void>;
    findAllTyreWidth(): Promise<TyreWidth[]>;
    findTyreWidthById(getPropertyDto: GetPropertyDto): Promise<TyreWidth>;
    updateTyreWidth(updatePropertyDto: UpdatePropertyDto): Promise<[affectedCount: number] | HttpException>;
    removeTyreWidth(getPropertyDto: GetPropertyDto): Promise<number>;
}
