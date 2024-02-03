import { RegionDelivery } from "./enum/RegionDelivery.enum";
import { RegionNovaPoshta } from "./enum/RegionNovaPoshta.enum";

const regionDelivery = (region:  string |undefined) => {
    switch (region) {
        case "Вінницька область":
        case "Винницкая область":
        case "vіnnitska":
            return RegionDelivery.REF_VN_REGION_ID;
        case "Волинська область":
        case "Волынская область":
        case "volinskaya":
        case "volinska":
            return RegionDelivery.REF_VO_REGION_ID;
        case "Дніпропетровська область":
        case "Днепропетровская область":
        case "dnepropetrovskaya":
        case "dnіpropetrovska":
            return RegionDelivery.REF_DP_REGION_ID;
        case "Донецька область":
        case "Донецкая область":
        case "donetskaya":
        case "donetska":
            return RegionDelivery.REF_DN_REGION_ID;
        case "Донецька область АТО":
            return RegionDelivery.REF_DN_ATO_REGION_ID;
        case "Житомирська область":
        case "Житомирская область":
        case "zhitomirskaya":
        case "zhitomirska":
            return RegionDelivery.REF_GI_REGION_ID;
        case "Закарпатська область":
        case "Закарпатская область":
        case "zakarpatskaya":
        case "zakarpatska":
            return RegionDelivery.REF_ZA_REGION_ID;
        case "Запорізька область":
        case "Запорожская область":
        case "zaporozhskaya":
        case "zaporіzka":
            return RegionDelivery.REF_ZP_REGION_ID;
        case "Івано-Франківська область":
        case "Ивано-Франковская область":
        case "frankovsk":
        case "frankіvsk":
            return RegionDelivery.REF_IF_REGION_ID;
        case "Київ":
            return RegionDelivery.REF_KI_REGION_ID;
        case "Київська область":
        case "Киевская область":
        case "kievskaya":
        case "kiїvska":
            return RegionDelivery.REF_KI_OBL_REGION_ID;
        case "Кіровоградська область":
        case "Кировоградская область":
        case "kirovogradskaya":
        case "kіrovogradska":
            return RegionDelivery.REF_KIR_REGION_ID;
        case "Луганська область":
        case "Луганская область":
        case "luganskaya":
        case "luganska":
            return RegionDelivery.REF_LG_REGION_ID;
        case "Луганська область АТО":
            return RegionDelivery.REF_LG_ATO_REGION_ID;
        case "Львівська область":
        case "Львовская область":
        case "lvovskaya":
        case "lvіvska":
            return RegionDelivery.REF_LV_REGION_ID;
        case "Миколаївська область":
        case "Николаевская область":
        case "nikolaevskaya":
        case "mikolaїvska":
            return RegionDelivery.REF_MI_REGION_ID;
        case "Одеська область":
        case "Одесская область":
        case "odesskaya":
        case "odeska":
            return RegionDelivery.REF_OD_REGION_ID;
        case "Полтавська область":
        case "Полтавская область":
        case "poltavskaya":
        case "poltavska":
            return RegionDelivery.REF_PO_REGION_ID;
        case "Рівненська область":
        case "Ровненская область":
        case "rovnenskaya":
        case "rіvnenska":
            return RegionDelivery.REF_RI_REGION_ID;
        case "Сумська область":
        case "Сумская область":
        case "sumskaya":
        case "sumska":
            return RegionDelivery.REF_SU_REGION_ID;
        case "Тернопільська область":
        case "Тернопольская область":
        case "ternopolskaya":
        case "ternopіlska":
            return RegionDelivery.REF_TE_REGION_ID;
        case "Харківська область":
        case "Харьковская область":
        case "kharkovskaya":
        case "kharkіvska":
            return RegionDelivery.REF_KHA_REGION_ID;
        case "Херсонська область":
        case "Херсонская область":
        case "khersonskaya":
        case "khersonska":
            return RegionDelivery.REF_HER_REGION_ID;
        case "Хмельницька область":
        case "Хмельницкая область":
        case "khmelnitskaya":
        case "khmelnitska":
            return RegionDelivery.REF_HML_REGION_ID;
        case "Черкаська область":
        case "Черкасская область":
        case "cherkasskaya":
        case "cherkaska":
            return RegionDelivery.REF_CHE_REGION_ID;
        case "Чернівецька область":
        case "Черновицкая область":
        case "chernovitskaya":
        case "chernіvetska":
            return RegionDelivery.REF_CHV_REGION_ID;
        case "Чернігівська область":
        case "Черниговская область":
        case "chernigovskaya":
        case "chernіgіvska":
            return RegionDelivery.REF_CHG_REGION_ID;
    }
}

const regionNovaPoshata = (region: string | undefined) => {
    switch (region) {
        case "АРК":
        case "ark":
            return RegionNovaPoshta.REGION_APK_REF;
        case "Вінницька область":
        case "Винницкая область":
        case "vіnnitska":
            return RegionNovaPoshta.REGION_VN_REF;
        case "Волинська область":
        case "Волынская область":
        case "volinskaya":
        case "volinska":
            return RegionNovaPoshta.REGION_VO_REF;
        case "Дніпропетровська область":
        case "Днепропетровская область":
        case "dnepropetrovskaya":
        case "dnіpropetrovska":
            return RegionNovaPoshta.REGION_DP_REF;
        case "Донецька область":
        case "Донецкая область":
        case "donetskaya":
        case "donetska":
            return RegionNovaPoshta.REGION_DN_REF;
        case "Житомирська область":
        case "Житомирская область":
        case "zhitomirskaya":
        case "zhitomirska":
            return RegionNovaPoshta.REGION_GI_REF;
        case "Закарпатська область":
        case "Закарпатская область":
        case "zakarpatskaya":
        case "zakarpatska":
            return RegionNovaPoshta.REGION_ZK_REF;
        case "Запорізька область":
        case "Запорожская область":
        case "zaporozhskaya":
        case "zaporіzka":
            return RegionNovaPoshta.REGION_ZP_REF;
        case "Івано-Франківська область":
        case "Ивано-Франковская область":
        case "frankovsk":
        case "frankіvsk":   
            return RegionNovaPoshta.REGION_IF_REF;
        case "Київська область":
        case "Киевская область":
        case "kievskaya":
        case "kiїvska":
            return RegionNovaPoshta.REGION_KI_REF;
        case "Кіровоградська область":
        case "Кировоградская область":
        case "kirovogradskaya":
        case "kіrovogradska":
            return RegionNovaPoshta.REGION_KIR_REF;
        case "Луганська область":
        case "Луганская область":
        case "luganskaya":
        case "luganska":
            return RegionNovaPoshta.REGION_LG_REF;
        case "Львівська область":
        case "Львовская область":
        case "lvovskaya":
        case "lvіvska":
            return RegionNovaPoshta.REGION_LV_REF;
        case "Миколаївська область":
        case "Николаевская область":
        case "nikolaevskaya":
        case "mikolaїvska":
            return RegionNovaPoshta.REGION_MI_REF;
        case "Одеська область":
        case "Одесская область":
        case "odesskaya":
        case "odeska":
            return RegionNovaPoshta.REGION_OD_REF;
        case "Полтавська область":
        case "Полтавская область":
        case "poltavskaya":
        case "poltavska":
            return RegionNovaPoshta.REGION_PO_REF;
        case "Рівненська область":
        case "Ровненская область":
        case "rovnenskaya":
        case "rіvnenska":
            return RegionNovaPoshta.REGION_RV_REF;
        case "Сумська область":
        case "Сумская область":
        case "sumskaya":
        case "sumska":
            return RegionNovaPoshta.REGION_SU_REF;
        case "Тернопільська область":
        case "Тернопольская область":
        case "ternopolskaya":
        case "ternopіlska":
            return RegionNovaPoshta.REGION_TR_REF;
        case "Харківська область":
        case "Харьковская область":
        case "kharkovskaya":
        case "kharkіvska":
            return RegionNovaPoshta.REGION_KH_REF;
        case "Херсонська область":
        case "Херсонская область":
        case "khersonskaya":
        case "khersonska":
            return RegionNovaPoshta.REGION_KHE_REF;
        case "Хмельницька область":
        case "Хмельницкая область":
        case "khmelnitskaya":
        case "khmelnitska":
            return RegionNovaPoshta.REGION_KHM_REF;
        case "Черкаська область":
        case "Черкасская область":
        case "cherkasskaya":
        case "cherkaska":
            return RegionNovaPoshta.REGION_CHE_REF;
        case "Чернівецька область":
        case "Черновицкая область":
        case "chernovitskaya":
        case "chernіvetska":
            return RegionNovaPoshta.REGION_CHV_REF;
        case "Чернігівська область":
        case "Черниговская область":
        case "chernigovskaya":
        case "chernіgіvska":
            return RegionNovaPoshta.REGION_CHG_REF;
    }
}

const regionDataUa = (region:  string | undefined) => {
    switch (region) {
        case "vіnnitska":
            return "Вінниця,Вінницька область";
        case "volinskaya":
        case "volinska":
            return "Луцьк,Волинська область";
        case "dnepropetrovskaya":
        case "dnіpropetrovska":
            return "Дніпро,Дніпропетровська область";
        case "donetskaya":
        case "donetska":
            return "Краматорськ Донецька область";
        // case "Донецька область АТО":
        //     return RegionDelivery.REF_DN_ATO_REGION_ID;
        case "zhitomirskaya":
        case "zhitomirska":
            return "Житомир,Житомирська область";
        case "zakarpatskaya":
        case "zakarpatska":
            return "Ужгород Закарпатська область";
        case "zaporozhskaya":
        case "zaporіzka":
            return "Запоріжжя,Запорізька область";
        case "frankovsk":
        case "frankіvsk":
            return "Івано-Франківськ,Івано-Франківська область";
        // case "Київ":
        //     return RegionDelivery.REF_KI_REGION_ID;
        case "kievskaya":
        case "kiїvska":
            return "Київ,Київська область";
        case "kirovogradskaya":
        case "kіrovogradska":
            return "Кропивницький,Кіровоградська область";
        case "luganskaya":
        case "luganska":
            return "Луганськ,Луганська область";
        // case "Луганська область АТО":
        //     return RegionDelivery.REF_LG_ATO_REGION_ID;
        case "lvovskaya":
        case "lvіvska":
            return "Львів,Львівська область";
        case "nikolaevskaya":
        case "mikolaїvska":
            return "Миколаїв,Миколаївська область";
        case "odesskaya":
        case "odeska":
            return "Одеса,Одеська область";
        case "poltavskaya":
        case "poltavska":
            return  "Полтава,Полтавська область";
        case "rovnenskaya":
        case "rіvnenska":
            return "Рівне,Рівненська область";
        case "sumskaya":
        case "sumska":
            return "Суми,Сумська область";
        case "ternopolskaya":
        case "ternopіlska":
            return "Тернопіль,Тернопільська область";
        case "kharkovskaya":
        case "kharkіvska":
            return "Харків,Харківська область";
        case "khersonskaya":
        case "khersonska":
            return "Херсон,Херсонська область";
        case "khmelnitskaya":
        case "khmelnitska":
            return "Хмельницький,Хмельницька область";
        case "cherkasskaya":
        case "cherkaska":
            return "Черкаси,Черкаська область";
        case "chernovitskaya":
        case "chernіvetska":
            return "Чернівці,Чернівецька область";
        case "chernigovskaya":
        case "chernіgіvska":
            return "Чернігів,Чернігівська область";
    }
}

const regionDataRu = (region:  string | undefined) => {
    switch (region) {
        case "vіnnitska":
            return "Винница,Винницкая область";
        case "volinskaya":
        case "volinska":
            return "Луцк,Волынская область";
        case "dnepropetrovskaya":
        case "dnіpropetrovska":
            return "Днепр,Днепропетровская область";
        case "donetskaya":
        case "donetska":
            return "Краматорск,Донецкая область";
        // case "Донецька область АТО":
        //     return RegionDelivery.REF_DN_ATO_REGION_ID;
        case "zhitomirskaya":
        case "zhitomirska":
            return "Житомир,Житомирская область";
        case "zakarpatskaya":
        case "zakarpatska":
            return "Ужгород,Закарпатская область";
        case "zaporozhskaya":
        case "zaporіzka":
            return "Запорожье,Запорожская область";
        case "frankovsk":
        case "frankіvsk":
            return "Ивано-Франковск,Ивано-Франковская область";
        // case "Київ":
        //     return RegionDelivery.REF_KI_REGION_ID;
        case "kievskaya":
        case "kiїvska":
            return "Киев,Киевская область";
        case "kirovogradskaya":
        case "kіrovogradska":
            return "Кропивницький,Кировоградская область";
        case "luganskaya":
        case "luganska":
            return "Луганск,Луганская область";
        // case "Луганська область АТО":
        //     return RegionDelivery.REF_LG_ATO_REGION_ID;
        case "lvovskaya":
        case "lvіvska":
            return "Львов,Львовская область";
        case "nikolaevskaya":
        case "mikolaїvska":
            return "Николаев,Николаевская область";
        case "odesskaya":
        case "odeska":
            return "Одесса,Одесская область";
        case "poltavskaya":
        case "poltavska":
            return "Полтава,Полтавская область";
        case "rovnenskaya":
        case "rіvnenska":
            return "Ровно,Ровненская область";
        case "sumskaya":
        case "sumska":
            return "Сумы Сумская область";
        case "ternopolskaya":
        case "ternopіlska":
            return "Тернополь,Тернопольская область";
        case "kharkovskaya":
        case "kharkіvska":
            return "Харьков,Харьковская область";
        case "khersonskaya":
        case "khersonska":
            return "Херсон,Херсонская область";
        case "khmelnitskaya":
        case "khmelnitska":
            return "Хмельницкий,Хмельницкая область";
        case "cherkasskaya":
        case "cherkaska":
            return "Черкасы,Черкасская область";
        case "chernovitskaya":
        case "chernіvetska":
            return "Черновцы,Черновицкая область";
        case "chernigovskaya":
        case "chernіgіvska":
            return "Чернигов,Черниговская область";
    }
}

export {
    regionDelivery,
    regionNovaPoshata,
    regionDataUa,
    regionDataRu
}