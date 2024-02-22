import React from 'react';
import BreadCrumbs from '../components/BreadCrumbs';
import BasketOrder from '../components/basket/BasketOrder';
import { useTranslation } from 'react-i18next';

const Basket = () => {
    const { i18n } = useTranslation();

    return (
        <div>
        <BreadCrumbs 
          route={[i18n.resolvedLanguage === 'uk' ? '/' : '/ru','/basket',]} 
          hrefTitle={['Інтернет-магазин SkyParts', 'Корзина']}
        />
            <BasketOrder/>
        </div>
    );
};

export default Basket;