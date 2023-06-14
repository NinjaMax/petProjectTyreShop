export interface IFilterMainBtn {
    children: JSX.Element | JSX.Element[] | any;
    titleFilter: string; 
    width: number; 
    contentInfo?: string | boolean; 
    filterState?: boolean;
    setFilterClick(arg0: any): void;
    chipItem?: string | null;
}