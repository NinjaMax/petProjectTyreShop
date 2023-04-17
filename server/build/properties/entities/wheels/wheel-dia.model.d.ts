import { Model } from "sequelize-typescript";
import { Wheel } from "../../../wheels/entities/wheel.model";
import { WheelPropsConfigAttr } from "../../interfaces/wheels/wheel-props.interface";
export declare class WheelDia extends Model<WheelDia, WheelPropsConfigAttr> {
    id_dia: number;
    dia: string;
    wheels: Wheel[];
}
