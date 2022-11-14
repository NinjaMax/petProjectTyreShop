export class GetPriceDto {

    readonly price_wholesale: number;
    readonly price: number;
    readonly delivery_price: number;
    readonly price_plus_delivery: number;
    readonly update_date: Date;

    readonly id: number;
    //readonly id_tyres: number;
    readonly id_wheel: number;
    readonly id_oil: number;
    readonly id_battery: number;
    readonly id_sup: number;
    readonly full_name: string;
    readonly name: string;
    
}