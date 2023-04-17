import { HttpException } from '@nestjs/common';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { TyreModel } from '../entities/tyres/tyre-model.model';
import { TyresService } from '../../tyres/tyres.service';
export declare class PropsModelService {
    private tyreModelRepository;
    private tyresService;
    constructor(tyreModelRepository: typeof TyreModel, tyresService: TyresService);
    createTyreModel(createPropertyDto: CreatePropertyDto): Promise<TyreModel>;
    createTyreModelFromPrice(id: number, id_model: number, model: string): Promise<void>;
    findAllTyreModel(): Promise<TyreModel[]>;
    findModelById(getPropertyDto: GetPropertyDto): Promise<TyreModel>;
    updateTyreModel(updatePropertyDto: UpdatePropertyDto): Promise<TyreModel | HttpException>;
    removeTyreModel(getPropertyDto: GetPropertyDto): Promise<number>;
}
