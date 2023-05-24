export interface ITyreContent {
    props: any[] | null;
    value: string;
    showRowData(e: any):void;
    addTyreToOrder(e: any): void;
    sortTyres(e: any): void;
}