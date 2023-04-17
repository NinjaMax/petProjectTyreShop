import { Model } from "sequelize-typescript";
import { Wheel } from "../../../wheels/entities/wheel.model";
import { WheelPropsConfigAttr } from "../../interfaces/wheels/wheel-props.interface";
export declare class WheelBoltCount extends Model<WheelBoltCount, WheelPropsConfigAttr> {
    id_bolt_count: number;
    bolt_count: string;
    wheels: Wheel[];
}
