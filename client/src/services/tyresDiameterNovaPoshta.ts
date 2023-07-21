import { TyreTypeNovaPoshta } from "./enum/TyresTypesNP.enum";

const tyresDiameter = (diameter: string | undefined) => {
    switch (diameter) {
        case '13':
            return TyreTypeNovaPoshta.REF_13_14;
        case '14':
            return TyreTypeNovaPoshta.REF_13_14;
        case '15':
            return TyreTypeNovaPoshta.REF_15_17;
        case '16':
            return TyreTypeNovaPoshta.REF_15_17;
        case '17':
            return TyreTypeNovaPoshta.REF_15_17;
        case '18':
            return TyreTypeNovaPoshta.REF_18_19;
        case '19':
            return TyreTypeNovaPoshta.REF_18_19;
        case '20':
            return TyreTypeNovaPoshta.REF_20_21;
        case '21':
            return TyreTypeNovaPoshta.REF_20_21;
        case '23':
            return TyreTypeNovaPoshta.REF_23;
        case '17.5':
            return TyreTypeNovaPoshta.REF_17_5;
        case '19.5':
            return TyreTypeNovaPoshta.REF_19_5;
        case '22.5':
            return TyreTypeNovaPoshta.WEIGHT_22_5;
    }
}

export {
    tyresDiameter
};