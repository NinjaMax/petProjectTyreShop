import { Model } from "sequelize-typescript";
import { Wheel } from "../../../wheels/entities/wheel.model";
import { WheelPropsConfigAttr } from "../../interfaces/wheels/wheel-props.interface";
export declare class WheelEt extends Model<WheelEt, WheelPropsConfigAttr> {
    id_et: number;
    et: string;
    wheels: Wheel[];
}
