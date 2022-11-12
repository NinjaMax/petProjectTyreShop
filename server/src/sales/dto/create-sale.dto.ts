export class CreateSaleDto {
    
    readonly id: number;
    readonly id_goods: number;
    readonly goods: string;
    readonly quantity: number;
    readonly price: number;
    readonly total: number;
    readonly storage: string;

    readonly id_tyres: number;
    readonly id_wheel: number;
    readonly id_oil: number;
    readonly id_battery: number;
    readonly id_sup: number;
    readonly stock: number;
    readonly reserve: number;
    readonly remainder: number;
    readonly update_date: Date;

}
