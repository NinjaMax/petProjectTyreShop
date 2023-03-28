export interface IRestAdminApi {
    //itemGoods: {
    id?: string | number;
    full_name?: string;
    category?: { category: string; };
    price?: { 
        id_supplier: string | number;
        id_storage: string | number;
        quantity: number;
        price: number; 
    }; 
    order_index?: number;
    //id_order: number;
    //createGoodsToOrder(arg0: {}, id_order: number): void;
    id_order_storage?: number;
    //id: any;
    id_supplier?:number;
    //order_index: any;
    storage_index?: number;
    quantity?: number;
    //price: any;
    stateData?: [];
    i: number
    //};
}