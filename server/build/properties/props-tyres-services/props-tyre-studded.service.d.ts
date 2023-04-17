import { HttpException } from '@nestjs/common';
import { TyresService } from '../../tyres/tyres.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { TyreStudded } from '../entities/tyres/tyre-studded.model';
export declare class PropsTyreStuddedService {
    private tyreStuddedRepository;
    private tyresService;
    constructor(tyreStuddedRepository: typeof TyreStudded, tyresService: TyresService);
    createTyreStudded(createPropertyDto: CreatePropertyDto): Promise<TyreStudded | [affectedCount: number]>;
    createTyreStuddedFromPrice(id: number, studded: string): Promise<void>;
    findAllTyreStudded(): Promise<TyreStudded[]>;
    findTyreStuddedById(getPropertyDto: GetPropertyDto): Promise<TyreStudded>;
    updateTyreStudded(updatePropertyDto: UpdatePropertyDto): Promise<[affectedCount: number] | HttpException>;
    removeTyreStudded(getPropertyDto: GetPropertyDto): Promise<number>;
}
