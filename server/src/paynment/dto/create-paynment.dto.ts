export class CreatePaynmentDto {
  readonly id_paynment: number;
  readonly type_paynment: string;
  readonly price: number;
  readonly price_wholesale: number;
  readonly notes: string;
  readonly status: string;
  readonly id_order_storage: number;
  readonly id_order: number;
  readonly id_order_sup: number;
  readonly id_goods: number;
  readonly id_cat: number;
  readonly id_expense: number;
  readonly id_income: number;
  readonly goods: string;
  readonly expense: string;
  readonly income: string;
  readonly total: number;
  readonly quantity: number;
  readonly reserve: number;
  readonly id_basket: number;
  readonly order_sup_index: number;
  readonly id_tyre: number;
  readonly id_wheel: number;
  readonly id_oil: number;
  readonly id_battery: number;
  readonly id_cashbox: number;
  readonly cashbox: string;
  readonly funds: number;
  readonly storage_index: number;
  readonly order_index: number;
  readonly id: number;
  readonly id_order_sup_storage: number;
  readonly order_sup: number;
  readonly id_contract: number;
  readonly name: string;
  readonly balance: number;
  readonly id_customer: number;
  readonly cashboxType: string;
  readonly organisation: string;
  readonly order_view: string;
  readonly delivery: string;
  readonly status_delivery: string;
  readonly delivery_ttn: string;
  readonly pay_view: string;
  readonly status_pay: string;
  readonly category: string;
  readonly bonus: number;
  readonly delivery_cost: number;
  readonly dop_garanty: number;
  readonly commission_cost: number;
  readonly bonus_decrease: number;
  readonly total_cost: number;
  readonly mix_store: string;
  readonly total_purchase_cost: number;
  readonly full_name: string;
}
