export interface IReviewTyreRestCreate {
    id: number;
    id_model: number;
    id_brand: number;
    id_user?: number;
    id_customer?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    description: string;
    positive?: string;
    negative?: string;
    driver_experience?: string;
    car: string;
    name: string;
    id_review: number;
    rating_overall: number | undefined;
    rating_dry_road:number | undefined;
    rating_wet_road: number | undefined;
    rating_snow_road: number | undefined;
    rating_ice_road: number | undefined;
    rating_cross_country: number | undefined;
    rating_treadwear: number | undefined;
    rating_price_quality: number | undefined;
}