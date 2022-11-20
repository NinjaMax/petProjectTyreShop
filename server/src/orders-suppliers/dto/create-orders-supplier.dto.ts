export class CreateOrdersSupplierDto {

    readonly id_goods: number;
    readonly id_cat: number;
    readonly goods: string;
    readonly price: number;
    readonly notes: string;
    readonly total: number;

    readonly id_order: number;
    readonly id_basket: number;
    readonly id_order_storage: number;
    
    readonly reserve: number;
    readonly quantity: number;
    

}
