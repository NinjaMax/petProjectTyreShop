export class GetSaleDto {
  readonly id_sale: number;
  readonly id: number;
  readonly id_tyre: number;
  readonly id_wheel: number;
  readonly id_oil: number;
  readonly id_battery: number;
  readonly delivery: string;
  readonly status: string;
  readonly quantity: number;
  readonly price: number;
  readonly total: number;
  //readonly storage: number;
  readonly id_order: number;
  readonly id_sales_storage: number;
  readonly bonus: number;
  readonly delivery_cost: number;
  readonly dop_garanty: number;
  readonly commission_cost: number;
  readonly bonus_decrease: number;
  readonly total_cost: number;
}
