export type IPaymentItem = {
    id_paynment: number;
    price: number;
    notes: string;
    status: string;
    id_cashbox?: number;
    id_order?: number;
    id_order_sup?: number;
    id_contract?: number;
    id_income?: number;
    id_expense?: number;
    expenses?: {   
        id_expense: number;
        expense: string;
        // price: number;
        // notes: string;
        // status: string;
    };
    cashbox: {
        id_cashbox: number;
        cashbox: string;
        //funds: number;
    };
    paytype?: {
        id_paytype: number;
        paytype: string;
        //funds: number;
    };
    order?: {};
    order_sup?: {};
    incomes?: {
        id_income: number;
        income: string;
        // price: number;
        // notes: string;
        // status: string;
    };
    contract: {};
    createdAt: Date;
    updatedAt: Date;
    [Symbol.iterator](): any;
    comments: any[];
    reduce(arg0: any, ...arg: any[]): any;
    user:{name: string; role: string; id_user: number;}
}