import { TyreCarDelivery } from "./enum/TyresCarDelivery.enum";
import { TyreCargoDelivery } from "./enum/TyresCargoDelivery.enum";

const tyresCarDiameterDelivery = (diameter: string | undefined) => {
    switch (diameter) {
        case '13':
            return TyreCarDelivery.REF_13_14;
        case '14':
            return TyreCarDelivery.REF_13_14;
        case '15':
            return TyreCarDelivery.REF_15_16;
        case '16':
            return TyreCarDelivery.REF_15_16;
        case '17':
            return TyreCarDelivery.REF_17;
        case '18':
            return TyreCarDelivery.REF_17_5_19;
        case '19':
            return TyreCarDelivery.REF_17_5_19;
        case '20':
            return TyreCarDelivery.REF_19_5_22;
        case '21':
            return TyreCarDelivery.REF_19_5_22;
    }
}

const tyresCargoDiameterDelivery = (diameter: string | undefined) => {
    switch (diameter) {
        case '15':
            return TyreCargoDelivery.REF_15;
        case '16':
            return TyreCargoDelivery.REF_16;
        case '17.5':
            return TyreCargoDelivery.REF_17_5;
        case '19.5':
            return TyreCargoDelivery.REF_19_5;
        case '20':
            return TyreCargoDelivery.REF_20_22_5;
        case '22.5':
            return TyreCargoDelivery.REF_20_22_5;
        case '24':
            return TyreCargoDelivery.REF_25;
        case '25':
            return TyreCargoDelivery.REF_25;
        case '26':
            return TyreCargoDelivery.REF_33;
        case '28':
            return TyreCargoDelivery.REF_33;
        case '29':
            return TyreCargoDelivery.REF_33;
        case '30':
            return TyreCargoDelivery.REF_33;
        case '32':
            return TyreCargoDelivery.REF_33;
        case '33':
            return TyreCargoDelivery.REF_33;
        case '34':
            return TyreCargoDelivery.REF_35;
        case '35':
            return TyreCargoDelivery.REF_35;
    }
}

export {
    tyresCarDiameterDelivery,
    tyresCargoDiameterDelivery
};