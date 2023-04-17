import { CreateRatingDto } from './create-rating.dto';
declare const UpdateRatingDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateRatingDto>>;
export declare class UpdateRatingDto extends UpdateRatingDto_base {
    readonly rating_overall: number;
    readonly rating_dry_road: number;
    readonly rating_wet_road: number;
    readonly rating_snow_road: number;
    readonly rating_ice_road: number;
    readonly rating_cross_country: number;
    readonly rating_treadwear: number;
    readonly rating_price_quality: number;
}
export {};
