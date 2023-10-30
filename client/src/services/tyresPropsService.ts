import { TyreSeasons } from "./enum/PropsTyreSeason";
import { TyreType } from "./enum/PropsTyreType";

const typeCar = (type: string | undefined) => {
    switch (type) {
        case 'легковой':
        case 'легковий':
            return TyreType.LEGRKOVOI_TYPE;
        case 'внедорожник':
        case 'позашляховик':
            return TyreType.VNEDOROGNIK_TYPE;
        case 'легкогрузовой':
        case 'легковантажний':
            return TyreType.LEGKOGRUZ_TYPE;
        case 'с/г':
        case 'с/х':
            return TyreType.SELHOZ_TYPE;
        case 'грузовой':
        case 'вантажний':
        case 'вантажні шини':
            return TyreType.TRUCK_TYPE;
        case 'причіпна':
        case 'прицепная':
            return TyreType.TRAILER_TRUCK_TYPE;
        case 'рульова':
        case 'рулевая':
            return TyreType.STEERING_TRUCK_TYPE;
        case 'ведуча':
        case 'ведущая':
            return TyreType.TRACKTION_TRUCK_TYPE;
        case 'універсальна':
        case 'универсальная':
            return TyreType.UNIVERSAL_TYPE;
        case 'индустриальная':
        case 'індустріальна':
            return TyreType.INDUSTRIAL_TYPE;
        case 'карьерная':
        case `кар'єрна`:
            return TyreType.SPECTEHNIKA_TYPE;
        case 'мото':
        //case 'всесезонна':
            return TyreType.MOTO_TYPE;
        case 'вело':
            //case 'всесезонна':
            return TyreType.BICYCLE_TYPE;
        default:
            return TyreType.NO_TYPE;
    }
}

const seasonCar = (season_vehicle: string | undefined | any) => {
    switch (season_vehicle) {
        case 'летняя':
        case 'літня':
            return TyreSeasons.SUMMER_SEASON;
        case 'зимняя':
        case 'зимова':
            return TyreSeasons.WINTER_SEASON;
        case 'всесезонная':
        case 'всесезонна':
            return TyreSeasons.ALLSEASON_SEASON;
        default:
            return TyreSeasons.NOSEASON_SEASON;
    }
}

export {
    typeCar,
    seasonCar
}
