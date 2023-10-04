import { RegionDelivery } from "./enum/RegionDelivery.enum";
import { RegionNovaPoshta } from "./enum/RegionNovaPoshta.enum";

const regionDelivery = (region: string | undefined) => {
    switch (region) {
        case "Вінницька область":
            return RegionDelivery.REF_VN_REGION_ID;
        case "Волинська область":
            return RegionDelivery.REF_VO_REGION_ID;
        case "Дніпропетровська область":
            return RegionDelivery.REF_DP_REGION_ID;
        case "Донецька область":
            return RegionDelivery.REF_DN_REGION_ID;
        case "Донецька область АТО":
            return RegionDelivery.REF_DN_ATO_REGION_ID;
        case "Житомирська область":
            return RegionDelivery.REF_GI_REGION_ID;
        case "Закарпатська область":
            return RegionDelivery.REF_ZA_REGION_ID;
        case "Запорізька область":
            return RegionDelivery.REF_ZP_REGION_ID;
        case "Івано-Франківська область":
            return RegionDelivery.REF_IF_REGION_ID;
        case "Київ":
            return RegionDelivery.REF_KI_REGION_ID;
        case "Київська область":
            return RegionDelivery.REF_KI_OBL_REGION_ID;
        case "Кіровоградська область":
            return RegionDelivery.REF_KIR_REGION_ID;
        case "Луганська область":
            return RegionDelivery.REF_LG_REGION_ID;
        case "Луганська область АТО":
            return RegionDelivery.REF_LG_ATO_REGION_ID;
        case "Львівська область":
            return RegionDelivery.REF_LV_REGION_ID;
        case "Миколаївська область":
            return RegionDelivery.REF_MI_REGION_ID;
        case "Одеська область":
            return RegionDelivery.REF_OD_REGION_ID;
        case "Полтавська область":
            return RegionDelivery.REF_PO_REGION_ID;
        case "Рівненська область":
            return RegionDelivery.REF_RI_REGION_ID;
        case "Сумська область":
            return RegionDelivery.REF_SU_REGION_ID;
        case "Тернопільська область":
            return RegionDelivery.REF_TE_REGION_ID;
        case "Харківська область":
            return RegionDelivery.REF_KHA_REGION_ID;
        case "Херсонська область":
            return RegionDelivery.REF_HER_REGION_ID;
        case "Хмельницька область":
            return RegionDelivery.REF_HML_REGION_ID;
        case "Черкаська область":
            return RegionDelivery.REF_CHE_REGION_ID;
        case "Чернівецька область":
            return RegionDelivery.REF_CHV_REGION_ID;
        case "Чернігівська область":
            return RegionDelivery.REF_CHG_REGION_ID;
    }
}

const regionNovaPoshata = (region: string | undefined) => {
    switch (region) {
        case "АРК":
            return RegionNovaPoshta.REGION_APK_REF;
        case "Вінницька область":
            return RegionNovaPoshta.REGION_VN_REF;
        case "Волинська область":
            return RegionNovaPoshta.REGION_VO_REF;
        case "Дніпропетровська область":
            return RegionNovaPoshta.REGION_DP_REF;
        case "Донецька область":
            return RegionNovaPoshta.REGION_DN_REF;
        case "Житомирська область":
            return RegionNovaPoshta.REGION_GI_REF;
        case "Закарпатська область":
            return RegionNovaPoshta.REGION_ZK_REF;
        case "Запорізька область":
            return RegionNovaPoshta.REGION_ZP_REF;
        case "Івано-Франківська область":
            return RegionNovaPoshta.REGION_IF_REF;
        case "Київська область":
            return RegionNovaPoshta.REGION_KI_REF;
        case "Кіровоградська область":
            return RegionNovaPoshta.REGION_KIR_REF;
        case "Луганська область":
            return RegionNovaPoshta.REGION_LG_REF;
        case "Львівська область":
            return RegionNovaPoshta.REGION_LV_REF;
        case "Миколаївська область":
            return RegionNovaPoshta.REGION_MI_REF;
        case "Одеська область":
            return RegionNovaPoshta.REGION_OD_REF;
        case "Полтавська область":
            return RegionNovaPoshta.REGION_PO_REF;
        case "Рівненська область":
            return RegionNovaPoshta.REGION_RV_REF;
        case "Сумська область":
            return RegionNovaPoshta.REGION_SU_REF;
        case "Тернопільська область":
            return RegionNovaPoshta.REGION_TR_REF;
        case "Харківська область":
            return RegionNovaPoshta.REGION_KH_REF;
        case "Херсонська область":
            return RegionNovaPoshta.REGION_KHE_REF;
        case "Хмельницька область":
            return RegionNovaPoshta.REGION_KHM_REF;
        case "Черкаська область":
            return RegionNovaPoshta.REGION_CHE_REF;
        case "Чернівецька область":
            return RegionNovaPoshta.REGION_CHV_REF;
        case "Чернігівська область":
            return RegionNovaPoshta.REGION_CHG_REF;
    }
}

export {
    regionDelivery,
    regionNovaPoshata
}