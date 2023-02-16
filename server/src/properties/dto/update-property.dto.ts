import { PartialType } from '@nestjs/mapped-types';
import { CreatePropertyDto } from './create-property.dto';

export class UpdatePropertyDto extends PartialType(CreatePropertyDto) {

    readonly id: number;
    readonly id_model: number;
    readonly id_brand: number;
    readonly id_width: number;
    readonly width: string;
    readonly id_height: number;
    readonly height: string;
    readonly id_diameter: number;
    readonly diameter: string;
    readonly id_season: number;
    readonly season: string;
    readonly brand: string;
    readonly model: string;
    readonly id_type: number;
    readonly type: string;
    readonly id_demo: number;
    readonly demo: string;
    readonly id_studded: number;
    readonly studded: string;
    readonly id_reinforce: number;
    readonly reinforce: string;
    readonly id_country: number;
    readonly country_manufacturer: string;
    readonly country_manufacturer_ua: string;
    readonly id_year: number;
    readonly manufacture_year: number;
    readonly id_speed_index: number;
    readonly speed_index: string;
    readonly speed_index_with_desc: string;
    readonly id_load_index: number;
    readonly load_index: string;
    readonly load_index_with_desc: string;
    readonly id_homologation: number;
    readonly homologation: string;
    readonly id_run_flat: number;
    readonly run_flat: string;
    readonly euromark: string;
    readonly id_seal: number;
    readonly seal: string;
    readonly id_silent: number;
    readonly silent: string;
    readonly id_size_digits: number;
    readonly size_only_digits: number;
    readonly id_vehicle_type: number;
    readonly vehicle_type: string;
    readonly vehicle_type_ua: string;
    readonly id_params: number;
    readonly params: string;
    readonly id_bolt_count_pcd: number;
    readonly bolt_count_pcd: string;
    readonly id_pcd: number;
    readonly pcd: string;
    readonly id_pcd2: number;
    readonly pcd2: string;

    readonly id_tyre: number;
    readonly id_wheel: number;
    readonly id_oil: number;
    readonly id_battery: number;
    readonly id_supplier: number;
    readonly update_date: Date;
    readonly full_name: string;
    readonly id_et: number;
    readonly et: string;
    readonly id_dia: number;
    readonly dia: string;
    readonly id_bolt_count: number;
    readonly bolt_count: string;

}
