export interface IRestAdminApi {
    id: string | number;
    full_name: string;
    category: { category: string; };
    price: { 
        id_supplier: string | number;
        id_storage: string | number;
        quantity: string | number;
        price: string | number; 
    }; 
    order_index: number;
    id_order: number;

    id_order_storage: number;
    //id: any;
    id_supplier:number;
    //order_index: any;
    storage_index: number;
    quantity: number;
    //price: any;

}