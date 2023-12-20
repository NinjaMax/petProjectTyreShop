import { ISupplierItem } from "../../adminContent/types/SupplierItem.type";

export type SupplierModalCreate = {
    active: boolean;
    setActive(arg0: any):void;
    dataSupplier?:ISupplierItem | null;
}