export interface IOrderSupContent {   
    props:[[] | null, ...[][] | null[]];
    showComment(arg0: any):void;
    customer?:{} | null;
    storage:[any] | null;
    comments?:[] | null;
    supplier?:[] | null;
    ordersSup:[] | null;
    stockByIdTyre?:[]; 
    tyreStockData?:[];
    tyrePriceData?:[];
    wheelData?:[]; 
    wheelPriceData?:[];
    wheelStockData?:[]; 
}