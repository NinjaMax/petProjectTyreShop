import { HttpException } from '@nestjs/common';
import { TyresService } from '../../tyres/tyres.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { TyreHomologation } from '../entities/tyres/tyre-homologation.model';
export declare class PropsTyreHomologationService {
    private tyreHomologationRepository;
    private tyresService;
    constructor(tyreHomologationRepository: typeof TyreHomologation, tyresService: TyresService);
    createTyreHomologation(createPropertyDto: CreatePropertyDto): Promise<TyreHomologation | [affectedCount: number]>;
    createTyreHomologationFromPrice(id: number, homologation: string): Promise<void>;
    findAllTyreHomologation(): Promise<TyreHomologation[]>;
    findTyreHomologationById(getPropertyDto: GetPropertyDto): Promise<TyreHomologation>;
    updateTyreHomologation(updatePropertyDto: UpdatePropertyDto): Promise<[affectedCount: number] | HttpException>;
    removeTyreHomologation(getPropertyDto: GetPropertyDto): Promise<number>;
}
