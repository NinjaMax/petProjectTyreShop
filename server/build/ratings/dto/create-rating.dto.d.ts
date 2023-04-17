export declare class CreateRatingDto {
    readonly id_review: number;
    readonly id: number;
    readonly id_supplier: number;
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
