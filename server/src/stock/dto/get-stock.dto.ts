export class GetStockDto {

   readonly id: number;
   //readonly id_tyres: number;
   readonly id_wheel: number;
   readonly id_oil: number;
   readonly id_battery: number;
   readonly stock: number;
   readonly reserve: number;
   readonly remainder: number;
   readonly update_date: Date;

}
  