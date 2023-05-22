export interface IGoodsContent {
    props:[[] | null, ...[][] | null[]];
    comments?:[] | null;
    customer: [] | null;
    storage:[any] | null;
    stockByIdTyre?: []; 
    tyreStockData?:[];
    tyrePriceData?:[];
    wheelData?:[]; 
    wheelPriceData?:[];
    wheelStockData?:[]; 
    showComment(arg0:any):void;
}