import { Model } from "sequelize-typescript";
import { Tyres } from "../../../tyres/entities/tyres.model";
import { TyrePropsConfigAttr } from "../../interfaces/tyres/tyre-props.interface";
export declare class TyreSeason extends Model<TyreSeason, TyrePropsConfigAttr> {
    id_season: number;
    season: string;
    season_ua: string;
    tyres: Tyres[];
}
