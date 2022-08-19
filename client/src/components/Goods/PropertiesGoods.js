import React from 'react';
import '../../css/Goods/PropertiesGoods.css';

const PropertiesGoods = () => {
    return (
        <div className='propertiesGoods'>
            <div className="tooltiPropertiesGoods">
                    <span>Ширина:195
                        <span className="tooltiTextPropertiesGoods">Ширина профиля шины</span>
                    </span>
                </div>
                <div className="tooltiPropertiesGoods">
                    <span>Высота: 65
                        <span className="tooltiTextPropertiesGoods">Высота профиля шины</span>
                    </span>
                </div>
                <div className="tooltiPropertiesGoods">
                    <span>Диаметр: R15
                        <span className="tooltiTextPropertiesGoods">Посадочный диаметр шины</span>                        
                    </span>
                </div>
                <div className="tooltiPropertiesGoods">
                    <span>Бренд: Continental
                        <span className="tooltiTextPropertiesGoods">Производитель шины</span>
                    </span>
                </div>
                <div className="tooltiPropertiesGoods">
                    <span>Сезон: Летние
                        <span className="tooltiTextPropertiesGoods">Сезон применения шины</span>
                    </span>
                </div>
                <div className="tooltiPropertiesGoods">
                    <span>Год производства: 2022
                        <span className="tooltiTextPropertiesGoods">Год производства шины</span>
                    </span>
                </div>
                <div className="tooltiPropertiesGoods">
                    <span>Страна производства: Германия
                        <span className="tooltiTextPropertiesGoods">Страна производства шины</span>
                    </span>
                </div>
        </div>
    );
};

export default PropertiesGoods;