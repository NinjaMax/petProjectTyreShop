import { HttpException } from '@nestjs/common';
import { WheelsService } from '../../wheels/wheels.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { WheelSizeDigits } from '../entities/wheels/wheel-sizeDigits.model';
export declare class PropsWheelSizeDigitsService {
    private wheelSizeDigitsRepository;
    private wheelsService;
    constructor(wheelSizeDigitsRepository: typeof WheelSizeDigits, wheelsService: WheelsService);
    createWheelSizeDigits(createPropertyDto: CreatePropertyDto): Promise<WheelSizeDigits | [affectedCount: number]>;
    createWheelSizeDigitsFromPrice(id: number, size_only_digits: string): Promise<void>;
    findAllWheelSizeDigits(): Promise<WheelSizeDigits[]>;
    findWheelSizeDigitsById(getPropertyDto: GetPropertyDto): Promise<WheelSizeDigits>;
    updateWheelSizeDigits(updatePropertyDto: UpdatePropertyDto): Promise<[affectedCount: number] | HttpException>;
    removeWheelSizeDigits(getPropertyDto: GetPropertyDto): Promise<number>;
}
