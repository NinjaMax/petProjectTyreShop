import { CarBrand } from "./enum/CarBrand.enum";

const homologationByCar = (homologation: string | undefined) => {
    switch (homologation) {
        case 'AR':
        case 'ARR':
            return CarBrand.ALFA_ROMEO_CAR_BRAND;
        case 'AM':
        case 'AM2':
        case 'A4A':
        case 'AM8':
        case 'AM9':
        case 'AMP':
        case 'AMR':
        case 'AMS':
        case 'AMX':
            return CarBrand.ASTON_MARTIN_CAR_BRAND;
        case 'AO':
        case 'AO (+)':
        case 'AO (+) Elect':
        case 'AO A':
        case 'AO1':
        case 'AO2':
        case 'AOE':
        case 'RO1':
        case 'RO2':
        case 'RO3':
        case 'AUDI':
        case 'AU':   
        case'AO Elect': 
        case 'AOExtended':
            return CarBrand.AUDI_CAR_BRAND;
        case 'B':
        case 'B1':
        case 'BC':
        case 'BL':
        case 'BL1':
            return CarBrand.BENTLEY_CAR_BRAND;
        case 'C1':
        case 'CH':
        case 'CH1':
        case 'DC':
            return CarBrand.CHRYSLER_CAR_BRAND;
        case '*':
        case 'M3':
            return CarBrand.BMW_CAR_BRAND;
        case 'K1':
        case 'K2':
        case 'K3':   
        case 'F':
        case 'F01':
        case 'F02':
        case 'F03': 
            return CarBrand.FERRARI_CAR_BRAND;
        case 'FI':
            return CarBrand.FIAT_CAR_BRAND;
        case 'FO':
        case 'FO1':
        case 'FO2':
        case 'FO3':
        case 'TV':
            return CarBrand.FORD_CAR_BRAND;
        case 'J':
        case 'J1':
        case 'J2':
        case 'JRS':
        case 'JLR':
            return CarBrand.JAGUAR_CAR_BRAND;
        case 'HO':
        case 'FRV':
            return CarBrand.HONDA_CAR_BRAND;
        case 'HN':
        case 'GOE':    
            return CarBrand.HYUNDAI_CAR_BRAND;
        case 'L':
            return CarBrand.LAMBORGHINI_CAR_BRAND;
        case 'LR':
        case 'LRO':
        case 'LR J': 
        case 'E LR':   
            return CarBrand.LAND_ROVER_CAR_BRAND;
        case 'LS':
            return CarBrand.LAND_ROVER_CAR_BRAND;
        case 'MGT':
            return CarBrand.MASERATI_CAR_BRAND;
        case 'DZ':
        case 'EZ':
        case 'SZ':
        case 'TZ':
            return CarBrand.MAZDA_CAR_BRAND;
        case 'MO':
        case 'MO A':
        case 'MO *':
        case 'MOE':
        case 'MO1':
        case 'MO1B':
        case 'MO1 B':
        case 'MO1 A':
        case 'MO2':
        case 'E MO':
        case 'MO-V':
        case 'MO-A':
        case 'MO-S': 
        case 'MOExtended':
        case 'MO Elect':
        case '* MOExtended':   
            return CarBrand.MERCEDES_BENZ_CAR_BRAND;
        case 'MI':
        case 'MZ':
            return CarBrand.MITSUBISHI_CAR_BRAND;
        case 'NR1':
        case 'KZ':
            return CarBrand.NISSAN_CAR_BRAND;
        case 'NO':
        case 'N0':
        case 'N1':
        case 'N2':
        case 'N3':
        case 'N4':
        case 'N5':
        case 'N6': 
        case 'NAO':
        case 'NDO':
        case 'ND0':
        case 'NCO':
        case 'NC0':
        case 'NA0':
        case 'NA1':
        case 'NA5':
        case 'NB0':
        case 'NFO':
        case 'NF0':
        case 'NE0':
        case 'PO':   
            return CarBrand.PORSCHE_CAR_BRAND;
        case 'T0':
        case 'Т0 Elect':
        case 'T1':
        case 'T2':
        case 'T3':   
        case 'T4':
            return CarBrand.TESLA_CAR_BRAND;
        case 'VO':
        case 'VW':
        case '(+)':
        case 'G':
        case 'C+':
            return CarBrand.VOLKSWAGEN_CAR_BRAND;
        case 'VOL':
            return CarBrand.VOLVO_CAR_BRAND;
        case 'TO':
        case 'A':
            return CarBrand.TOYOTA_CAR_BRAND;
        case 'RE':
            return CarBrand.RENAULT_CAR_BRAND;
        case 'CZ':
        case 'GZ':
        case 'AZ':
        case 'JZ':
            return CarBrand.SUBARU_CAR_BRAND;
        case 'QZ':
            return CarBrand.MINI_COOPER_CAR_BRAND;
        case 'JP':
            return CarBrand.JEEP_CAR_BRAND;
        case 'OP':
        case 'OP1':    
            return CarBrand.OPEL_CAR_BRAND;
        case 'PE':
            return CarBrand.PEUGEOT_CAR_BRAND;
        case 'SI':
            return CarBrand.CITROEN_CAR_BRAND;
        case 'SE':    
            return CarBrand.SEAT_CAR_BRAND;
        case 'SK': 
        case 'KS':    
            return CarBrand.SKODA_CAR_BRAND;
        default:
            return null;
    }
}

export {
    homologationByCar
};