import { Model } from "sequelize-typescript";
import { Tyres } from "../../../tyres/entities/tyres.model";
import { TyrePropsConfigAttr } from "../../interfaces/tyres/tyre-props.interface";
export declare class TyreHeight extends Model<TyreHeight, TyrePropsConfigAttr> {
    id_height: number;
    height: string;
    tyres: Tyres[];
}
