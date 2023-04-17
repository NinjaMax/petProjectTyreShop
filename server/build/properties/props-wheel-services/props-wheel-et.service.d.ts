import { HttpException } from '@nestjs/common';
import { WheelsService } from '../../wheels/wheels.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { WheelEt } from '../entities/wheels/wheel-et.model';
export declare class PropsWheelEtService {
    private wheelEtRepository;
    private wheelsService;
    constructor(wheelEtRepository: typeof WheelEt, wheelsService: WheelsService);
    createWheelEt(createPropertyDto: CreatePropertyDto): Promise<WheelEt | [affectedCount: number]>;
    createWheelEtFromPrice(id: number, et: string): Promise<void>;
    findAllWheelEt(): Promise<WheelEt[]>;
    findWheelEtById(getPropertyDto: GetPropertyDto): Promise<WheelEt>;
    updateWheelEt(updatePropertyDto: UpdatePropertyDto): Promise<[affectedCount: number] | HttpException>;
    removeWheelEt(getPropertyDto: GetPropertyDto): Promise<number>;
}
