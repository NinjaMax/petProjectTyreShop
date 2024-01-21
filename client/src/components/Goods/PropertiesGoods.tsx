import React from 'react';
import '../../css/Goods/PropertiesGoods.css';
import { IPropsTyre } from './interfaces/PropsTyre.interface';
import { useMediaQuery } from 'react-responsive';

const PropertiesGoods = ({product}:IPropsTyre) => {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    return (
        <div className='propertiesGoods'>
            <div className="tooltiPropertiesGoods">
                    <span className='tooltiPropertiesGoodsText'>
                        Ширина: {product?.width?.width}
                        {!isMobile ?
                          <span className="tooltiTextPropertiesGoods">Ширина профілю шини</span>
                          : null  
                        }
                    </span>
                </div>
                <div className="tooltiPropertiesGoods">
                    <span className='tooltiPropertiesGoodsText'>
                        Висота профіля: {product?.height?.height}
                        {!isMobile ?
                          <span className="tooltiTextPropertiesGoods">Висота профілю шини</span>   
                            : null
                        }
                    </span>
                </div>
                <div className="tooltiPropertiesGoods">
                    <span className='tooltiPropertiesGoodsText'>
                        Діаметр: {product?.diameter?.diameter}
                        {!isMobile ?
                          <span className="tooltiTextPropertiesGoods">Посадковий діаметр шини</span>                          
                            : null
                        }
                    </span>
                </div>
                <div className="tooltiPropertiesGoods">
                    <span className='tooltiPropertiesGoodsText'>
                        Бренд: {product?.tyre_brand?.brand}
                        {!isMobile ?
                          <span className="tooltiTextPropertiesGoods">Виробник шини</span>  
                            : null
                        }
                    </span>
                </div>
                <div className="tooltiPropertiesGoods">
                    <span className='tooltiPropertiesGoodsText'>
                        Модель: {product?.tyre_model?.model}
                        {!isMobile ?
                            <span className="tooltiTextPropertiesGoods">Модель бренда</span>
                            : null
                        }
                    </span>
                </div>
                <div className="tooltiPropertiesGoods">
                    <span className='tooltiPropertiesGoodsText'>
                        Сезон: {product?.season?.season_ua}
                        {!isMobile ?
                          <span className="tooltiTextPropertiesGoods">Сезон використання шини</span>  
                            : null
                        }
                    </span>
                </div>
                <div className="tooltiPropertiesGoods">
                    <span className='tooltiPropertiesGoodsText'>
                        Рік виробництва: {product?.year?.manufacture_year}
                        {!isMobile ?
                            <span className="tooltiTextPropertiesGoods">Рік виробництва шини</span>
                            : null
                        }
                    </span>
                </div>
                <div className="tooltiPropertiesGoods">
                    <span className='tooltiPropertiesGoodsText'>
                        Країна виробник: {product?.country?.country_manufacturer_ua}
                        {!isMobile ?
                          <span className="tooltiTextPropertiesGoods">Країна виробник шини</span>  
                            : null
                        }
                    </span>
                </div>
                <div className="tooltiPropertiesGoods">
                    <span className='tooltiPropertiesGoodsText'>
                        Тип транспортного засобу: {product?.vehicle_type?.vehicle_type_ua}
                        {!isMobile ?
                           <span className="tooltiTextPropertiesGoods">Тип призначення шини </span> 
                           : null
                        }
                    </span>
                </div>
                <div className="tooltiPropertiesGoods">
                    <span className='tooltiPropertiesGoodsText'>
                        Индекс навантаження: {product?.load_index?.load_index_with_desc}
                        {!isMobile ?
                           <span className="tooltiTextPropertiesGoods">Максимальньне навантаження на шину</span> 
                            : null
                        }
                    </span>
                </div>
                <div className="tooltiPropertiesGoods">
                    <span className='tooltiPropertiesGoodsText'>
                        Индекс швидкості: {product?.speed_index?.speed_index_with_desc}
                        {!isMobile ?
                           <span className="tooltiTextPropertiesGoods">Максимальная швидкість для шини</span> 
                            : null
                        }
                    </span>
                </div>
                <div className="tooltiPropertiesGoods">
                    <span className='tooltiPropertiesGoodsText'>
                        Шип / не шип: {product?.studded?.studded.length !== 0 ?
                        product?.studded?.studded : ''}
                        {!isMobile ?
                          <span className="tooltiTextPropertiesGoods">Шипованная або не шипована шина</span>  
                            : null
                        }
                    </span>
                </div>
                <div className="tooltiPropertiesGoods">
                    <span className='tooltiPropertiesGoodsText'>
                        Повне наіменування: {product?.full_name}
                        {!isMobile ?
                           <span className="tooltiTextPropertiesGoods">Повна назва товару</span> 
                            : null
                        }
                    </span>
                </div>
        </div>
    );
};

export default PropertiesGoods;