import { PartialType } from '@nestjs/mapped-types';
import { CreatePriceDto } from './create-price.dto';

export class UpdatePriceTyresDto extends PartialType(CreatePriceDto) {

    readonly price_wholesale: number;
    readonly price: number;
    readonly delivery_price: number;
    readonly price_plus_delivery: number;
    readonly update_date: Date;

}
