import { HttpException } from '@nestjs/common';
import { WheelsService } from '../../wheels/wheels.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { WheelDiameter } from '../entities/wheels/wheel-diameter.model';
export declare class PropsWheelDiameterService {
    private wheelDiameterRepository;
    private wheelsService;
    constructor(wheelDiameterRepository: typeof WheelDiameter, wheelsService: WheelsService);
    createWheelDiameter(createPropertyDto: CreatePropertyDto): Promise<WheelDiameter | [affectedCount: number]>;
    createWheelDiameterFromPrice(id: number, diameter: string): Promise<void>;
    findAllWheelDiameter(): Promise<WheelDiameter[]>;
    findWheelDiameterById(getPropertyDto: GetPropertyDto): Promise<WheelDiameter>;
    updateWheelDiameter(updatePropertyDto: UpdatePropertyDto): Promise<[affectedCount: number] | HttpException>;
    removeWheelDiameter(getPropertyDto: GetPropertyDto): Promise<number>;
}
