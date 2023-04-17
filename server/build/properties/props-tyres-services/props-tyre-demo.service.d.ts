import { HttpException } from '@nestjs/common';
import { TyresService } from '../../tyres/tyres.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { GetPropertyDto } from '../dto/get-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';
import { TyreDemo } from '../entities/tyres/tyre-demo.model';
export declare class PropsTyreDemoService {
    private tyreDemoRepository;
    private tyresService;
    constructor(tyreDemoRepository: typeof TyreDemo, tyresService: TyresService);
    createTyreDemo(createPropertyDto: CreatePropertyDto): Promise<TyreDemo | [affectedCount: number]>;
    createTyreDemoFromPrice(id: number, demo: string): Promise<void>;
    findAllTyreDemo(): Promise<TyreDemo[]>;
    findTyreDemoById(getPropertyDto: GetPropertyDto): Promise<TyreDemo>;
    updateTyreDemo(updatePropertyDto: UpdatePropertyDto): Promise<[affectedCount: number] | HttpException>;
    removeTyreDemo(getPropertyDto: GetPropertyDto): Promise<number>;
}
