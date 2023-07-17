import React, { useEffect, useState } from 'react';
import '../../css/CardsCss/PropsCardIcon.css';
import { ITyreProps } from '../../services/types/TyreProps.type';
import { TyreType } from '../../services/enum/PropsTyreType';
import { TyreSeasons } from '../../services/enum/PropsTyreSeason';
import { seasonCar, typeCar } from '../../services/tyresPropsService';

const PropsCardIcons = ({type, season}:ITyreProps) => {
    const [showType, setShowType]   = useState<string>(TyreType.NO_TYPE);
    const [showSeason, setShowSeason] = useState<string>(TyreSeasons.NOSEASON_SEASON);

    useEffect(() => {
        let isSetFlag = false;
        const setFlag = async () => {
        const seasonTyre = seasonCar(season?.season ?? season);
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
    },[type?.vehicle_type, season?.season, season]);

    return (
        <div className='propsCarIconBox'>
            <div className='propsCardIcons'>
                <img className='propsCarImg' src={showType} alt='typesCar'/>  
                <span className="tooltipTextCardIcons">
                    Тип транспорту: {type?.vehicle_type_ua}
                </span>  
            </div>
            <div className='propsCardIcons'>
                <img className='propsCarImg' src={showSeason} alt='seasons'/>
                <span className="tooltipTextCardIcons">
                    Сезон: {season?.season_ua} шина
                </span>
            </div>
        </div>
    );
};

export default PropsCardIcons;