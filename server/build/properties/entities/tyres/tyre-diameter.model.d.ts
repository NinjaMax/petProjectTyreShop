import { Model } from "sequelize-typescript";
import { Tyres } from "../../../tyres/entities/tyres.model";
import { TyrePropsConfigAttr } from "../../interfaces/tyres/tyre-props.interface";
export declare class TyreDiameter extends Model<TyreDiameter, TyrePropsConfigAttr> {
    id_diameter: number;
    diameter: string;
    tyres: Tyres[];
}
