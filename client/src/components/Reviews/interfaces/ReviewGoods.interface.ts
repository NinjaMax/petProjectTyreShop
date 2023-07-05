export interface IReviewGoods {
    id?: number;
    tyre_model?: string;
    tyre_brand?: string;
    full_name?: string;
    id_brand?: number;
    id_customer: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    description?: string;
    positive?: string;
    negative?: string;
    driver_experience?: string;
    createdAt:Date,
    car?: string;
    name?: string;
    id_review?: number;
    rating_overall?: number;
    rating_dry_road?: number;
    rating_wet_road?: number;
    rating_snow_road?: number;
    rating_ice_road?: number;
    rating_cross_country?: number;
    rating_treadwear?: number;
    rating_price_quality?: number;
}