export type IModalFormOrder = {
    full_name?: string;
    name?: string;
    contract: [{id_contract: number, name: string, bonus: number, balance: number}];
    id_contract?: number;
    id_customer?: number;
    id_supplier?: number;
    address: string;
    delivery: string | null,
    delivery_city_ref: string | null,
    delivery_dep: string | null,
    delivery_dep_ref: string| null,
    email: null
    phone: number |null,
    addCustomer?: {
        name: string;
        city: string;
        full_name: string,
        contract: [],
        id_customer: number,
        address: string,
        delivery: string | null,
        delivery_city_ref: string | null,
        delivery_dep: string | null,
        delivery_dep_ref: string| null,
        email: null
        id_supplier: string | null,
        phone: number |null,
    };
    map(arg0: any, ...arg: any[]): any;
}
