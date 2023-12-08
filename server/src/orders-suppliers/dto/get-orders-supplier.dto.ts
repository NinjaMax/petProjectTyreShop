export class GetOrdersSuppliersDto {
  readonly id_order_sup: number;
  readonly id_tyre: number;
  readonly id_wheel: number;
  readonly id_oil: number;
  readonly id_battery: number;
  readonly price: number;
  readonly price_wholesale: number;
  readonly notes: string;
  readonly total: number;

  readonly id_order: number;
  readonly id_basket: number;

  readonly reserve: number;
  readonly quantity: number;
  readonly id_order_sup_storage: number;
  readonly order_sup: number;
  readonly organisation: string;
  readonly order_view: string;
  readonly delivery: string;
  readonly status_delivery: string;
  readonly delivery_ttn: string;
  readonly pay_view: string;
  readonly status_pay: string;
  readonly category: string;
  readonly total_purchase_cost: number;
  readonly total_cost: number;
  readonly delivery_cost: number;
  readonly commission_cost: number;
}
