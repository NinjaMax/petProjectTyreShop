import { HttpException } from '@nestjs/common';
import { WheelsService } from '../../wheels/wheels.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { WheelBrand } from '../entities/wheels/wheel-brand.model';
export declare class PropsWheelBrandService {
    private wheelBrandRepository;
    private wheelsService;
    constructor(wheelBrandRepository: typeof WheelBrand, wheelsService: WheelsService);
    createWheelBrand(createPropertyDto: CreatePropertyDto): Promise<WheelBrand | [affectedCount: number]>;
    createWheelBrandFromPrice(id: number, brand: string): Promise<void>;
    findAllWheelBrand(): Promise<WheelBrand[]>;
    findWheelBrandById(getPropertyDto: GetPropertyDto): Promise<WheelBrand>;
    updateWheelBrand(updatePropertyDto: UpdatePropertyDto): Promise<[affectedCount: number] | HttpException>;
    removeWheelBrand(getPropertyDto: GetPropertyDto): Promise<number>;
}
