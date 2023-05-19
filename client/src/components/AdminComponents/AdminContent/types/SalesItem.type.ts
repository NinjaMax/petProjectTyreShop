export type ISalesItem = {
    id_sales: number;
    id_order: number;
    createdAt: Date;
    updatedAt: Date;
    customer:{full_name: string;}
    storage: string;
    status: string;
    order_view: string;
    delivery: string;
    status_delivery: string;
    pay_view: string;
    status_pay: string;
    id_user: number;
    notes: string;
    total: number;
    quantity?: number;
    delivery_ttn: string;
    id_contract: number | string;
    id_customer: number;
    organisation: string;
    order_storage: any [];
    [Symbol.iterator](): any;
    comments: any[];
    reduce(arg0: any, ...arg: any[]): any;
    user:{name: string; role: string; id_user: number;}
}