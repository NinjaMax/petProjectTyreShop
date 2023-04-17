import { Model } from "sequelize-typescript";
import { Tyres } from "../../../tyres/entities/tyres.model";
import { TyrePropsConfigAttr } from "../../interfaces/tyres/tyre-props.interface";
export declare class TyreLoadIndex extends Model<TyreLoadIndex, TyrePropsConfigAttr> {
    id_load_index: number;
    load_index: string;
    load_index_with_desc: string;
    tyres: Tyres[];
}
