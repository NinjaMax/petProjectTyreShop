import { HttpException } from '@nestjs/common';
import { WheelsService } from '../../wheels/wheels.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { WheelWidth } from '../entities/wheels/wheel-width.model';
export declare class PropsWheelWidthService {
    private wheelWidthRepository;
    private wheelsService;
    constructor(wheelWidthRepository: typeof WheelWidth, wheelsService: WheelsService);
    createWheelWidth(createPropertyDto: CreatePropertyDto): Promise<WheelWidth | [affectedCount: number]>;
    createWheelWidthFromPrice(id: number, width: string): Promise<void>;
    findAllWheelWidth(): Promise<WheelWidth[]>;
    findWheelWidthById(getPropertyDto: GetPropertyDto): Promise<WheelWidth>;
    updateWheelWidth(updatePropertyDto: UpdatePropertyDto): Promise<[affectedCount: number] | HttpException>;
    removeWheelWidth(getPropertyDto: GetPropertyDto): Promise<number>;
}
