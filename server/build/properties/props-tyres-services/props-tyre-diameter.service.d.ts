import { HttpException } from '@nestjs/common';
import { TyresService } from '../../tyres/tyres.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { TyreDiameter } from '../entities/tyres/tyre-diameter.model';
export declare class PropsTyrDiametrService {
    private tyreDiameterRepository;
    private tyresService;
    constructor(tyreDiameterRepository: typeof TyreDiameter, tyresService: TyresService);
    createTyreDiameter(createPropertyDto: CreatePropertyDto): Promise<TyreDiameter | [affectedCount: number]>;
    createTyreDiameterFromPrice(id: number, diameter: string): Promise<void>;
    findAllTyreDiameter(): Promise<TyreDiameter[]>;
    findTyreDiameterById(getPropertyDto: GetPropertyDto): Promise<TyreDiameter>;
    updateTyreDiameter(updatePropertyDto: UpdatePropertyDto): Promise<[affectedCount: number] | HttpException>;
    removeTyreDiameter(getPropertyDto: GetPropertyDto): Promise<number>;
}
