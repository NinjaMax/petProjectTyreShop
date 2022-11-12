export class CreateOrderDto {

    readonly id_order: number;
    readonly id: number;
    readonly id_goods: number;
    readonly id_cat: number;
    readonly id_stock: number;
    readonly goods: string;
    readonly price: number;
    readonly reserve: number;
    readonly quantity: number;
    readonly total: number;
    readonly notes: string;
    
    //readonly price_wholesale: number;
    readonly id_basket: number;
    //readonly delivery_price: number;
    //readonly price_plus_delivery: number;
    //readonly update_date: Date;
    readonly full_name: string;
    readonly id_sup: number;
    readonly id_tyres: number;
    readonly id_wheel: number;
    readonly id_oil: number;
    readonly id_battery: number;
    readonly stock: number;
    readonly remainder: number;
    readonly update_date: Date;

}
