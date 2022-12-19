export class CreateSupplierDto {

    readonly id_supplier: number;
    readonly name: string;
    readonly city: string;
    readonly phone: bigint;
    readonly email: string;
    
    readonly id_contract: number;
    readonly balance: number;

}
