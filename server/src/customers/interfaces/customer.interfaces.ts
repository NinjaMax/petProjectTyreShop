export interface CustomerConfigAttr {
  id_customer: number;
  name: string;
  full_name: string;
  password: string;
  phone: bigint;
  email: string;
  id_contract: number;
  balance: number;
  address: string;
  delivery: string;
  picture: string;
  delivery_city_ref: string;
  delivery_dep: string;
  delivery_dep_ref: string;
}
