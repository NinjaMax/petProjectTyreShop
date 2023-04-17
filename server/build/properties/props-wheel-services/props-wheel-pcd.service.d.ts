import { HttpException } from '@nestjs/common';
import { WheelsService } from '../../wheels/wheels.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { WheelPcd } from '../entities/wheels/wheel-pcd.model';
export declare class PropsWheelPcdService {
    private wheelPcdRepository;
    private wheelsService;
    constructor(wheelPcdRepository: typeof WheelPcd, wheelsService: WheelsService);
    createWheelPcd(createPropertyDto: CreatePropertyDto): Promise<WheelPcd | [affectedCount: number]>;
    createWheelPcdFromPrice(id: number, pcd: string): Promise<void>;
    findAllWheelPcd(): Promise<WheelPcd[]>;
    findWheelPcdById(getPropertyDto: GetPropertyDto): Promise<WheelPcd>;
    updateWheelPcd(updatePropertyDto: UpdatePropertyDto): Promise<[affectedCount: number] | HttpException>;
    removeWheelPcd(getPropertyDto: GetPropertyDto): Promise<number>;
}
