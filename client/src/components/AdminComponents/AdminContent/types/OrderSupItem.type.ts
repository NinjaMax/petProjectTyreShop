export type IOrdersSupItem = {
    id_order_sup: number;
    createdAt: Date;
    updatedAt: Date;
    supplier:{
        id_supplier: number;
        name: string;
        city: string;
        phone: number;
        email: string;
        address: string;
        delivery: string;
        delivery_city_ref: string;
        delivery_dep: string;
        delivery_dep_ref: string;
    }
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
    id_supplier: number;
    organisation: string;
    order_storage: any [];
    total_purchase_cost: number;
    total_cost: number;
    delivery_cost: number;
    commission_cost: number;
    [Symbol.iterator](): any;
    comments: any[];
    reduce(arg0: any, ...arg: any[]): any;
    user:{name: string; role: string; id_user: number;}
}