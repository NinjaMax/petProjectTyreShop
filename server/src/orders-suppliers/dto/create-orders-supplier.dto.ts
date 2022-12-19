export class CreateOrdersSupplierDto {

    readonly id_customer: number;
    readonly id_contract: number;
    //readonly goods: string;
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
    readonly id_order_sup_storage: number;
    readonly id_order_sup: number;
    readonly order_sup_index: number; 
    readonly order_sup: number;  
    readonly name: string; 
    readonly balance: number;  
}
