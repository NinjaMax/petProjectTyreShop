export class CreateCommentDto {

    readonly id_comment: number;
    readonly comments: string;
    readonly id_user: number;
    readonly id_order: number;
    readonly id_order_sup: number;
    readonly id_sale: number;
    readonly id_order_storage: number;
    readonly id_goods: number;
    readonly id_cat: number;
    readonly goods: string;
    readonly price: number;
    readonly total: number;
    readonly quantity: number;
    readonly reserve: number;
    readonly notes: string;
    readonly status: string;
    readonly id_basket: number;

    readonly name: string;
    readonly full_name: string;
    readonly phone: bigint;
    readonly email:string;
    readonly storage_index: number;
    readonly order_index: number;
    readonly id: number;
    readonly id_order_sup_storage: number;
    readonly order_sup: number; 
    readonly id_customer: number;

}   
