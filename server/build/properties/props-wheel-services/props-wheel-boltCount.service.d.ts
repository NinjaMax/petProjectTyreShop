import { HttpException } from '@nestjs/common';
import { WheelsService } from '../../wheels/wheels.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { WheelBoltCount } from '../entities/wheels/wheel-boltCount.model';
export declare class PropsWheelBoltCountService {
    private wheelBoltCountRepository;
    private wheelsService;
    constructor(wheelBoltCountRepository: typeof WheelBoltCount, wheelsService: WheelsService);
    createWheelBoltCount(createPropertyDto: CreatePropertyDto): Promise<WheelBoltCount | [affectedCount: number]>;
    createWheelBoltCountFromPrice(id: number, bolt_count: string): Promise<void>;
    findAllWheelBoltCount(): Promise<WheelBoltCount[]>;
    findWheelBoltCountById(getPropertyDto: GetPropertyDto): Promise<WheelBoltCount>;
    updateWheelBoltCount(updatePropertyDto: UpdatePropertyDto): Promise<[affectedCount: number] | HttpException>;
    removeWheelBoltCount(getPropertyDto: GetPropertyDto): Promise<number>;
}
