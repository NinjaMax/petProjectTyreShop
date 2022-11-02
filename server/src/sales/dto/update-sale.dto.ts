import { PartialType } from '@nestjs/mapped-types';
import { CreateSaleDto } from './create-sale.dto';

export class UpdateSaleDto extends PartialType(CreateSaleDto) {
    
    readonly id_sale: number;
    readonly id_goods: number;
    readonly goods: string;
    readonly quantity: number;
    readonly price: number;
    readonly total: number;
    readonly storage: string;

}
