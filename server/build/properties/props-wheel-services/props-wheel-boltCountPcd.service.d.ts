import { HttpException } from '@nestjs/common';
import { WheelsService } from '../../wheels/wheels.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { WheelBoltCountPcd } from '../entities/wheels/wheel-boltCountPcd.model';
export declare class PropsWheelBoltCountPcdService {
    private wheelBoltCountPcdRepository;
    private wheelsService;
    constructor(wheelBoltCountPcdRepository: typeof WheelBoltCountPcd, wheelsService: WheelsService);
    createWheelBoltCountPcd(createPropertyDto: CreatePropertyDto): Promise<WheelBoltCountPcd | [affectedCount: number]>;
    createWheelBoltCountPcdFromPrice(id: number, bolt_count_pcd: string): Promise<void>;
    findAllWheelBoltCountPcd(): Promise<WheelBoltCountPcd[]>;
    findWheelBoltCountPcdById(getPropertyDto: GetPropertyDto): Promise<WheelBoltCountPcd>;
    updateWheelBoltCountPcd(updatePropertyDto: UpdatePropertyDto): Promise<[affectedCount: number] | HttpException>;
    removeWheelBoltCountPcd(getPropertyDto: GetPropertyDto): Promise<number>;
}
