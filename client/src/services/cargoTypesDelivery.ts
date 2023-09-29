import { CargoTypeDelivery } from "./enum/CargoTypeDelivery.enum";

const cargoTypesDelivery = (type: string | undefined) => {
    switch (type) {
        case 'легковые шины':
            return CargoTypeDelivery.REF_SHINY_DISKY_CAR;
        case 'грузовые шины':
            return CargoTypeDelivery.REF_SHINY_DISKY_CARGO;
        case 'шины':
            return CargoTypeDelivery.REF_SHINY_DISKY_CAR;
        case 'диски':
            return CargoTypeDelivery.REF_SHINY_DISKY_CAR;
        case 'акб':
            return CargoTypeDelivery.REF_BATTERY;
        case 'масло':
            return CargoTypeDelivery.REF_VANTAG;
    }
}

export {
 cargoTypesDelivery,
}