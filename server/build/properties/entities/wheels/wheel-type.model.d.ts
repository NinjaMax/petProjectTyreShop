import { Model } from "sequelize-typescript";
import { Wheel } from "../../../wheels/entities/wheel.model";
import { WheelPropsConfigAttr } from "../../interfaces/wheels/wheel-props.interface";
export declare class WheelType extends Model<WheelType, WheelPropsConfigAttr> {
    id_type: string;
    type: string;
    wheels: Wheel[];
}
