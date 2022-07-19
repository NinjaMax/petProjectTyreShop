import React from 'react';
import shoppingCart from '../../assets/icons/shopping_cart64Clear.png';
import '../../css/BasketCss/BasketNavBar.css';

const BasketNavBar = () => {
    return (
        <div className='basketNav'>
           
            <img id='imgBasketNav' src={shoppingCart}  alt='basketNav'/>  
            <div className='basketNavCount'>20</div>
        </div>
    );
};

export default BasketNavBar;