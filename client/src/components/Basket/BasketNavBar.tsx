import React from 'react';
import shoppingCart from '../../assets/icons/shopping_cart64Clear.png';
import '../../css/BasketCss/BasketNavBar.css';

const BasketNavBar = ({setActive}) => {
    return (
        <div className='basketNav' onClick={setActive}>
            <a href='/basket'>
                <img id='imgBasketNav' src={shoppingCart}  alt='basketNav'/>     
            </a>
            
            <div className='basketNavCount'><span>20</span></div>
            
        </div>
    );
};

export default BasketNavBar;