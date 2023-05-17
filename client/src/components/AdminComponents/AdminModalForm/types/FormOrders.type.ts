export type IModalFormOrder = {
    full_name?: string;
    name?: string;
    contract: [{id_contract: number, name: string}];
    id_contract?: number,
    id_customer?: number;
    addCustomer?: {
        full_name: string,
        contract: [],
        id_customer: number
    };
    map(arg0: any, ...arg: any[]): any;
}
