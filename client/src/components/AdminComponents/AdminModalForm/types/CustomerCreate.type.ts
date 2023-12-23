import { ICustomerItem } from "../../adminContent/types/CustomerItem.type";

export type CustomerCreate = {
    active: boolean;
    setActive(arg0: any): void;
    dataCustomer?: ICustomerItem | null | undefined;
    setAddCustomer?(arg0: any): void;
};