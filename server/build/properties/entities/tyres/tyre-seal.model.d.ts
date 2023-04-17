import { Model } from "sequelize-typescript";
import { Tyres } from "../../../tyres/entities/tyres.model";
import { TyrePropsConfigAttr } from "../../interfaces/tyres/tyre-props.interface";
export declare class TyreSeal extends Model<TyreSeal, TyrePropsConfigAttr> {
    id_seal: number;
    seal: string;
    tyres: Tyres[];
}
