import { WheelCatType } from "./enum/ParamsWheelsType.enum";
import { WheelType } from "./enum/WheelsType.enum";

const typeWheels = (type_wheels: string | undefined | any) => {
    switch (type_wheels) {
        case 'стальной':
        case 'стальний':
            return WheelType.STALNOI_TYPE;
        case 'литой':
        case 'литий':
            return WheelType.LEGKOSPLAV_TYPE;
        case 'кованый':
        case 'кований':
            return WheelType.KOVANIY_TYPE;
        default:
            return WheelType.NO_TYPE;
    }
}

const typeWheelsMainG = (type_wheels: string | undefined | any) => {
    switch (type_wheels) {
        case 'стальной':
        case 'стальний':
            return WheelType.STALNOI_TYPE_MAIN_G;
        case 'литой':
        case 'литий':
            return WheelType.LEGKOSPLAV_TYPE_MAIN_G;
        case 'кованый':
        case 'кований':
            return WheelType.KOVANIY_TYPE_MAIN_G;
        default:
            return WheelType.NO_TYPE;
    }
}

const typeWheelsCat = (type_wheels_cat: string | undefined) => {
    switch (type_wheels_cat) {
        case 'stalnij':
        case 'stalni':
            return WheelCatType.STEELY_CAT;
        case 'stalnii':
            return WheelCatType.STEELY_CAT;
        case 'stalnoi':
            return WheelCatType.STEELY_CAT;
        case 'litoj':
        case 'litii':
            return WheelCatType.CAST_CAT;
        case 'litoy':    
            return WheelCatType.CAST_CAT;
        case 'litoi':    
            return WheelCatType.CAST_CAT;
        case 'kovanij':
            return WheelCatType.IRON_CAT;
        case 'kovanii':
        case 'kovani':    
            return WheelCatType.IRON_CAT;
    }
}

export {
    typeWheels,
    typeWheelsCat,
    typeWheelsMainG
}