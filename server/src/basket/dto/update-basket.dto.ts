import { PartialType } from '@nestjs/mapped-types';
import { CreateBasketDto } from './create-basket.dto';

export class UpdateBasketDto extends PartialType(CreateBasketDto) {
  readonly price: number;
  readonly quantity: number;
  readonly total: number;
  readonly notes: string;
  readonly id_basket: number;
  readonly id_basket_storage: number;
  readonly id: number;
  readonly id_supplier: number;
  readonly id_storage: number;
  readonly full_name: string;
  readonly name: string;
  readonly city_ua: string;
  readonly phone: bigint;
  readonly email: string;
  readonly ratingCount: number;
  readonly reviewCount: number;
  readonly delivery: string;
  readonly season: string;
  readonly category: string;
  readonly id_cat: number;
  readonly address: string;
  readonly storage: string;
  readonly pay_view: string;
  readonly id_user: number;
  readonly id_customer: number;
  readonly session_id: string;
  readonly checkedIn: boolean;
  readonly city_delivery: string;
  readonly ref_city_delivery: string;
  readonly delivery_cost: number;
  readonly dop_garanty: number;
  readonly commission_cost: number;
  readonly bonus_decrease: number;
  readonly total_cost: number;
}
