export interface IAdminWheelContent {
    props: any[] | null;
    value: string[] | undefined;
    showRowData(arg0: any):void;
    addWheelToOrder(arg0: any): void;
    sortWheels(arg0: any): void;
    showRowImage(e: any): any;
    activeShowImage: boolean;
    setActiveShowImage(e: any): any;
}