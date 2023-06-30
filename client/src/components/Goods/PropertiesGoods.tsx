import React from 'react';
import '../../css/Goods/PropertiesGoods.css';
import { IPropsTyre } from './interfaces/PropsTyre.interface';

const PropertiesGoods = ({product}:IPropsTyre) => {
    return (
        <div className='propertiesGoods'>
            <div className="tooltiPropertiesGoods">
                    <span>Ширина: {product?.width?.width}
                        <span className="tooltiTextPropertiesGoods">Ширина профиля шины</span>
                    </span>
                </div>
                <div className="tooltiPropertiesGoods">
                    <span>Висота профіля: {product?.height?.height}
                        <span className="tooltiTextPropertiesGoods">Высота профиля шины</span>
                    </span>
                </div>
                <div className="tooltiPropertiesGoods">
                    <span>Діаметр: {product?.diameter?.diameter}
                        <span className="tooltiTextPropertiesGoods">Посадочный диаметр шины</span>                        
                    </span>
                </div>
                <div className="tooltiPropertiesGoods">
                    <span>Бренд: {product?.tyre_brand?.brand}
                        <span className="tooltiTextPropertiesGoods">Производитель шины</span>
                    </span>
                </div>
                <div className="tooltiPropertiesGoods">
                    <span>Модель: {product?.tyre_model?.model}
                        <span className="tooltiTextPropertiesGoods">Модель бренда</span>
                    </span>
                </div>
                <div className="tooltiPropertiesGoods">
                    <span>Сезон: {product?.season?.season_ua}
                        <span className="tooltiTextPropertiesGoods">Сезон применения шины</span>
                    </span>
                </div>
                <div className="tooltiPropertiesGoods">
                    <span>Рік виробництва: {product?.year?.manufacture_year}
                        <span className="tooltiTextPropertiesGoods">Год производства шины</span>
                    </span>
                </div>
                <div className="tooltiPropertiesGoods">
                    <span>Країна виробник: {product?.country?.country_manufacturer_ua}
                        <span className="tooltiTextPropertiesGoods">Страна производства шины</span>
                    </span>
                </div>
                <div className="tooltiPropertiesGoods">
                    <span>Тип транспортного засобу: {product?.vehicle_type?.vehicle_type_ua}
                        <span className="tooltiTextPropertiesGoods">Тип применения-назначения шин </span>
                    </span>
                </div>
                <div className="tooltiPropertiesGoods">
                    <span>Индекс навантаження: {product?.load_index?.load_index_with_desc}
                        <span className="tooltiTextPropertiesGoods">Максимальная нагрузка шины</span>
                    </span>
                </div>
                <div className="tooltiPropertiesGoods">
                    <span>Индекс швидкості: {product?.speed_index?.speed_index_with_desc}
                        <span className="tooltiTextPropertiesGoods">Максимальная скорость</span>
                    </span>
                </div>
                <div className="tooltiPropertiesGoods">
                    <span>Шип / не шип: {product?.studded?.studded.length !== 0 ?
                        product?.studded?.studded : ''}
                        <span className="tooltiTextPropertiesGoods">Шипованная или не шипованная шина</span>
                    </span>
                </div>
                <div className="tooltiPropertiesGoods">
                    <span>Повне наіменування: {product?.full_name}
                        <span className="tooltiTextPropertiesGoods">Повна назва товару</span>
                    </span>
                </div>
        </div>
    );
};

export default PropertiesGoods;