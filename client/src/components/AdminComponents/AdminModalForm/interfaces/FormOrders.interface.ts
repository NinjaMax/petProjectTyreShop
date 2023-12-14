import { DataGoods } from "../types/DataGoods.type";

export interface IFormOrder {
    props: [[] | null, ...any[][]] | [[] | null, ...null[]];
    goodsId?: {};
    comments?: [] | null;
    customer?: [] | null;
    supplier?:[] | null;
    setActive(arg0: any):void;
    storages: [any] | null;
    getOrdersData?: DataGoods | null;
    getOrdersSupData?: DataGoods | null;
    showComment(arg0: any):void;
}