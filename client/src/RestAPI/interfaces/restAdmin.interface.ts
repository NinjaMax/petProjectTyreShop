export interface IRestAdminApi {
    //itemGoods: {
    id?: string | number;
    full_name?: string;
    //category?: { category: string; }; 
    category?: any;
    price?: any;
    price_wholesale?: any; 
    order_index?: number;
    order_sup_index?: number;
    id_order: number;
    //createGoodsToOrder(arg0: any, id_order: number): void;
    id_order_storage?: number;
    id_order_sup_storage?: number;
    //id: any;
    id_supplier?:number;
    // order_index: number;
    storage_index?: number;
    quantity?: number;
    total?: number;
    id_storage?: string | number;
    stateData?: [];
    ref_diameter?: string;
    weight?: string;
    ref_weight?: string;
    // i: number;
    // length: number;
    //};

    // forEach(arg0: (itemGoods: {}) => Promise<void | any>): unknown;
    // push(arg0: { price: any; }): unknown;
    // splice(itemIndex: number, arg1: number): unknown;
    // map(arg0: any, ...arg: any[]): any;
}