export class CreatePriceTyresDto {

    readonly price_wholesale: number;
    readonly price: number;
    readonly delivery_price: number;
    readonly price_plus_delivery: string;
    readonly update_date: Date;

    readonly id_tyres: number;
    readonly id_sup: number;
    readonly full_name: string;
    readonly name: string;

}
