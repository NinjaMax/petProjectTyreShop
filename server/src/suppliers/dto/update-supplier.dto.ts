import { PartialType } from '@nestjs/mapped-types';
import { CreateSupplierDto } from './create-supplier.dto';

export class UpdateSupplierDto extends PartialType(CreateSupplierDto) {

    readonly id_supplier: number;
    readonly name: string;
    readonly city: string;
    readonly city_ua: string;
    readonly phone: bigint;
    readonly address: string;
    readonly email: string;
    readonly delivery: string[];
    readonly delivery_city_ref: string[];
    readonly delivery_dep: string[];
    readonly delivery_dep_ref: string[];

}
