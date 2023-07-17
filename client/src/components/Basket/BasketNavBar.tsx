import React, { useEffect, useState } from 'react';
import '../../css/BasketCss/BasketNavBar.css';
import shoppingCart from '../../assets/icons/shopping_cart64Clear.png';
import { getBasketOrder } from '../../restAPI/restGoodsApi';
import { yieldToMain } from '../../restAPI/postTaskAdmin';


interface IBasketNav {
    setActive():void;
}

const BasketNavBar = ({setActive}: IBasketNav) => {
    const [goodsOrder, setGoodsOrder] = useState<any[]>();
    useEffect(() => {
        let isMounted = false;
        const basketOrder = async () => {
          const taskProduct: any[] = [
            getBasketOrder,
          ];
        let i: number = 0; 
        while (taskProduct.length > i) {
          if (!isMounted && taskProduct[i] === getBasketOrder) {
            const getBasket: any = await taskProduct[i]();
            if (getBasket) {
               setGoodsOrder([...getBasket?.basket_storage]); 
            }
          }
          const task = taskProduct.shift();
          task();
          await yieldToMain();
        }
        };
        basketOrder();
        return () => {
          isMounted = true;
        };
      },[]);

    return (
        <div className='basketNav' onClick={setActive}>
            <a href='/basket'>
                <img id='imgBasketNav' src={shoppingCart}  alt='basketNav'/>     
            </a>
            <div className='basketNavCount'>
                <div className='basketNavCountNum'>
                    {goodsOrder?.reduce((sum, current) => ( sum + current.quantity), 0)}
                </div>
            </div>
        </div>
    );
};

export default BasketNavBar;