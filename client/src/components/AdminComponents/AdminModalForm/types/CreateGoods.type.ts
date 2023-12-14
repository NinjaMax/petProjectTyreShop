export type CreateGoods = {
    id?: number | string;
    full_name?: string;
    //category?: {category: {category:string}};
    category?: { category: string; };
    order_index?: number;
    //createGoodsToOrder(arg0: {}, id_order: number): void;
    id_supplier?: number;
    // storage_index?: {price: {id_storage?: number}};
    id_order_storage?: number;
    storage_index?: number;
    //id_supplier: number;
    quantity?: number;
    //quantity: number;
    //id: any;
    id_order: number;

    price?: {
        quantity: number;
        id_storage: number | string;
        id_supplier: number | string; 
        price: number;
    };
}