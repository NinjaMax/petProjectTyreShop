import { HttpException } from '@nestjs/common';
import { WheelsService } from '../../wheels/wheels.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { WheelDia } from '../entities/wheels/wheel-dia.model';
export declare class PropsWheelDiaService {
    private wheelDiaRepository;
    private wheelsService;
    constructor(wheelDiaRepository: typeof WheelDia, wheelsService: WheelsService);
    createWheelBoltCount(createPropertyDto: CreatePropertyDto): Promise<WheelDia | [affectedCount: number]>;
    createWheelDiaFromPrice(id: number, dia: string): Promise<void>;
    findAllWheelDia(): Promise<WheelDia[]>;
    findWheelDiaById(getPropertyDto: GetPropertyDto): Promise<WheelDia>;
    updateWheelDia(updatePropertyDto: UpdatePropertyDto): Promise<[affectedCount: number] | HttpException>;
    removeWheelDia(getPropertyDto: GetPropertyDto): Promise<number>;
}
