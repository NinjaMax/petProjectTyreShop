import { HttpException } from '@nestjs/common';
import { TyresService } from '../../tyres/tyres.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { TyreLoadIndex } from '../entities/tyres/tyre-loadIndex.model';
export declare class PropsTyreLoadIndexService {
    private tyreLoadIndexRepository;
    private tyresService;
    constructor(tyreLoadIndexRepository: typeof TyreLoadIndex, tyresService: TyresService);
    createTyreLoadIndex(createPropertyDto: CreatePropertyDto): Promise<TyreLoadIndex | [affectedCount: number]>;
    createLoadIndexFromPrice(id: number, load_index: string, load_index_with_desc: string): Promise<void>;
    findAllTyreLoadIndex(): Promise<TyreLoadIndex[]>;
    findTyreLoadIndexById(getPropertyDto: GetPropertyDto): Promise<TyreLoadIndex>;
    updateTyreLoadIndex(updatePropertyDto: UpdatePropertyDto): Promise<[affectedCount: number] | HttpException>;
    removeTyreLoadIndex(getPropertyDto: GetPropertyDto): Promise<number>;
}
