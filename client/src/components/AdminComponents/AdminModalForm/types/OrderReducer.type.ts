export enum ActionType {
    ADDTYRE = 'addTyreToOrder',
    ADDWHEEL = 'addWheelToOrder',
    DELETEITEM = 'deleteItemFromOrder',
    EDITITEM = 'editItemFromOrder',
}

export type ActionReducer = 
    | { type: ActionType.ADDTYRE, addTyre:any, indexPrice: string}
    | { type: ActionType.ADDWHEEL, addWheel:any, indexPrice: string}
    | { type: ActionType.DELETEITEM, deleteItem: any}
    | { type: ActionType.EDITITEM, editItem: any};

export type StateReducer = {
    [index: number]: any;
    i?:number;
    //stateData?: any[];
    length: number;
    state?: any[];
    //newStateData?:[];
    forEach(arg0: (itemGoods: {}) => Promise<void |any>): unknown;
    forEach(arg0: any, ...arg: any[]): any;
    push(arg0: { price: any; }): unknown;
    splice(itemIndex: number, arg1: number): any;
    map(arg0: any, ...arg: any[]): any;
    slice(arg0?: number, arg1?: number): any;
    [Symbol.iterator](): any;
    reduce(arg0: any, ...arg: any[]): any;
}