import React, { useEffect, useState } from 'react';
import '../../css/CardsCss/PropsCardIcon.css';
// import seasonSummer from '../../assets/icons/iconsSeasons/seasonSummer.png';
// import passCar from '../../assets/icons/iconsTypeCar/londonCabClear64.png';
// import pickup from '../../assets/icons/iconsTypeCar/pickup.png';

enum TyreSeasons {
    SUMMER_SEASON = 'iconsSeasons/seasonSummer.png',
    WINTER_SEASON = 'iconsSeasons/seasonWinter.png',
    ALLSEASON_SEASON = 'iconsSeasons/seasonAll.png',
    NOSEASON_SEASON = 'iconsSeasons/noSeason.png',
};

enum TyreType {
    LEGRKOVOI_TYPE = 'iconsTypeCar/londonCabClear64.png',
    VNEDOROGNIK_TYPE = 'iconsTypeCar/pickup.png',
    LEGKOGRUZ_TYPE = 'iconsTypeCar/van.png',
    SELHOZ_TYPE = 'iconsTypeCar/tractor.png',
    SPECTEHNIKA_TYPE = 'iconsTypeCar/bulldozer.png',
    MOTO_TYPE = 'iconsTypeCar/scooter.png',
    TRUCK_TYPE = 'iconsTypeCar/truck.png',
    NO_TYPE = 'iconsTypeCar/noTypeCar.png',
};

type ITyreProps = {
    type?: { 
        vehicle_type: string,
        vehicle_type_ua: string,
    };
    season?:{
        season: string,
        season_ua: string
    };
}

const typeCar = (type: string | undefined) => {
    switch (type) {
        case 'легковой':
        case 'легковий':
            return TyreType.LEGKOGRUZ_TYPE;
        case 'внедорожник':
        case 'позахляховик':
            return TyreType.VNEDOROGNIK_TYPE;
        case 'легкогрузовой':
        case 'легковантажний':
            return TyreType.LEGKOGRUZ_TYPE;
        case 'сельхоз':
        case 'сільхоз':
            return TyreType.SELHOZ_TYPE;
        case 'спецтехника':
        case 'спецтехніка':
            return TyreType.SPECTEHNIKA_TYPE;
        case 'грузовой':
        case 'вантажний':
            return TyreType.TRUCK_TYPE
        case 'мото':
        //case 'всесезонна':
            return TyreType.MOTO_TYPE;
        default:
            return TyreType.NO_TYPE;
    }
}

const seasonCar = (season_vehicle: string | undefined) => {
    switch (season_vehicle) {
        case 'летняя':
        case 'літня':
            return TyreSeasons.SUMMER_SEASON;
        case 'зимняя':
        case 'зимова':
            return TyreSeasons.WINTER_SEASON;
        case 'всесезонная':
        case 'всесезонна':
            return TyreSeasons.ALLSEASON_SEASON;
        default:
            return TyreSeasons.NOSEASON_SEASON;
    }
}

const PropsCardIcons = ({type, season}:ITyreProps) => {
    const [showType, setShowType]   = useState<string>(TyreType.NO_TYPE);
    const [showSeason, setShowSeason] = useState<string>(TyreSeasons.NOSEASON_SEASON);

    useEffect(() => {
        let isSetFlag = false;
        const setFlag = async () => {
            const seasonTyre = 
            seasonCar(season?.season);
        const typeTyre = typeCar(type?.vehicle_type);
            if (!isSetFlag && seasonTyre) {
                setShowSeason(seasonTyre);
            } 
            if(!isSetFlag && typeTyre) {
                setShowType(typeTyre);
            }  
        }
        setFlag();
        return () => {
            isSetFlag = true;
        }
    },[season?.season, type?.vehicle_type])
    console.log('SHOW_TYPE_PROP: ', type);
    console.log('SHOW_SEASON_PROP: ', season);
    console.log('SHOW_TYPE: ', showType);
    console.log('SHOW_SEASON: ', showSeason);

    return (
        <div className='propsCardIcons'>
            <img src={showType} alt='typesCar'/>
            <img src={showSeason} alt='seasons'/>
        </div>
    );
};

export default PropsCardIcons;