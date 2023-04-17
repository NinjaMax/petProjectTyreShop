import { Model } from "sequelize-typescript";
import { Tyres } from "../../../tyres/entities/tyres.model";
import { TyrePropsConfigAttr } from "../../interfaces/tyres/tyre-props.interface";
export declare class TyreDemo extends Model<TyreDemo, TyrePropsConfigAttr> {
    id_demo: number;
    demo: string;
    tyres: Tyres[];
}
