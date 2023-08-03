export class CreateOrderDto {
  readonly id_order: number;
  readonly id: number;
  //readonly id_goods: number;
  //readonly id_cat: number;
  readonly id_stock: number;
  readonly id_supplier: number;
  readonly price: number;
  readonly reserve: number;
  readonly quantity: number;
  readonly total: number;
  readonly notes: string;
  readonly id_storage: number;
  readonly storage: string;
  readonly price_wholesale: number;
  readonly id_basket: number;
  readonly id_order_storage: number;
  readonly delivery_price: number;
  readonly price_plus_delivery: number;
  readonly update_date: Date;
  readonly full_name: string;
  readonly id_sup: number;
  readonly id_tyre: number;
  readonly id_wheel: number;
  readonly id_oil: number;
  readonly id_battery: number;
  readonly stock: number;
  readonly remainder: number;
  readonly name: string;
  readonly status: string;
  readonly storage_index: number;
  readonly order_index: number;
  readonly n: number;
  readonly id_user: number;
  readonly id_customer: number;
  readonly id_contract: number;
  readonly organisation: string;
  readonly order_view: string;
  readonly delivery: string;
  readonly status_delivery: string;
  readonly delivery_ttn: string;
  readonly pay_view: string;
  readonly status_pay: string;
  readonly category: string;

  readonly id_goods: number;
  readonly id_cat: number;
  readonly goods: string;

  readonly session_id: string;

  readonly id_basket_storage: number;

  readonly city_ua: string;
  readonly phone: bigint;
  readonly email: string;
  readonly ratingCount: number;
  readonly reviewCount: number;
  readonly season: string;
  readonly balance: number;
  readonly bonus: number;
  readonly address: string;

  readonly checkedIn: boolean;
  readonly city_delivery: string;
  readonly ref_city_delivery: string;

  readonly delivery_cost: number;
  readonly dop_garanty: number;
  readonly commission_cost: number;
  readonly bonus_decrease: number;
  readonly total_cost: number;
  readonly delivery_city: string;
  readonly delivery_city_ref: string;
  readonly delivery_city_depart: string;
  readonly delivery_city_depart_ref: string;
}
