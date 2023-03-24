import React from 'react';
import BreadCrumbs from '../components/BreadCrumbs';
import BasketOrder from '../components/basket/BasketOrder';

const Basket = () => {
    return (
        <div>
            <BreadCrumbs route={['/','/basket']} hrefTitle={['Home','Basket']}/>
            <BasketOrder/>
        </div>
    );
};

export default Basket;