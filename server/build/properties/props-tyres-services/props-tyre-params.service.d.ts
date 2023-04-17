import { HttpException } from '@nestjs/common';
import { TyresService } from '../../tyres/tyres.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { TyreParams } from '../entities/tyres/tyre-params.model';
export declare class PropsTyreParamsService {
    private tyreParamsRepository;
    private tyresService;
    constructor(tyreParamsRepository: typeof TyreParams, tyresService: TyresService);
    createTyreParams(createPropertyDto: CreatePropertyDto): Promise<TyreParams | [affectedCount: number]>;
    createParamsFromPrice(id: number, params: string): Promise<void>;
    findAllTyreParams(): Promise<TyreParams[]>;
    findTyreParamsById(getPropertyDto: GetPropertyDto): Promise<TyreParams>;
    updateTyreParams(updatePropertyDto: UpdatePropertyDto): Promise<[affectedCount: number] | HttpException>;
    removeTyreParams(getPropertyDto: GetPropertyDto): Promise<number>;
}
