export class CreateReviewDto {

    readonly id_tyres: number;
    readonly id_review: number;
    readonly discription: string;
    readonly id_sup: number;

    readonly id: number;
    readonly id_tyres_model: number;
    readonly id_tyres_brand: number;
    readonly width: string;
    readonly height: string;
    readonly diametr: string;
    readonly season: string;
    readonly brand: string;
    readonly model: string;
    readonly type: string;
    readonly stud: string;
    readonly xl: string;
    readonly country: string;
    readonly year: string;
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
 
}
