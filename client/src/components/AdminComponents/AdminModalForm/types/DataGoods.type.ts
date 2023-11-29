export type DataGoods = {
    id_order?: number;
    id_order_sup?: number;
    delivery: string;
    delivery_cost?: number;
    dop_garanty?: number;
    total_cost?: number;
    commission_cost?: number;
    bonus_decrease?: number;
    disableBtns?: boolean;
    delivery_city: string;
    delivery_city_ref?: string;
    delivery_city_depart: string;
    delivery_city_depart_ref?: string;
    delivery_ttn: string;
    id_contract: number | string;
    id_customer: number;
    notes: string;
    order_view?: string;
    order_sup_view?: string;
    organisation: string;
    pay_view: string;
    status: string;
    status_delivery: string;
    status_pay: string;
    storage: string;
    createdAt: Date;
    updatedAt: Date;
    id_user: number;
    total: number;
    customer?:{
        full_name: string;
        name: string;
    }
    supplier?:{
        full_name: string;
        name: string;
    }
    [Symbol.iterator](): any;
    order_storage?: any[];
    order_sup_storage?: any[];
    comments: any[];
    reduce(arg0: any, ...arg: any[]): any;
    user:{name: string; role: string; id_user: number;}
    // id_order_storage: number;
    // id: number;
    // id_supplier: number;
    // order_index: number;
    // storage_index: number;
    // quantity: number;
    // price: number;
}