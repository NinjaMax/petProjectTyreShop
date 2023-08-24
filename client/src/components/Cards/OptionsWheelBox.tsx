import React from 'react';
import '../../css/CardsCss/OptionsTyreBox.css';

const OptionsWheelBox = ({character}: any) => {
    return (
        <div className='optionsTyreBox'>
            <div className="tooltipCardTyres">
                <span>Ширина: {character?.width?.width}
                    <span className="tooltipTextCardTyres">Ширина диску</span>
                </span>
            </div>
            <div className="tooltipCardTyres">
                <span>Кількість болтів: {character?.bolt_count?.bolt_count}
                    <span className="tooltipTextCardTyres">Кількість отворів для болтів</span>
                </span>
            </div>
            <div className="tooltipCardTyres">
                <span>Діаметр: {character?.diameter.diameter}
                    <span className="tooltipTextCardTyres">Посадочний діаметр диска</span>                        
                </span>
            </div>
            <div className="tooltipCardTyres">
                <span>Бренд: {character?.wheel_brand?.brand}
                    <span className="tooltipTextCardTyres">Виробник диска</span>
                </span>
            </div>
            <div className="tooltipCardTyres">
                <span>Тип диску: {character?.season?.season_ua}
                    <span className="tooltipTextCardTyres">Тип використання диску</span>
                </span>
            </div>
            <div className="tooltipCardTyres">
                <span>Колір: {character?.color?.color}
                    <span className="tooltipTextCardTyres">Колір диску</span>
                </span>
            </div>
            <div className="tooltipCardTyres">
                <span>Виліт ET: {character?.et?.et}
                    <span className="tooltipTextCardTyres">Виліт диска від ступиці</span>
                </span>
            </div>
        </div>
    );
};

export default OptionsWheelBox;