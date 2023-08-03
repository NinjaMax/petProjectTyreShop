export interface OrdersConfigAttr {
  id_order: number;
  id: number;
  id_storage: number;
  price: number;
  reserve: number;
  quantity: number;
  total: number;
  notes: string;
  status: string;
  delivery: string;
  status_delivery: string;
  delivery_ttn: string;
  pay_view: string;
  status_pay: string;
  delivery_cost: number;
  dop_garanty: number;
  commission_cost: number;
  bonus_decrease: number;
  total_cost: number;
  id_customer: number;
  id_contract: number;
  delivery_city: string;
  delivery_city_ref: string;
  delivery_city_depart: string;
  delivery_city_depart_ref: string;
}
