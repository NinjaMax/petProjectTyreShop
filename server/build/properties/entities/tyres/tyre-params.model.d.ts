import { Model } from "sequelize-typescript";
import { Tyres } from "../../../tyres/entities/tyres.model";
import { TyrePropsConfigAttr } from "../../interfaces/tyres/tyre-props.interface";
export declare class TyreParams extends Model<TyreParams, TyrePropsConfigAttr> {
    id_params: number;
    params: string;
    tyres: Tyres[];
}
