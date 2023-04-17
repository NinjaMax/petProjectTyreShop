import { Model } from "sequelize-typescript";
import { Wheel } from "../../../wheels/entities/wheel.model";
import { WheelPropsConfigAttr } from "../../interfaces/wheels/wheel-props.interface";
export declare class WheelDiameter extends Model<WheelDiameter, WheelPropsConfigAttr> {
    id_diameter: number;
    diameter: string;
    wheels: Wheel[];
}
