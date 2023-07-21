import { WheelsTypeNovaPoshta } from "./enum/WheelsTypeNP.enum";

const wheelsDiameter = (diameter: string | undefined) => {
    switch (diameter) {
        case '13':
            return WheelsTypeNovaPoshta.REF_13_14;
        case '14':
            return WheelsTypeNovaPoshta.REF_13_14;
        case '15':
            return WheelsTypeNovaPoshta.REF_15_17;
        case '16':
            return WheelsTypeNovaPoshta.REF_15_17;
        case '17':
            return WheelsTypeNovaPoshta.REF_15_17;
        case '18':
            return WheelsTypeNovaPoshta.REF_18_19;
        case '19':
            return WheelsTypeNovaPoshta.REF_18_19;
        case '20':
            return WheelsTypeNovaPoshta.REF_20_21;
        case '21':
            return WheelsTypeNovaPoshta.REF_20_21;
        case '23':
            return WheelsTypeNovaPoshta.REF_23;
        case '17.5':
            return WheelsTypeNovaPoshta.REF_17_5;
        case '19.5':
            return WheelsTypeNovaPoshta.REF_19_5;
        case '22.5':
            return WheelsTypeNovaPoshta.WEIGHT_22_5;
    }
}

export {
    wheelsDiameter
};