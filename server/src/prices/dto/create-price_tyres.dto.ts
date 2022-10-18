export class CreatePriceTyresDto {

    readonly price_wholesale: number;
    readonly price: number;
    readonly delivery_price: number;
    readonly price_plus_delivery: number;
    readonly update_date: Date;

    readonly id_tyres: number;
    readonly id_sup: number;
    readonly full_name: string;
    readonly name: string;
    readonly city: string;
    readonly phone: bigint;
    readonly email: string;

}
