export class CreateSaleDto {
  readonly id: number;
  readonly id_tyre: number;
  readonly id_wheel: number;
  readonly id_oil: number;
  readonly id_battery: number;
  readonly id_sale: number;
  readonly id_order: number;
  readonly status: string;
  readonly delivery: string;
  readonly quantity: number;
  readonly price: number;
  readonly total: number;
  readonly id_customer: number;
  readonly id_sales_storage: number;

  readonly notes: string;
  readonly id_basket: number;
  readonly id_order_storage: number;
  readonly storage_index: number;
  readonly order_index: number;
  readonly id_supplier: number;
  readonly stock: number;
  readonly reserve: number;
  readonly remainder: number;
  readonly update_date: Date;

  readonly id_contract: number;
  readonly name: string;
  readonly balance: number;
  readonly bonus: number;
  readonly bonus_decrease: number;
}
