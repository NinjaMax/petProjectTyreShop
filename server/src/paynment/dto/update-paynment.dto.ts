import { PartialType } from '@nestjs/mapped-types';
import { CreatePaynmentDto } from './create-paynment.dto';

export class UpdatePaynmentDto extends PartialType(CreatePaynmentDto) {

    readonly id_paynment: number;
    readonly coming: number;
    readonly rate: number;
    readonly price: number;
    readonly notes: string;
    readonly status: string;
    
}
