export interface ITyreContent {
    props: any[] | null;
    value: string[] | undefined;
    showRowData(e: any):any;
    addTyreToOrder(e: any): any;
    sortTyres(e: any): any;
    showRowImage(e: any): any;
    activeShowImage: boolean;
    setActiveShowImage(e: any): any;
}