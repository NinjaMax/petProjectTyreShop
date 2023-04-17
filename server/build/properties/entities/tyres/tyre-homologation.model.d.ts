import { Model } from "sequelize-typescript";
import { Tyres } from "../../../tyres/entities/tyres.model";
import { TyrePropsConfigAttr } from "../../interfaces/tyres/tyre-props.interface";
export declare class TyreHomologation extends Model<TyreHomologation, TyrePropsConfigAttr> {
    id_homologation: number;
    homologation: string;
    tyres: Tyres[];
}
