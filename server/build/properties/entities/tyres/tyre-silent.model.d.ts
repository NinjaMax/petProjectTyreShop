import { Model } from "sequelize-typescript";
import { Tyres } from "../../../tyres/entities/tyres.model";
import { TyrePropsConfigAttr } from "../../interfaces/tyres/tyre-props.interface";
export declare class TyreSilent extends Model<TyreSilent, TyrePropsConfigAttr> {
    id_silent: number;
    silent: string;
    tyres: Tyres[];
}
