export type DataGoods = {
    id_order: number;
    delivery: string;
    delivery_ttn: string;
    id_contract: number | string;
    id_customer: number;
    notes: string;
    order_view: string;
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
    customer:{full_name: string;}
    [Symbol.iterator](): any;
    order_storage: any[];
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