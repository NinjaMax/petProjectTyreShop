export class CreateStockDto {

   readonly id_tyres: number;
   readonly id_wheel: number;
   readonly id_oil: number;
   readonly id_battery: number;
   readonly id_sup: number;
   readonly stock: number;
   readonly update_date: Date;

   readonly full_name: string;
   readonly name: string;

   readonly city: string;
   readonly phone: bigint;
   readonly email: string;
    
}
