export interface OrdersSupConfigAttr {
  status: string;
  notes: string;
  delivery: string;
  id_order: number;

  id_supplier: number;
  id_contract: number;
  id_storage: number;
  storage_index: number;
  id_order_sup: number;
  order_sup_index: number;
  storage: string;
  quantity: number;
  organisation: string;
  order_view: string;
  status_delivery: string;
  delivery_ttn: string;
  pay_view: string;
  status_pay: string;
  category: string;
}
