import React, { useEffect, useState } from 'react';
import '../../css/CardsCss/FlagIcon.css';

enum IconFlag {
    BELARUS_FLAG = '/iconFlags/icons8-belarus-48.png',
    CHINA_FLAG = '/iconFlags/icons8-china-48.png',
    CANADA_FLAG = '/iconFlags/icons8-canada-48.png',
    CZECHREP_FLAG = '/iconFlags/icons8-czech-republic-48.png',
    FINLAND_FLAG = '/iconFlags/icons8-finland-48.png',
    EUROPA_FLAG = '/iconFlags/icons8-flag-of-europe-48.png',
    FRANCE_FLAG = '/iconFlags/icons8-france-48.png',
    GERMANY_FLAG = '/iconFlags/icons8-germany-48.png',
    GB_FLAG = '/iconFlags/icons8-great-britain-48.png',
    HUNGARY_FLAG = '/iconFlags/icons8-hungary-48.png',
    INDIA_FLAG = '/iconFlags/icons8-india-48.png',
    INDONESIA_FLAG = '/iconFlags/icons8-indonesia-48.png',
    IRAN_FLAG = '/iconFlags/icons8-iran-48.png',
    ITALY_FLAG = '/iconFlags/icons8-italy-48.png',
    JAPAN_FLAG = '/iconFlags/icons8-japan-48.png',
    LUXEMBURG_FLAG = '/iconFlags/icons8-luxembourg-48.png',
    MALAYSIA_FLAG = '/iconFlags/icons8-malaysia-48.png',
    NETHERLAND_FLAG = '/iconFlags/icons8-netherlands-48.png',
    POLAND_FLAG = '/iconFlags/icons8-poland-48.png',
    PORTUGAL_FLAG = '/iconFlags/icons8-portugal-48.png',
    ROMANIA_FLAG = '/iconFlags/icons8-romania-48.png',
    RUSSIA_FLAG = '/iconFlags/icons8-russian-federation-48.png',
    SERBIA_FLAG = '/iconFlags/icons8-serbia-48.png',
    SLOVAKIA_FLAG = '/iconFlags/icons8-slovakia-48.png',
    SLOVENIA_FLAG = '/iconFlags/icons8-slovenia-48.png',
    SOUTH_AFRICA_FLAG = '/iconFlags/icons8-south-africa-48.png',
    SOUTH_KOREA_FLAG = '/iconFlags/icons8-south-korea-48.png',
    SPAIN_FLAG = '/iconFlags/icons8-spain-48.png',
    SWEDEN_FLAG = '/iconFlags/icons8-ukraine-48.png',
    THAILAND_FLAG = '/iconFlags/icons8-thailand-48.png',
    TURKEY_FLAG = '/iconFlags/icons8-turkey-48.png',
    UKRAINE_FLAG = '/iconFlags/icons8-ukraine-48.png',
    USA_FLAG = '/iconFlags/icons8-usa-48.png',
    EMPTY_FLAG = '/iconFlags/icons8-noFlag-48.png',
}

const chooseFlag = (flagState: string | undefined) => {
    switch (flagState) {
        case 'Беларусь':
        case 'Білорусь':
            return IconFlag.BELARUS_FLAG;
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
        case 'Європа':
        case 'Европа':
            return IconFlag.EUROPA_FLAG;
        case "Франція":
        case "Франция":
            return IconFlag.FRANCE_FLAG;
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
        case 'Голандія':
        case 'Голандия':
            return IconFlag.NETHERLAND_FLAG;
        case 'Польша':
        case 'Польща':
            return IconFlag.POLAND_FLAG;
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
            return IconFlag.SLOVAKIA_FLAG;
        case 'Словения':
        case 'Словенія':
            return IconFlag.SLOVENIA_FLAG;
        case 'Південна Африка':
        case 'Южная Африка':
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
        case 'Україна':
        case 'Украина':
            return IconFlag.UKRAINE_FLAG;
        case 'США':
            return IconFlag.USA_FLAG;
        default:
            return IconFlag.EMPTY_FLAG;
    }
}

type Iflag = {
    country?: {
        country_manufacturer_ua: string;
        country_manufacturer: string;
    };
    year?: {
        manufacture_year: string;
    };
}

const FlagsIcon = ({country, year}:Iflag) => {
    const [showFlag, setShowFlag] = useState<string>();
    
    useEffect(() => {
        let isSetFlag = false;
        const setFlag = async () => {
            const flag = 
            chooseFlag(country?.country_manufacturer_ua);
            if (!isSetFlag && flag) {
                setShowFlag(flag);
            }   
        }
        setFlag();
        return () => {
            isSetFlag = true;
        }
    },[country?.country_manufacturer_ua])

    return (
        <div className='flagIconBox'>
            <div className='flagIcon'>
                <img 
                    className='imgFlag' 
                    src={showFlag}
                    alt="flags"/> 
                    
                    <span className="tooltipTextFlagIcons">
                    Країна виробник: {country?.country_manufacturer_ua}
                    </span>
            </div> 
            {country?.country_manufacturer_ua} {year?.manufacture_year}
        </div>
        
    );
};

export default FlagsIcon;