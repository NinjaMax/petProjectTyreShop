import { HttpException } from '@nestjs/common';
import { TyresService } from '../../tyres/tyres.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { TyreBrand } from '../entities/tyres/tyre-brand.model';
export declare class PropsBrandService {
    private tyreBrandRepository;
    private tyresService;
    constructor(tyreBrandRepository: typeof TyreBrand, tyresService: TyresService);
    createTyreBrand(createPropertyDto: CreatePropertyDto): Promise<TyreBrand>;
    createTyreBrandFromPrice(id: number, id_brand: number, brand: string): Promise<void>;
    findAllTyreBrand(): Promise<TyreBrand[]>;
    findBrandById(getPropertyDto: GetPropertyDto): Promise<TyreBrand>;
    updateTyreBrand(updatePropertyDto: UpdatePropertyDto): Promise<TyreBrand | HttpException>;
    removeTyreBrand(getPropertyDto: GetPropertyDto): Promise<number>;
}
