export class CreateStockDto {

   readonly id: number;
   // readonly id_tyres: number;
   // readonly id_wheel: number;
   // readonly id_oil: number;
   // readonly id_battery: number;
   readonly id_supplier: number;
   
   readonly stock: number;
   readonly reserve: number;
   readonly remainder: number;
   readonly update_date: Date;

   readonly full_name: string;
   readonly name: string;

   readonly id_storage: number;
   //readonly id_goods: number;
   //readonly goods: string;
   readonly quantity: number;
   readonly price: number;
   readonly storage: string;

   readonly city: string;
   readonly phone: bigint;
   readonly email: string;
    
}
