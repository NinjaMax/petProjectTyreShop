import React from 'react';
import shoppingCart from '../../assets/icons/shopping_cart64Clear.png';
import '../../css/BasketCss/BasketNav.css';

const BasketNav = () => {
    return (
        <div className='basketNav'>
           
              <img id='imgBasketNav' src={shoppingCart}  alt='basketNav'/>  
             
        </div>
    );
};

export default BasketNav;