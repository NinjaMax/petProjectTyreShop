import { HttpException } from '@nestjs/common';
import { WheelsService } from '../../wheels/wheels.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { WheelColor } from '../entities/wheels/wheel-color.model';
export declare class PropsWheelColorService {
    private wheelColorRepository;
    private wheelsService;
    constructor(wheelColorRepository: typeof WheelColor, wheelsService: WheelsService);
    createWheelColor(createPropertyDto: CreatePropertyDto): Promise<WheelColor | [affectedCount: number]>;
    createWheelColorFromPrice(id: number, id_color: string, color: string, color_short: string): Promise<void>;
    findAllWheelColor(): Promise<WheelColor[]>;
    findWheelColorById(getPropertyDto: GetPropertyDto): Promise<WheelColor>;
    updateWheelColor(updatePropertyDto: UpdatePropertyDto): Promise<[affectedCount: number] | HttpException>;
    removeWheelColor(getPropertyDto: GetPropertyDto): Promise<number>;
}
