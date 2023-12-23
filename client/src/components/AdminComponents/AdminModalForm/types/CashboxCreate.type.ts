    export type CashboxCreate = {
        active: boolean;
        setActive(arg0: any): void;
        dataCashbox?: {
            id_cashbox: number;
            cashbox: string;
            organisation: string;
            cashboxType: string;
            funds: string;
            disableBtns: boolean;
        } | null;
        setAddCashbox?(arg0: any): void;
    };
    