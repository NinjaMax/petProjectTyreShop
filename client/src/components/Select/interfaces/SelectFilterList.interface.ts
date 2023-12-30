export interface ISelectFilterList {
    value: string;
    items: any;
    checked?: any;
    onChange: (e: any) => void; 
    width?: number;
    nameFilter?: string;
    id?: string;
}