import { IRatingAvg } from "../../../pages/types/RatingModelAvg.type";

export interface IReviewGoods {
    id?: number;
    tyre_model?: string;
    tyre_brand?: string;
    full_name?: string;
    id_brand?: number;
    id_customer?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    description?: string;
    positive?: string;
    negative?: string;
    driver_experience?: string;
    createdAt: string;
    car?: string;
    name?: string;
    id_review?: number;
    ratingsModel?: IRatingAvg;
    reviewCount?: number;
    like_count:number;
    dislike_count:number;
    customer_pictures: string;
}