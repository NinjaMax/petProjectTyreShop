import { Model } from "sequelize-typescript";
import { Tyres } from "../../../tyres/entities/tyres.model";
import { TyrePropsConfigAttr } from "../../interfaces/tyres/tyre-props.interface";
export declare class TyreSizeDigits extends Model<TyreSizeDigits, TyrePropsConfigAttr> {
    id_size_digits: number;
    size_only_digits: string;
    tyres: Tyres[];
}
