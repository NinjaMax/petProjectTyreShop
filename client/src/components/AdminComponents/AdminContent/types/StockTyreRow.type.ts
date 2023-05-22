export type IStockTyreRow = {
    id: number;
    storage: {storage: string};
    update_date: Date;
    supplier: {name: string; city_ua: string;};
    stock: number;
    reserve: number;
    remainder: number;
}