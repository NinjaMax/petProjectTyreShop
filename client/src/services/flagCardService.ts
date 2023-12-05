import { IconFlag } from "./enum/flagsIcon.enum";

const chooseFlag = (flagState: string | undefined) => {
    switch (flagState) {
        case 'Аргентина':
            return IconFlag.ARGENTINA_LOGO;
        case 'Беларусь':
        case 'Білорусь':
            return IconFlag.BELARUS_FLAG;
        case 'Болгария':
        case 'Болгарія':
            return IconFlag.BULGARIA_LOGO;
        case 'Бразилия':
        case 'Бразилія':
            return IconFlag.BRAZIL_LOGO;
        case 'Китай':
            return IconFlag.CHINA_FLAG;
        case 'Канада':
                return IconFlag.CANADA_FLAG;
        case 'Чехия':
        case 'Чеська Республіка':
            return IconFlag.CZECHREP_FLAG;
        case 'Фінляндія':
        case 'Финляндия':
            return IconFlag.FINLAND_FLAG;
        case 'Вьетнам':
        case "В'єтнам":
            return IconFlag.VIETNAM_LOGO;
        case 'Європа':
        case 'Европа':
            return IconFlag.EUROPA_FLAG;
        case 'Египет':
        case 'Єгипет':
            return IconFlag.EGYPT_LOGO;
        case "Франція":
        case "Франция":
            return IconFlag.FRANCE_FLAG;
        case "Филиппины":
        case "Філіппіни":
            return IconFlag.PHILIPINES_LOGO;
        case 'Германия':
        case 'Німеччина':
            return IconFlag.GERMANY_FLAG;
        case 'Великобритания':
        case 'Великобританія':
            return IconFlag.GB_FLAG;
        case 'Венгрия':
        case 'Угорщина':
            return IconFlag.HUNGARY_FLAG;
        case 'Індія':
        case 'Индия':
            return IconFlag.INDIA_FLAG;
        case 'Індонезія':
        case 'Индонезия':
            return IconFlag.INDONESIA_FLAG;
        case 'Іран':
        case 'Иран':
            return IconFlag.IRAN_FLAG;
        case 'Италия':
        case 'Італія':
            return IconFlag.ITALY_FLAG;
        case 'Япония':
        case 'Японія':
            return IconFlag.JAPAN_FLAG;
        case 'Люксембург':
            return IconFlag.LUXEMBURG_FLAG;
        case 'Малазія':
        case 'Малазия':
            return IconFlag.MALAYSIA_FLAG;
        case 'Мексика':
            return IconFlag.MEXICO_LOGO;
        case 'Голандія':
        case 'Голандия':
            return IconFlag.NETHERLAND_FLAG;
        case 'Польша':
        case 'Польща':
            return IconFlag.POLAND_FLAG;
        case 'Пакистан':
            return IconFlag.PAKISTAN_LOGO;
        case 'Португалія':
        case 'Португалия':
            return IconFlag.PORTUGAL_FLAG;
        case 'Румыния':
        case 'Румунія':
            return IconFlag.ROMANIA_FLAG;
        case 'Россия':
        case 'Росія':
            return IconFlag.RUSSIA_FLAG;
        case 'Сербия':
        case 'Сербія':
            return IconFlag.SERBIA_FLAG;
        case 'Словакія':
        case 'Словакия':
        case 'Словаччина':
            return IconFlag.SLOVAKIA_FLAG;
        case 'Словения':
        case 'Словенія':
            return IconFlag.SLOVENIA_FLAG;
        case 'Південна Африка':
        case 'Южная Африка':
        case 'ЮАР':
            return IconFlag.SOUTH_AFRICA_FLAG;
        case 'Корея':
            return IconFlag.SOUTH_KOREA_FLAG;
        case 'Испания':
        case 'Іспанія':
            return IconFlag.SPAIN_FLAG;
        case 'Швеція':
        case 'Швеция':
            return IconFlag.SWEDEN_FLAG;
        case 'Таиланд':
        case 'Таїланд':
            return IconFlag.THAILAND_FLAG;
        case 'Турция':
        case 'Туреччина':
            return IconFlag.TURKEY_FLAG;
        case 'Тайвань':
            return IconFlag.TAIWAN_LOGO;
        case 'Україна':
        case 'Украина':
            return IconFlag.UKRAINE_FLAG;
        case 'Узбекистан':
            return IconFlag.UZBEKISTAN_LOGO;
        case 'США':
            return IconFlag.USA_FLAG;
        
        default:
            return undefined;
    }
}

export {
    chooseFlag
}