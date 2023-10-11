export type IProps = {
    type?: { 
        vehicle_type?: string,
        vehicle_type_ua?: string,
    };
    season?:{
        season: string,
        season_ua: string
    };
    type_wheel?: {
        id_description?: number | null,
        id_type?: string,
        type?: string,
        type_ua?: string,
    }
    homologation?: {
        id_homologation?: number,
        homologation?: string,
        id_description?: number,
    };
}