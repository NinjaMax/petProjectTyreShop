import { PartialType } from '@nestjs/mapped-types';
import { CreatePriceDto } from './create-price.dto';

export class UpdatePriceTyresDto extends PartialType(CreatePriceDto) {
  readonly id_tyre: number;
  readonly id_wheel: number;
  readonly id_oil: number;
  readonly id_battery: number;
  readonly price_wholesale: number;
  readonly price: number;
  readonly old_price: number;
  readonly delivery_price: number;
  readonly price_plus_delivery: number;
  readonly update_date: Date;
}
