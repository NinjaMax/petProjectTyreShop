import { Model } from "sequelize-typescript";
import { Tyres } from "../../../tyres/entities/tyres.model";
import { TyrePropsConfigAttr } from "../../interfaces/tyres/tyre-props.interface";
export declare class TyreWidth extends Model<TyreWidth, TyrePropsConfigAttr> {
    id_width: number;
    width: string;
    tyres: Tyres[];
}
