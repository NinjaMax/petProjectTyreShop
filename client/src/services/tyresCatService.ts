import { TyreCatDiameter } from "./enum/ParamsDiameter";
import { TyreCatSeasons } from "./enum/ParamsSeason";
import { TyreCatVehicles } from "./enum/ParamsVehicle";

const tyreVehicleTypeCat = (type: string | undefined) => {
    switch (type) {
        case 'legkovi':
            return TyreCatVehicles.LEGRKOVOI_CAT_TYPE;
        case 'legkovoi':
            return TyreCatVehicles.LEGRKOVOI_CAT_TYPE_RU;
        case 'vnedorognik':
            return TyreCatVehicles.VNEDOROGNIK_CAT_TYPE_RU;
        case 'pozashlyakhovik': 
            return TyreCatVehicles.VNEDOROGNIK_CAT_TYPE;  
        case 'pozakhlyakhovik':
            return TyreCatVehicles.VNEDOROGNIK_CAT_TYPE;
        case 'microavtobus':
            return TyreCatVehicles.LEGKOGRUZ_CAT_TYPE;
        case 'legkovantazhnii':
            return TyreCatVehicles.LEGKOGRUZ_CAT_TYPE;
        case 'legkogruzovoi':
            return TyreCatVehicles.LEGKOGRUZ_CAT_TYPE_RU;
        case 'selhoz':
            return TyreCatVehicles.SELHOZ_CAT_TYPE;
        case 'sg':
            return TyreCatVehicles.SELHOZ_CAT_TYPE;
        case 's-kh':
            return TyreCatVehicles.SELHOZ_CAT_TYPE_RU;
        case 'industrialna':
            return TyreCatVehicles.SPECTEHNIKA_CAT_TYPE;
        case 'industrialnaya':
            return TyreCatVehicles.SPECTEHNIKA_CAT_TYPE_RU;
        case 'gruzovi':
            return TyreCatVehicles.TRUCK_CAT_TYPE
        case 'gruzovii':
            return TyreCatVehicles.TRUCK_CAT_TYPE
        case 'gruzovie':
            return TyreCatVehicles.TRUCK_CAT_TYPE_RU
        case 'moto':
            return TyreCatVehicles.MOTO_CAT_TYPE;
    }
}

const tyreSeasonCat = (season_cat: string | undefined) => {
    switch (season_cat) {
        case 'litni':
            return TyreCatSeasons.SUMMER_CAT;
        case 'litnii':    
            return TyreCatSeasons.SUMMER_CAT;
        case 'letnie':    
            return TyreCatSeasons.SUMMER_CAT;
        case 'lіtnya':
            return TyreCatSeasons.SUMMER_CAT;
        case 'letnyaya':
            return TyreCatSeasons.SUMMER_CAT_RU;
        case 'zimni':
            return TyreCatSeasons.WINTER_CAT;
        case 'zimnie':
            return TyreCatSeasons.WINTER_CAT;
        case 'zimova':    
            return TyreCatSeasons.WINTER_CAT;
        case 'zimnyaya':
            return TyreCatSeasons.WINTER_CAT_RU;
        case 'vsesezon':
            return TyreCatSeasons.ALLSEASON_CAT;
        case 'vsesezonna':
            return TyreCatSeasons.ALLSEASON_CAT;
        case 'vsesezonnaya':
            return TyreCatSeasons.ALLSEASON_CAT_RU;
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