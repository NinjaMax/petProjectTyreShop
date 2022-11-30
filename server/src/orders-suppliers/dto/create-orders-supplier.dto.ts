export class CreateOrdersSupplierDto {

    readonly id_goods: number;
    readonly id_cat: number;
    readonly goods: string;
    readonly price: number;
    readonly notes: string;
    readonly total: number;
    readonly id: number;
    readonly id_order: number;
    readonly id_basket: number;
    readonly id_order_storage: number;
    readonly status: string;
    readonly reserve: number;
    readonly quantity: number;
    readonly order_index: number;
    readonly storage_index: number;
    
}
