import React from 'react';
import '../../css/CardsCss/OptionsTyreBox.css';

const OptionsTyreBox = () => {
    return (
        <div className='optionsTyreBox'>   
                <div className="tooltipCardTyres">
                    <span>Ширина: 195
                        <span className="tooltipTextCardTyres">Ширина профиля шины</span>
                    </span>
                </div>
                <div className="tooltipCardTyres">
                    <span>Высота: 65
                        <span className="tooltipTextCardTyres">Высота профиля шины</span>
                    </span>
                </div>
                <div className="tooltipCardTyres">
                    <span>Диаметр: R15
                        <span className="tooltipTextCardTyres">Посадочный диаметр шины</span>                        
                    </span>
                </div>
                <div className="tooltipCardTyres">
                    <span>Бренд: Continental
                        <span className="tooltipTextCardTyres">Производитель шины</span>
                    </span>
                </div>
                <div className="tooltipCardTyres">
                    <span>Сезон: Летние
                        <span className="tooltipTextCardTyres">Сезон применения шины</span>
                    </span>
                </div>
                <div className="tooltipCardTyres">
                    <span>Год производства: 2022
                        <span className="tooltipTextCardTyres">Год производства шины</span>
                    </span>
                </div>
                <div className="tooltipCardTyres">
                    <span>Страна производства: Германия
                        <span className="tooltipTextCardTyres">Страна производства шины</span>
                    </span>
                </div>
            </div>
    );
};

export default OptionsTyreBox;