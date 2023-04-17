import { Model } from "sequelize-typescript";
import { Tyres } from "../../../tyres/entities/tyres.model";
import { TyrePropsConfigAttr } from "../../interfaces/tyres/tyre-props.interface";
export declare class TyreSpeedIndex extends Model<TyreSpeedIndex, TyrePropsConfigAttr> {
    id_speed_index: number;
    speed_index: string;
    speed_index_with_desc: string;
    tyres: Tyres[];
}
