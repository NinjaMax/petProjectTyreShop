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
        case 'спецтехника':
        case 'спецтехніка':
            return TyreType.SPECTEHNIKA_TYPE;
        case 'грузовой':
        case 'вантажний':
            return TyreType.TRUCK_TYPE
        case 'мото':
        //case 'всесезонна':
            return TyreType.MOTO_TYPE;
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
