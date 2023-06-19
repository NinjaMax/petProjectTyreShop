export interface IFilterMainBtn {
    children: JSX.Element | JSX.Element[] | any;
    titleFilter: string; 
    width: number; 
    contentInfo?: string | boolean; 
    filterState?: boolean;
    deleteChip?(arg0: any): void;
    chipItem?: string | string[] | null;
    filterAction?(arg0: any): void;
}