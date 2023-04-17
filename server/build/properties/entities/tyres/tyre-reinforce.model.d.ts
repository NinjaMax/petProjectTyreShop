import { Model } from "sequelize-typescript";
import { Tyres } from "../../../tyres/entities/tyres.model";
import { TyrePropsConfigAttr } from "../../interfaces/tyres/tyre-props.interface";
export declare class TyreReinforce extends Model<TyreReinforce, TyrePropsConfigAttr> {
    id_reinforce: number;
    reinforce: string;
    tyres: Tyres[];
}
