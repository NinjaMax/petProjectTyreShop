import { PartialType } from '@nestjs/mapped-types';
import { CreateTyreDto } from './create-tyre.dto';

export class UpdateTyreDto extends PartialType(CreateTyreDto) {

    //readonly id_tyres: number;
    readonly id: number;
    readonly full_name: string;
    readonly update_date: Date;
  
}
