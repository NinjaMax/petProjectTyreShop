export class CreateSupplierDto {

    readonly id_supplier: number;
    readonly name: string;
    readonly city: string;
    readonly city_ua: string;
    readonly phone: bigint;
    readonly email: string;
    readonly address: string;
    readonly id_contract: number;
    readonly balance: number;
    readonly delivery: string[];
    readonly delivery_city_ref: string[];
    readonly delivery_dep: string[];
    readonly delivery_dep_ref: string[];

}
