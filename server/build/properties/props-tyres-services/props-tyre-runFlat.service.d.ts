import { HttpException } from '@nestjs/common';
import { TyresService } from '../../tyres/tyres.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { TyreRunFlat } from '../entities/tyres/tyre-runFlat.model';
export declare class PropsTyreRunFlatService {
    private tyreRunFlatRepository;
    private tyresService;
    constructor(tyreRunFlatRepository: typeof TyreRunFlat, tyresService: TyresService);
    createTyreRunFlat(createPropertyDto: CreatePropertyDto): Promise<TyreRunFlat | [affectedCount: number]>;
    createTyreRunFlatFromPrice(id: number, run_flat: string): Promise<void>;
    findAllTyreRunFlat(): Promise<TyreRunFlat[]>;
    findTyreRunFlatById(getPropertyDto: GetPropertyDto): Promise<TyreRunFlat>;
    updateTyreRunFlat(updatePropertyDto: UpdatePropertyDto): Promise<[affectedCount: number] | HttpException>;
    removeTyreRunFlat(getPropertyDto: GetPropertyDto): Promise<number>;
}
