import React from 'react';
import shoppingCart from '../../assets/icons/shopping_cart64Clear.png';
import '../../css/BasketCss/BasketNavBar.css';

const BasketNavBar = () => {
    return (
        <div className='basketNav'>
            <img id='imgBasketNav' src={shoppingCart}  alt='basketNav'/>  
            <div className='basketNavCount'><span>20</span></div>
            
        </div>
    );
};

export default BasketNavBar;