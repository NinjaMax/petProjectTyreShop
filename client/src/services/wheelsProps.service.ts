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

export {
    typeWheels,
}