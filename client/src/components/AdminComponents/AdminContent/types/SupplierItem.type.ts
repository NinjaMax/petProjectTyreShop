export type ISupplierItem = {
    id_supplier: number;
    createdAt: Date;
    updatedAt: Date;
    //customer:{full_name: string;}
    name: string;
    city: string;
    delivery: string;
    phone: string;
    email: string;
    id_user: number;
    notes: string;
    //balance: number;
    //id_contract: number | string;
    contract: [
        {
            id_contract: number,
            name: string,
            balance: number,
            id_supplier: number
        }, ...{}[]];
    [Symbol.iterator](): any;
    comments: any[];
    reduce(arg0: any, ...arg: any[]): any;
    user:{name: string; role: string; id_user: number;}
}