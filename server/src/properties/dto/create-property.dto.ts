export class CreatePropertyDto {

    readonly id: number;
    readonly id_model: number;
    readonly id_brand: number;
    readonly width: number;
    readonly height: number;
    readonly diametr: number;
    readonly season: string;
    readonly brand: string;
    readonly model: string;
    readonly type: string;
    readonly stud: string;
    readonly xl: string;
    readonly country: string;
    readonly year: number;
    readonly speed_index: number;
    readonly load_index: number;
    readonly om: string;
    readonly euromark: string;

    //readonly id_tyres: number;
    readonly id_supplier: number;
    readonly update_date: Date;
    readonly full_name: string;
       
}
