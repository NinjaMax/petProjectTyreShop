import { PartialType } from '@nestjs/mapped-types';
import { CreateOilDto } from './create-oil.dto';

export class UpdateOilDto extends PartialType(CreateOilDto) {

    readonly id: number;
    readonly full_name: string;
    
}
