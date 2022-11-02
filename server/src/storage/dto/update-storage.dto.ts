import { PartialType } from '@nestjs/mapped-types';
import { CreateStorageDto } from './create-storage.dto';

export class UpdateStorageDto extends PartialType(CreateStorageDto) {

    readonly id_storage: number;
    readonly id_goods: number;
    readonly goods: string;
    readonly quantity: number;
    readonly price: number;
    readonly storage: string;
}
