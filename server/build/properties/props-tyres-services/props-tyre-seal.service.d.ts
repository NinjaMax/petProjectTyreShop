import { HttpException } from '@nestjs/common';
import { TyresService } from '../../tyres/tyres.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { TyreSeal } from '../entities/tyres/tyre-seal.model';
export declare class PropsTyreSealService {
    private tyreSealRepository;
    private tyresService;
    constructor(tyreSealRepository: typeof TyreSeal, tyresService: TyresService);
    createTyreSeal(createPropertyDto: CreatePropertyDto): Promise<TyreSeal | [affectedCount: number]>;
    createTyreSealFromPrice(id: number, seal: string): Promise<void>;
    findAllTyreSeal(): Promise<TyreSeal[]>;
    findTyreSealById(getPropertyDto: GetPropertyDto): Promise<TyreSeal>;
    updateTyreSeal(updatePropertyDto: UpdatePropertyDto): Promise<[affectedCount: number] | HttpException>;
    removeTyreSeal(getPropertyDto: GetPropertyDto): Promise<number>;
}
