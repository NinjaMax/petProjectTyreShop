import { PartialType } from '@nestjs/mapped-types';
import { CreateSaleDto } from './create-sale.dto';

export class UpdateSaleDto extends PartialType(CreateSaleDto) {
    
    readonly id_sale: number;
    readonly id: number;
    readonly status: string;
    readonly quantity: number;
    readonly price: number;
    readonly total: number;
    readonly id_storage: number;
    readonly delivery: string;
    readonly id_sales_storage: number;

}
