import { HttpException } from '@nestjs/common';
import { TyresService } from '../../tyres/tyres.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { TyreHeight } from '../entities/tyres/tyre-height.model';
export declare class PropsTyreHeightService {
    private tyreHeightRepository;
    private tyresService;
    constructor(tyreHeightRepository: typeof TyreHeight, tyresService: TyresService);
    createTyreHeight(createPropertyDto: CreatePropertyDto): Promise<TyreHeight | [affectedCount: number]>;
    createTyreHeightFromPrice(id: number, height: string): Promise<void>;
    findAllTyreHeight(): Promise<TyreHeight[]>;
    findTyreHeightById(getPropertyDto: GetPropertyDto): Promise<TyreHeight>;
    updateTyreHeight(updatePropertyDto: UpdatePropertyDto): Promise<[affectedCount: number] | HttpException>;
    removeTyreHeight(getPropertyDto: GetPropertyDto): Promise<number>;
}
