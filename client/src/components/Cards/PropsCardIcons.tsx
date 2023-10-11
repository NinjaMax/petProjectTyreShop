import React, { useEffect, useState } from 'react';
import '../../css/CardsCss/PropsCardIcon.css';
import { IProps } from '../../services/types/PropsGoods.type';
import { TyreType } from '../../services/enum/PropsTyreType';
import { TyreSeasons } from '../../services/enum/PropsTyreSeason';
import { seasonCar, typeCar } from '../../services/tyresPropsService';
import { typeWheels } from '../../services/wheelsProps.service';
import { homologationByCar } from '../../services/homologation';

const PropsCardIcons = ({type, type_wheel, season, homologation}:IProps) => {
    const [showType, setShowType]   = useState<string>(TyreType.NO_TYPE);
    const [showSeason, setShowSeason] = useState<string>(TyreSeasons.NOSEASON_SEASON);
    const [showWheelsType, setShowWheelsType] = useState<string>(TyreSeasons.NOSEASON_SEASON);
    const [showHomologation, setShowHomologation] = useState<string>(TyreType.NO_TYPE);

    useEffect(() => {
        let isSetFlag = false;
        const setProps = async () => {
        const seasonTyre = seasonCar(season?.season ?? season);
        const typeTyre = typeCar(type?.vehicle_type);
        const typesOfWheel = typeWheels(type_wheel?.type);
        const homologationCar = homologationByCar(homologation?.homologation ?? TyreType.NO_TYPE);
            if (!isSetFlag && seasonTyre) {
                setShowSeason(seasonTyre);
            } 
            if(!isSetFlag && typeTyre) {
                setShowType(typeTyre);
            }  
            if(!isSetFlag && typesOfWheel) {
                setShowWheelsType(typesOfWheel);
            } 
            if(!isSetFlag && typesOfWheel) {
                setShowWheelsType(typesOfWheel);
            } 
            if(!isSetFlag && homologationCar) {
                setShowHomologation(homologationCar);
            } 
        }
        setProps();
        return () => {
            isSetFlag = true;
        }
    },[
        type?.vehicle_type, 
        season?.season, 
        season, 
        type_wheel?.type, 
        homologation?.homologation
    ]);

    console.log("HOMOLOGATION", homologation);

    return (
        <div className='propsCarIconBox'>
            { type ?
            <div className='propsCardIcons'>
                <img className='propsCarImg' src={showType} alt='typesCar'/>  
                <span className="tooltipTextCardIcons">
                Тип транспорту: {type?.vehicle_type_ua}
                </span>
            </div>
            : null   
            }
            {type_wheel ?
            <div className='propsCardIcons'>
                <img className='propsCarImg' src={showWheelsType} alt='seasons'/>
                <span className="tooltipTextCardIcons">
                Тип диску: {type_wheel?.type} диск
                </span>
            </div>
            :null  
            }
            {season ?
            <div className='propsCardIcons'>
                <img className='propsCarImg' src={showSeason} alt='seasons'/>
                <span className="tooltipTextCardIcons">
                Сезон: {season?.season_ua} шина
                </span>
            </div>
            :null  
            }
            {homologation?.homologation?.length !== 0 ?
            <div className='propsCardIcons'>
                <img className='propsCarImg' src={showHomologation} alt='homologation'/>
                <span className="tooltipTextCardIconsHom">
                Омологація-рекомендовані автовиробником для марки автомобіля.
                </span>
            </div>
            :null  
            }
        </div>
    );
};

export default PropsCardIcons;