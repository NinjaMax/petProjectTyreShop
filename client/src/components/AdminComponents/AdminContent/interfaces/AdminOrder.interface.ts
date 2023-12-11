export interface IAdminOrder {
    comments?:[] | null;
    props:[[] | null, ...any[][] | null[]];
    showComment(arg0: any):void;
    orders: [] | null;
    customer: [] | null;
    suppliers?: [] | null;
    storage:[any] | null;
    stockByIdTyre?: []; 
    tyreStockData?:[];
    tyrePriceData?:[];
    wheelData?:[]; 
    wheelPriceData?:[];
    wheelStockData?:[];
}