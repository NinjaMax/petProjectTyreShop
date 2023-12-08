export class CreateCommentDto {
  readonly id_comment: number;
  readonly comments: string;
  readonly id_user: number;
  readonly id_order: number;
  readonly id_order_sup: number;
  readonly id_sale: number;
  readonly id_order_storage: number;
  readonly id_goods: number;
  readonly id_cat: number;
  readonly goods: string;
  readonly price: number;
  readonly price_wholesale: number;
  readonly total: number;
  readonly quantity: number;
  readonly reserve: number;
  readonly notes: string;
  readonly status: string;
  readonly id_basket: number;

  readonly id_tyre: number;
  readonly id_wheel: number;
  readonly id_oil: number;
  readonly id_battery: number;
  readonly name: string;
  readonly full_name: string;
  readonly phone: bigint;
  readonly email: string;
  readonly storage_index: number;
  readonly order_index: number;
  readonly id: number;
  readonly id_order_sup_storage: number;
  readonly order_sup: number;
  readonly id_customer: number;
  readonly picture: string;
  readonly id_contract: number;
  readonly password: string;
  readonly balance: number;
  readonly bonus: number;
  readonly delivery_cost: number;
  readonly dop_garanty: number;
  readonly commission_cost: number;
  readonly bonus_decrease: number;
  readonly total_cost: number;

  readonly organisation: string;
  readonly order_view: string;
  readonly delivery: string;
  readonly status_delivery: string;
  readonly delivery_ttn: string;
  readonly pay_view: string;
  readonly status_pay: string;
  readonly category: string;
  readonly mix_store: string;
  readonly total_purchase_cost: number;
}
