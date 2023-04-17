import { Model } from "sequelize-typescript";
import { Tyres } from "../../../tyres/entities/tyres.model";
import { TyrePropsConfigAttr } from "../../interfaces/tyres/tyre-props.interface";
export declare class TyreRunFlat extends Model<TyreRunFlat, TyrePropsConfigAttr> {
    id_run_flat: number;
    run_flat: string;
    tyres: Tyres[];
}
