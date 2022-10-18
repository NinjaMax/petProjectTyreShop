import { PartialType } from '@nestjs/mapped-types';
import { CreateSupplierDto } from './create-supplier.dto';

export class UpdateSupplierDto extends PartialType(CreateSupplierDto) {

    readonly id_sup: number;
    readonly name: string;
    readonly city: string;
    readonly phone: bigint;
    readonly email: string;

}
