import { CargoTypeNovaPoshta } from "./enum/CargoTypeNP.enum";

const cargoTypesNovaPoshta = (type: string | undefined) => {
    switch (type) {
        case 'легковые шины':
        case 'грузовые шины':
        case 'шины':
            return CargoTypeNovaPoshta.REF_SHINY_DISKY;
        case 'диски':
            return CargoTypeNovaPoshta.REF_DISKY;
        case 'акб':
            return CargoTypeNovaPoshta.REF_VANTAG;
        case 'масло':
            return CargoTypeNovaPoshta.REF_VANTAG;
    }
}

export {
 cargoTypesNovaPoshta,
}
