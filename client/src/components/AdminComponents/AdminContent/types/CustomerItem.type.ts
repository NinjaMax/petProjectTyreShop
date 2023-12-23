export type ICustomerItem = {
    id_customer: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    full_name: string;
    city: string;
    delivery: string;
    phone: string;
    email: string;
    id_user: number;
    notes: string;
    address: string;
    basket: any | null;
    delivery_city_ref: string;
    delivery_dep: string;
    delivery_dep_ref: string;
    orders: any[];
    picture: string | null;
    reviews: any[];
    role: string;
    disableBtns: boolean;
    contract: [
        {
            id_contract: number,
            name: string,
            balance: number,
            bonus: number,
            id_customer: number
        }, ...{}[]];
    [Symbol.iterator](): any;
    comments: any[];
    reduce(arg0: any, ...arg: any[]): any;
    user:{name: string; role: string; id_user: number;}
}

