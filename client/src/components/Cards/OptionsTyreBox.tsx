import React from 'react';
import '../../css/CardsCss/OptionsTyreBox.css';

const OptionsTyreBox = ({character}: any) => {
    return (
        <div className='optionsTyreBox'>
            <div className="tooltipCardTyres">
                <span>Ширина: {character.width.width}
                    <span className="tooltipTextCardTyres">Ширина профиля шины</span>
                </span>
            </div>
            <div className="tooltipCardTyres">
                <span>Высота: {character.height.height}
                    <span className="tooltipTextCardTyres">Высота профиля шины</span>
                </span>
            </div>
            <div className="tooltipCardTyres">
                <span>Диаметр: {character.diameter.diameter}
                    <span className="tooltipTextCardTyres">Посадочный диаметр шины</span>                        
                </span>
            </div>
            <div className="tooltipCardTyres">
                <span>Бренд: {character.tyre_brand.brand}
                    <span className="tooltipTextCardTyres">Производитель шины</span>
                </span>
            </div>
            <div className="tooltipCardTyres">
                <span>Сезон: {character.season.season}
                    <span className="tooltipTextCardTyres">Сезон применения шины</span>
                </span>
            </div>
            <div className="tooltipCardTyres">
                <span>Год производства: {character.year.manufacture_year}
                    <span className="tooltipTextCardTyres">Год производства шины</span>
                </span>
            </div>
            <div className="tooltipCardTyres">
                <span>Страна производства: {character.country.country_manufacturer_ua}
                    <span className="tooltipTextCardTyres">Страна производства шины</span>
                </span>
            </div>
        </div>
    );
};

export default OptionsTyreBox;