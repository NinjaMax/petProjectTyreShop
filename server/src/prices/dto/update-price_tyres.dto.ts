import { PartialType } from '@nestjs/mapped-types';
import { CreatePriceTyresDto } from './create-price_tyres.dto';

export class UpdatePriceTyresDto extends PartialType(CreatePriceTyresDto) {

    readonly price_wholesale: number;
    readonly price: number;
    readonly delivery_price: number;
    readonly price_plus_delivery: number;
    readonly update_date: Date;

}
