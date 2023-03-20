import React from 'react';

import BreadCrumbs from '../components/BreadCrumbs';
import BasketOrder from '../components/basket/BasketOrder';

const Basket = () => {
    return (
        <div>
            <BreadCrumbs ref={undefined} hrefTitle={undefined}/>
            <BasketOrder/>
        </div>
    );
};

export default Basket;