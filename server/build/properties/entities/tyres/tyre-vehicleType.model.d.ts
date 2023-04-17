import { Model } from "sequelize-typescript";
import { Tyres } from "../../../tyres/entities/tyres.model";
import { TyrePropsConfigAttr } from "../../interfaces/tyres/tyre-props.interface";
export declare class TyreVehicleType extends Model<TyreVehicleType, TyrePropsConfigAttr> {
    id_vehicle_type: number;
    vehicle_type: string;
    vehicle_type_ua: string;
    tyres: Tyres[];
}
