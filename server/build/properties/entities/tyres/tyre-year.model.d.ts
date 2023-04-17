import { Model } from "sequelize-typescript";
import { Tyres } from "../../../tyres/entities/tyres.model";
import { TyrePropsConfigAttr } from "../../interfaces/tyres/tyre-props.interface";
export declare class TyreYear extends Model<TyreYear, TyrePropsConfigAttr> {
    id_year: number;
    manufacture_year: string;
    tyres: Tyres[];
}
