export class GetOrdersSuppliersDto {

    readonly id_order_sup: number;
    readonly id_goods: number;
    readonly id_cat: number;
    readonly goods: string;
    readonly price: number;
    readonly count: number;
    readonly notes: string;
    readonly total: number;

}