import { HttpException } from '@nestjs/common';
import { TyresService } from '../../tyres/tyres.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { TyreSpeedIndex } from '../entities/tyres/tyre-speedIndex.model';
export declare class PropsTyreSpeedIndexService {
    private tyreSpeedIndexRepository;
    private tyresService;
    constructor(tyreSpeedIndexRepository: typeof TyreSpeedIndex, tyresService: TyresService);
    createTyreSpeedIndex(createPropertyDto: CreatePropertyDto): Promise<TyreSpeedIndex | [affectedCount: number]>;
    createTyreSpeedIndexFromPrice(id: number, speed_index: string, speed_index_with_desc: string): Promise<void>;
    findAllTyreSpeedIndex(): Promise<TyreSpeedIndex[]>;
    findTyreSpeedIndexById(getPropertyDto: GetPropertyDto): Promise<TyreSpeedIndex>;
    updateTyreSpeedIndex(updatePropertyDto: UpdatePropertyDto): Promise<[affectedCount: number] | HttpException>;
    removeTyreSpeedIndex(getPropertyDto: GetPropertyDto): Promise<number>;
}
