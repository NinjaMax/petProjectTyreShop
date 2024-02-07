import React, { useEffect, useState } from 'react';
import '../../css/CardsCss/PropsCardIcon.css';
import { IProps } from '../../services/types/PropsGoods.type';
import { TyreType } from '../../services/enum/PropsTyreType';
import { TyreSeasons } from '../../services/enum/PropsTyreSeason';
import { seasonCar, typeCar } from '../../services/tyresPropsService';
import { typeWheels } from '../../services/wheelsProps.service';
import { homologationByCar } from '../../services/homologation';
import { useTranslation } from 'react-i18next';

const PropsCardIcons = ({type, type_wheel, season, homologation}:IProps) => {
    const [showType, setShowType]   = useState<string>(TyreType.NO_TYPE);
    const [showSeason, setShowSeason] = useState<string>(TyreSeasons.NOSEASON_SEASON);
    const [showWheelsType, setShowWheelsType] = useState<string>(TyreSeasons.NOSEASON_SEASON);
    const [showHomologation, setShowHomologation] = useState<string>(TyreType.NO_TYPE);
    const { t, i18n } = useTranslation();

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

    return (
        <div className='propsCarIconBox'>
            { type ?
            <div className='propsCardIcons'>
                <img className='propsCarImg' src={showType} alt='typesCar'/>  
                <span className="tooltipTextCardIcons">
                Тип транспорта: {i18n.resolvedLanguage === 'uk' ? type?.vehicle_type_ua : type?.vehicle_type}
                </span>
            </div>
            : 
            <img 
                className='noPropsCarImg' 
                src='/iconFlags/empty_flag_48.png'
                alt="flags"
                loading='lazy'
            />   
            }
            {type_wheel ?
            <div className='propsCardIcons'>
                <img 
                    className='propsCarImg' 
                    src={showWheelsType} 
                    alt='seasons'
                    loading='lazy'
                />
                <span className="tooltipTextCardIcons">
                Тип диска: {type_wheel?.type} диск
                </span>
            </div>
            : null 
            }
            {season ?
            <div className='propsCardIcons'>
                <img className='propsCarImg' src={showSeason} alt='seasons'/>
                <span className="tooltipTextCardIcons">
                Сезон: {i18n.resolvedLanguage === 'uk' ? season?.season_ua : season?.season} шина
                </span>
            </div>
            : 
            <img 
                className='noPropsCarImg' 
                src='/iconFlags/empty_flag_48.webp'
                alt="flags"
                loading='lazy'
            />     
            }
            {homologation?.homologation?.length !== 0 && !type_wheel ?
            <div className='propsCardIcons'>
                <img 
                    className='propsCarImg' 
                    src={showHomologation} 
                    alt='homologation'
                    loading='lazy'
                />
                <span className="tooltipTextCardIconsHom">
                {i18n.resolvedLanguage === 'uk' ? 
                    'Омологація-рекомендовані автовиробником для марки транспорту' : 
                    'Омологация - рекомендация автопроизводителем для марки транспорта'
                }
                </span>
            </div>
            : 
            <img 
                className='noPropsCarImg' 
                src='/iconFlags/empty_flag_48.webp'
                alt="flags"
                loading='lazy'
            />     
            }
        </div>
    );
};

export default PropsCardIcons;