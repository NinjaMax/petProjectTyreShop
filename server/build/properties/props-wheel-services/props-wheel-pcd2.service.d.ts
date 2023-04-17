import { HttpException } from '@nestjs/common';
import { WheelsService } from '../../wheels/wheels.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { WheelPcd2 } from '../entities/wheels/wheel-pcd2.model';
export declare class PropsWheelPcd2Service {
    private wheelPcd2Repository;
    private wheelsService;
    constructor(wheelPcd2Repository: typeof WheelPcd2, wheelsService: WheelsService);
    createWheelPcd2(createPropertyDto: CreatePropertyDto): Promise<WheelPcd2 | [affectedCount: number]>;
    createWheelPcd2FromPrice(id: number, pcd2: string): Promise<void>;
    findAllWheelPcd2(): Promise<WheelPcd2[]>;
    findWheelPcd2ById(getPropertyDto: GetPropertyDto): Promise<WheelPcd2>;
    updateWheelPcd2(updatePropertyDto: UpdatePropertyDto): Promise<[affectedCount: number] | HttpException>;
    removeWheelPcd2(getPropertyDto: GetPropertyDto): Promise<number>;
}
