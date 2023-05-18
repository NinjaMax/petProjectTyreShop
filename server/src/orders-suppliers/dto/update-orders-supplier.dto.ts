import { PartialType } from '@nestjs/mapped-types';
import { CreateOrdersSupplierDto } from './create-orders-supplier.dto';

export class UpdateOrdersSupplierDto extends PartialType(
  CreateOrdersSupplierDto,
) {
  readonly id_order_sup: number;
  readonly id_storage: number;
  readonly id_tyre: number;
  readonly id_wheel: number;
  readonly id_oil: number;
  readonly id_battery: number;
  readonly price: number;
  readonly notes: string;
  readonly total: number;

  readonly id_order: number;
  readonly id_basket: number;

  readonly reserve: number;
  readonly quantity: number;
  readonly storage: string;
  readonly price_wholesale: number;
  readonly order_sup_index: number;
  readonly storage_index: number;
  readonly organisation: string;
  readonly order_view: string;
  readonly delivery: string;
  readonly status_delivery: string;
  readonly delivery_ttn: string;
  readonly pay_view: string;
  readonly status_pay: string;
  readonly category: string;
  readonly id_supplier: number;
  readonly id_contract: number;
}
