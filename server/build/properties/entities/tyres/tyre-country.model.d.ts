import { Model } from "sequelize-typescript";
import { Tyres } from "../../../tyres/entities/tyres.model";
import { TyrePropsConfigAttr } from "../../interfaces/tyres/tyre-props.interface";
export declare class TyreCountry extends Model<TyreCountry, TyrePropsConfigAttr> {
    id_country: number;
    country_manufacturer: string;
    country_manufacturer_ua: string;
    tyres: Tyres[];
}
