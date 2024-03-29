export class GetOrdersDto {
  readonly id_order: number;
  readonly id: number;
  readonly id_tyre: number;
  readonly id_wheel: number;
  readonly id_oil: number;
  readonly id_battery: number;
  //readonly id_cat: number;
  //readonly goods: string;
  readonly price: number;
  readonly price_wholesale: number;
  readonly total: number;
  readonly quantity: number;
  readonly reserve: number;
  readonly notes: string;
  readonly mix_store: string;
  readonly status: string;
  //readonly price_wholesale: number;
  readonly id_basket: number;
  readonly id_order_storage: number;
  readonly storage_index: number;
  readonly order_index: number;
  readonly id_customer: number;
  readonly bonus: number;
  //readonly id_cat: number;
  //readonly delivery_price: number;
  //readonly price_plus_delivery: number;
  //readonly update_date: Date;

  readonly delivery_cost: number;
  readonly dop_garanty: number;
  readonly commission_cost: number;
  readonly bonus_decrease: number;
  readonly total_cost: number;
}
