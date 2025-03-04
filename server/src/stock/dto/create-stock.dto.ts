export class CreateStockDto {

   readonly id: number;
   readonly id_tyre: number;
   readonly id_wheel: number;
   readonly id_oil: number;
   readonly id_battery: number;
   readonly id_supplier: number;
   
   readonly stock: number;
   readonly reserve: number;
   readonly remainder: number;
   readonly update_date: Date;

   readonly full_name: string;
   readonly name: string;

   readonly id_storage: number;
   readonly id_order_sup: number;
   readonly notes: string;
   readonly total: number;
   readonly id_order: number;
   readonly id_basket: number; 
   readonly id_order_sup_storage: number;
   readonly order_sup: number;
   readonly id_contract: number;
   readonly balance: number; 
   readonly id_customer: number;
   //readonly id_goods: number;
   //readonly goods: string;
   readonly quantity: number;
   readonly price: number;
   readonly storage: string;

   readonly city: string;
   readonly phone: bigint;
   readonly email: string;
    
}
