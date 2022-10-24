import { PartialType } from '@nestjs/mapped-types';
import { CreatePropertyDto } from './create-property.dto';

export class UpdatePropertyDto extends PartialType(CreatePropertyDto) {

    readonly id: number;
    readonly width: string;
    readonly height: string;
    readonly diametr: string;
    readonly season: string;
    readonly brand: string;
    readonly model: string;
    readonly type: string;
    readonly stud: string;
    readonly xl: string;
    readonly country: string;
    readonly year: string;
    readonly om: string;
    readonly euromark: string;

    readonly id_tyres: number;
    readonly id_sup: number;
    readonly update_date: Date;
    readonly full_name: string;

}
