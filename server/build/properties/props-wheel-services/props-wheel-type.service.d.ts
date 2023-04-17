import { HttpException } from '@nestjs/common';
import { WheelsService } from '../../wheels/wheels.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { WheelType } from '../entities/wheels/wheel-type.model';
export declare class PropsWheelTypeService {
    private wheelTypeRepository;
    private wheelsService;
    constructor(wheelTypeRepository: typeof WheelType, wheelsService: WheelsService);
    createWheelType(createPropertyDto: CreatePropertyDto): Promise<WheelType | [affectedCount: number]>;
    createWheelTypeFromPrice(id: number, id_type: string, type: string): Promise<void>;
    findAllWheelType(): Promise<WheelType[]>;
    findWheelTypeById(getPropertyDto: GetPropertyDto): Promise<WheelType>;
    updateWheelType(updatePropertyDto: UpdatePropertyDto): Promise<[affectedCount: number] | HttpException>;
    removeWheelType(getPropertyDto: GetPropertyDto): Promise<number>;
}
