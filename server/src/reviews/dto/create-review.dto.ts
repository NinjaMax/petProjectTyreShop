export class CreateReviewDto {

    readonly id_tyres: number;
    readonly id_review: number;
    readonly discription: string;
    readonly id_sup: number;
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
