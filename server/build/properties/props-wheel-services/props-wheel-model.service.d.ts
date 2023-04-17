import { HttpException } from '@nestjs/common';
import { WheelsService } from '../../wheels/wheels.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { WheelModel } from '../entities/wheels/wheel-model.model';
export declare class PropsWheelModelService {
    private wheelModelRepository;
    private wheelsService;
    constructor(wheelModelRepository: typeof WheelModel, wheelsService: WheelsService);
    createWheelModel(createPropertyDto: CreatePropertyDto): Promise<WheelModel | [affectedCount: number]>;
    createWheelModelFromPrice(id: number, id_model: number, model: string): Promise<void>;
    findAllWheelModel(): Promise<WheelModel[]>;
    findWheelModelById(getPropertyDto: GetPropertyDto): Promise<WheelModel>;
    updateWheelModel(updatePropertyDto: UpdatePropertyDto): Promise<[affectedCount: number] | HttpException>;
    removeWheelModel(getPropertyDto: GetPropertyDto): Promise<number>;
}
