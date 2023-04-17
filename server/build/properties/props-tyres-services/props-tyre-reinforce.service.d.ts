import { HttpException } from '@nestjs/common';
import { TyresService } from '../../tyres/tyres.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { TyreReinforce } from '../entities/tyres/tyre-reinforce.model';
export declare class PropsTyreReinforceService {
    private tyreReinforceRepository;
    private tyresService;
    constructor(tyreReinforceRepository: typeof TyreReinforce, tyresService: TyresService);
    createTyreReinforce(createPropertyDto: CreatePropertyDto): Promise<TyreReinforce | [affectedCount: number]>;
    createTyreReinforceFromPrice(id: number, reinforce: string): Promise<void>;
    findAllTyreReinforce(): Promise<TyreReinforce[]>;
    findTyreReinforceById(getPropertyDto: GetPropertyDto): Promise<TyreReinforce>;
    updateTyreReinforce(updatePropertyDto: UpdatePropertyDto): Promise<[affectedCount: number] | HttpException>;
    removeTyreReinforce(getPropertyDto: GetPropertyDto): Promise<number>;
}
