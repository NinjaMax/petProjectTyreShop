export class GetOrdersSuppliersDto {

    readonly id_order_sup: number;
    readonly id_goods: number;
    readonly id_cat: number;
    readonly goods: string;
    readonly price: number;
    readonly notes: string;
    readonly total: number;

    readonly id_order: number;
    readonly id_basket: number;
    
    readonly reserve: number;
    readonly quantity: number;
    readonly id_order_sup_storage: number;
    readonly order_sup: number; 

}