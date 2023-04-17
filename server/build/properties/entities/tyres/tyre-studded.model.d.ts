import { Model } from "sequelize-typescript";
import { Tyres } from "../../../tyres/entities/tyres.model";
import { TyrePropsConfigAttr } from "../../interfaces/tyres/tyre-props.interface";
export declare class TyreStudded extends Model<TyreStudded, TyrePropsConfigAttr> {
    id_studded: number;
    studded: string;
    tyres: Tyres[];
}
