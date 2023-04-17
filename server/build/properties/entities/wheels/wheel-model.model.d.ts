import { Model } from "sequelize-typescript";
import { Wheel } from "../../../wheels/entities/wheel.model";
import { WheelPropsConfigAttr } from "../../interfaces/wheels/wheel-props.interface";
export declare class WheelModel extends Model<WheelModel, WheelPropsConfigAttr> {
    id_model: number;
    model: string;
    wheels: Wheel[];
}
