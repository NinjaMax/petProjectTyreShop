import React from 'react';

import BreadCrumbs from '../components/BreadCrumbs';
import BasketOrder from '../components/Basket/BasketOrder';

const Basket = () => {
    return (
        <div>
            <BreadCrumbs/>
            <BasketOrder/>
        </div>
    );
};

export default Basket;