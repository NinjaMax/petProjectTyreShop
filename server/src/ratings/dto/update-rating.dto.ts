import { PartialType } from '@nestjs/mapped-types';
import { CreateRatingDto } from './create-rating.dto';

export class UpdateRatingDto extends PartialType(CreateRatingDto) {

    readonly rating_overall: number;
    readonly rating_dry_road: number;
    readonly rating_wet_road: number;
    readonly rating_snow_road: number;
    readonly rating_ice_road: number;
    readonly rating_cross_country: number;
    readonly rating_treadwear: number;
    readonly rating_price_quality: number;

}
