import { TyreCatDiameter } from "./enum/ParamsDiameter";
import { TyreCatSeasons } from "./enum/ParamsSeason";
import { TyreCatVehicles } from "./enum/ParamsVehicle";

const tyreVehicleTypeCat = (type: string | undefined) => {
    switch (type) {
        case 'legkovi':
            return TyreCatVehicles.LEGKOGRUZ_CAT_TYPE;
        case 'vnedorognik':
            return TyreCatVehicles.VNEDOROGNIK_CAT_TYPE;
        case 'microavtobus':
            return TyreCatVehicles.LEGKOGRUZ_CAT_TYPE;
        case 'selhoz':
            return TyreCatVehicles.SELHOZ_CAT_TYPE;
        case 'spectehnika':
            return TyreCatVehicles.SPECTEHNIKA_CAT_TYPE;
        case 'gruzovi':
            return TyreCatVehicles.TRUCK_CAT_TYPE
        case 'moto':
            return TyreCatVehicles.MOTO_CAT_TYPE;
    }
}

const tyreSeasonCat = (season_cat: string | undefined) => {
    switch (season_cat) {
        case 'litni':
            return TyreCatSeasons.SUMMER_CAT;
        case 'zimni':
            return TyreCatSeasons.WINTER_CAT;
        case 'vsesezon':
            return TyreCatSeasons.ALLSEASON_CAT;

    }
}

const tyreDiameterCat = (diameter: string | undefined) => {
    switch (diameter) {
        case 'r13':
            return TyreCatDiameter.DIAMETER_13;
        case 'r14':
            return TyreCatDiameter.DIAMETER_14;
        case 'r15':
            return TyreCatDiameter.DIAMETER_15;
        case 'r16':
            return TyreCatDiameter.DIAMETER_16;
        case 'r17':
            return TyreCatDiameter.DIAMETER_17;
        case 'r18':
            return TyreCatDiameter.DIAMETER_18;
        case 'r19':
            return TyreCatDiameter.DIAMETER_19;
        case 'r20':
            return TyreCatDiameter.DIAMETER_20;
        case 'r21':
            return TyreCatDiameter.DIAMETER_21;
        case 'r17.5':
            return TyreCatDiameter.DIAMETER_17_5;
        case 'r19.5':
            return TyreCatDiameter.DIAMETER_19_5;
        case 'r22.5':
            return TyreCatDiameter.DIAMETER_22_5;
    }
}

export {
    tyreVehicleTypeCat,
    tyreSeasonCat,
    tyreDiameterCat
}