import React from 'react';
import '../../css/Goods/PropertiesGoods.css';
import { IPropsTyre } from './interfaces/PropsTyre.interface';

const PropertiesGoods = ({product}:IPropsTyre) => {
    return (
        <div className='propertiesGoods'>
            <div className="tooltiPropertiesGoods">
                    <span>Ширина: {product?.width?.width}
                        <span className="tooltiTextPropertiesGoods">Ширина профілю шини</span>
                    </span>
                </div>
                <div className="tooltiPropertiesGoods">
                    <span>Висота профіля: {product?.height?.height}
                        <span className="tooltiTextPropertiesGoods">Висота профілю шини</span>
                    </span>
                </div>
                <div className="tooltiPropertiesGoods">
                    <span>Діаметр: {product?.diameter?.diameter}
                        <span className="tooltiTextPropertiesGoods">Посадковий діаметр шини</span>                        
                    </span>
                </div>
                <div className="tooltiPropertiesGoods">
                    <span>Бренд: {product?.tyre_brand?.brand}
                        <span className="tooltiTextPropertiesGoods">Виробник шини</span>
                    </span>
                </div>
                <div className="tooltiPropertiesGoods">
                    <span>Модель: {product?.tyre_model?.model}
                        <span className="tooltiTextPropertiesGoods">Модель бренда</span>
                    </span>
                </div>
                <div className="tooltiPropertiesGoods">
                    <span>Сезон: {product?.season?.season_ua}
                        <span className="tooltiTextPropertiesGoods">Сезон використання шини</span>
                    </span>
                </div>
                <div className="tooltiPropertiesGoods">
                    <span>Рік виробництва: {product?.year?.manufacture_year}
                        <span className="tooltiTextPropertiesGoods">Рік виробництва шини</span>
                    </span>
                </div>
                <div className="tooltiPropertiesGoods">
                    <span>Країна виробник: {product?.country?.country_manufacturer_ua}
                        <span className="tooltiTextPropertiesGoods">Країна виробник шини</span>
                    </span>
                </div>
                <div className="tooltiPropertiesGoods">
                    <span>Тип транспортного засобу: {product?.vehicle_type?.vehicle_type_ua}
                        <span className="tooltiTextPropertiesGoods">Тип призначення шини </span>
                    </span>
                </div>
                <div className="tooltiPropertiesGoods">
                    <span>Индекс навантаження: {product?.load_index?.load_index_with_desc}
                        <span className="tooltiTextPropertiesGoods">Максимальная нагрузка на шину</span>
                    </span>
                </div>
                <div className="tooltiPropertiesGoods">
                    <span>Индекс швидкості: {product?.speed_index?.speed_index_with_desc}
                        <span className="tooltiTextPropertiesGoods">Максимальная скорость для шини</span>
                    </span>
                </div>
                <div className="tooltiPropertiesGoods">
                    <span>Шип / не шип: {product?.studded?.studded.length !== 0 ?
                        product?.studded?.studded : ''}
                        <span className="tooltiTextPropertiesGoods">Шипованная або не шипована шина</span>
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