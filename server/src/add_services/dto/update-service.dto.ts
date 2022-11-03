import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceDto } from './create-service.dto';

export class UpdateServiceDto extends PartialType(CreateServiceDto) {

    readonly id_service: string;
    readonly service: string;
    readonly price: number;
    readonly notes: string;
    
}
