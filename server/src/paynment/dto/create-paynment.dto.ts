export class CreatePaynmentDto {

    readonly id_paynment: number;
    readonly type_paynment: string;
    readonly price: number;
    readonly notes: string;
    readonly status: string;
    readonly id_order_storage: number;
    readonly id_order: number;
    readonly id_order_sup: number;
    readonly id_goods: number;
    readonly id_cat: number;
    readonly id_expense: number;
    readonly id_income: number;
    readonly goods: string;
    readonly expense: string;
    readonly income: string;
    readonly total: number;
    readonly quantity: number;
    readonly reserve: number;
    readonly id_basket: number;

    readonly id_cashbox: number;
    readonly cashbox: string;
    readonly funds: number;
    readonly storage_index: number;
    readonly order_index: number;
    readonly id: number;

}
