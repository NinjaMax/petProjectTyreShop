import { HttpException } from '@nestjs/common';
import { TyresService } from '../../tyres/tyres.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { TyreVehicleType } from '../entities/tyres/tyre-vehicleType.model';
export declare class PropsTyreVehicleTypeService {
    private tyreVehicleTypeRepository;
    private tyresService;
    constructor(tyreVehicleTypeRepository: typeof TyreVehicleType, tyresService: TyresService);
    createTyreVehicleType(createPropertyDto: CreatePropertyDto): Promise<TyreVehicleType | [affectedCount: number]>;
    createTyreVehicleTypeFromPrice(id: number, id_vehicle_type: number, vehicle_type: string, vehicle_type_ua: string): Promise<void>;
    findAllTyreVehicleType(): Promise<TyreVehicleType[]>;
    findTyreVehicleTypeById(getPropertyDto: GetPropertyDto): Promise<TyreVehicleType>;
    updateTyreVehicleType(updatePropertyDto: UpdatePropertyDto): Promise<[affectedCount: number] | HttpException>;
    removeTyreVehicleType(getPropertyDto: GetPropertyDto): Promise<number>;
}
