import React from 'react';
import '../../css/CardsCss/OptionsTyreBox.css';

const OptionsTyreBox = ({character}: any) => {
    return (
        <div className='optionsTyreBox'>
            <div className="tooltipCardTyres">
                <span>Ширина: {character?.width?.width}
                    <span className="tooltipTextCardTyres">Ширина профіля шини</span>
                </span>
            </div>
            <div className="tooltipCardTyres">
                <span>Висота: {character?.height?.height}
                    <span className="tooltipTextCardTyres">Висота профіля шини</span>
                </span>
            </div>
            <div className="tooltipCardTyres">
                <span>Діаметр: {character?.diameter?.diameter}
                    <span className="tooltipTextCardTyres">Посадочний діаметр шини</span>                        
                </span>
            </div>
            <div className="tooltipCardTyres">
                <span>Бренд: {character?.tyre_brand?.brand}
                    <span className="tooltipTextCardTyres">Виробник шини</span>
                </span>
            </div>
            <div className="tooltipCardTyres">
                <span>Сезон: {character?.season?.season_ua}
                    <span className="tooltipTextCardTyres">Сезон використування шини</span>
                </span>
            </div>
            <div className="tooltipCardTyres">
                <span>Рік виробництва: {character?.year?.manufacture_year}
                    <span className="tooltipTextCardTyres">Рік виробництва шини</span>
                </span>
            </div>
            <div className="tooltipCardTyres">
                <span>Країна виробництва: {character?.country?.country_manufacturer_ua}
                    <span className="tooltipTextCardTyres">Країна виробництва шини</span>
                </span>
            </div>
        </div>
    );
};

export default OptionsTyreBox;