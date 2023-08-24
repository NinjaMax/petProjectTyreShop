import React from 'react';
import '../../css/Goods/PropertiesGoods.css';
import { IPropsTyre } from './interfaces/PropsTyre.interface';

const PropertiesWheelGoods = ({product}:IPropsTyre) => {
    return (
        <div className='propertiesGoods'>
            <div className="tooltiPropertiesGoods">
                    <span>Ширина: {product?.width?.width}
                        <span className="tooltiTextPropertiesGoods">Ширина профиля диску</span>
                    </span>
                </div>
                <div className="tooltiPropertiesGoods">
                    <span>Міжболтова відстань PCD: {product?.pcd?.pcd}
                        <span className="tooltiTextPropertiesGoods">Відстань між отворів для болтів</span>
                    </span>
                </div>
                <div className="tooltiPropertiesGoods">
                    <span>Діаметр: {product?.diameter?.diameter}
                        <span className="tooltiTextPropertiesGoods">Посадковий діаметр диску</span>                        
                    </span>
                </div>
                <div className="tooltiPropertiesGoods">
                    <span>Бренд: {product?.wheel_brand?.brand}
                        <span className="tooltiTextPropertiesGoods">Виробник диска</span>
                    </span>
                </div>
                <div className="tooltiPropertiesGoods">
                    <span>Модель: {product?.wheel_model?.model}
                        <span className="tooltiTextPropertiesGoods">Модель бренда</span>
                    </span>
                </div>
                <div className="tooltiPropertiesGoods">
                    <span>Тип диску: {product?.type?.type}
                        <span className="tooltiTextPropertiesGoods">Тип виробленного диску</span>
                    </span>
                </div>
                <div className="tooltiPropertiesGoods">
                    <span>Виліт ET: {product?.et?.et}
                        <span className="tooltiTextPropertiesGoods">Виліт диска ET від ступиці </span>
                    </span>
                </div>
                <div className="tooltiPropertiesGoods">
                    <span>Діаметр отвору DIA: {product?.dia?.dia}
                        <span className="tooltiTextPropertiesGoods">Діаметр посадкового отвору на ступицю DIA</span>
                    </span>
                </div>
                <div className="tooltiPropertiesGoods">
                    <span>Колір: {product?.color?.color}
                        <span className="tooltiTextPropertiesGoods">Колір диску </span>
                    </span>
                </div>
                <div className="tooltiPropertiesGoods">
                    <span>Міжботова відстать додатково PCD2: {product?.pcd2?.pcd2}
                        <span className="tooltiTextPropertiesGoods">Міжболтова відстань додатково PCD2 для отворів</span>
                    </span>
                </div>
                <div className="tooltiPropertiesGoods">
                    <span>Кількість болтів та міжболтова відстань: {product?.bolt_count_pcd?.bolt_count_pcd}
                        <span className="tooltiTextPropertiesGoods">Кількість болтів диска та міжболтова відстать між ними</span>
                    </span>
                </div>
                <div className="tooltiPropertiesGoods">
                    <span>Кількість отворів для болтів: {product?.bolt_count?.bolt_count}
                        <span className="tooltiTextPropertiesGoods">Кількість отворів для болтів диску</span>
                    </span>
                </div>
                <div className="tooltiPropertiesGoods">
                    <span>Повне наіменування диску: {product?.full_name_color}
                        <span className="tooltiTextPropertiesGoods">Повна назва товару з кольором</span>
                    </span>
                </div>
        </div>
    );
};

export default PropertiesWheelGoods;