export class CreateReviewDto {

    //readonly id_tyres: number;
    readonly id_review: number;
    readonly discription: string;
    readonly id_supplier: number;

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
    //readonly name: string;
    readonly full_name: string;
    readonly update_date: Date;
 
    readonly rating_overall: number;
    readonly rating_dry_road: number;
    readonly rating_wet_road: number;
    readonly rating_snow_road: number;
    readonly rating_ice_road: number;
    readonly rating_cross_country: number;
    readonly rating_treadwear: number;
    readonly rating_price_quality: number;

    readonly id_user: number;
    readonly id_customer: number;
    readonly name: string; 
    readonly phone: bigint; 
    readonly email: string; 
    readonly id_contract: number; 
    readonly balance: number;
 
}
