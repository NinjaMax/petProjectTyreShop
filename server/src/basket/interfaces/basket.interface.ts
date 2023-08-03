export interface BasketConfigAttr {
  id_basket: number;
  id_basket_storages: number;
  name: string;
  phone: bigint;
  email: string;
  address: string;
  notes: string;
  storage: string;
  delivery: string;
  pay_view: string;
  session_id: string;
  checkedIn: boolean;
  id_customer: number;
  delivery_cost: number;
  dop_garanty: number;
  commission_cost: number;
  bonus_decrease: number;
  total_cost: number;
}
