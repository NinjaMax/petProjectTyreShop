export type IOrdersItem = {
    id_order: number;
    createdAt: Date;
    updatedAt: Date;
    customer:{
        id_customer: number;
        full_name: string;
        name: string;
    };
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
    total_cost: number;
    quantity?: number;
    delivery_ttn: string;
    delivery_city: string;
    delivery_city_depart: string;
    id_contract: number | string;
    id_customer: number;
    organisation: string;
    order_storage: any [];
    [Symbol.iterator](): any;
    comments: any[];
    reduce(arg0: any, ...arg: any[]): any;
    filter(arg0: any, ...arg: any[]): any;
    user:{name: string; role: string; id_user: number;}
}