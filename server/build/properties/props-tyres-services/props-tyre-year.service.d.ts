import { HttpException } from '@nestjs/common';
import { TyresService } from '../../tyres/tyres.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { TyreYear } from '../entities/tyres/tyre-year.model';
export declare class PropsTyreYearService {
    private tyreYearRepository;
    private tyresService;
    constructor(tyreYearRepository: typeof TyreYear, tyresService: TyresService);
    createTyreYear(createPropertyDto: CreatePropertyDto): Promise<TyreYear | [affectedCount: number]>;
    createTyreYearFromPrice(id: number, manufacture_year: string): Promise<void>;
    findAllTyreYear(): Promise<TyreYear[]>;
    findTyreYearById(getPropertyDto: GetPropertyDto): Promise<TyreYear>;
    updateTyreYear(updatePropertyDto: UpdatePropertyDto): Promise<[affectedCount: number] | HttpException>;
    removeTyreYear(getPropertyDto: GetPropertyDto): Promise<number>;
}
