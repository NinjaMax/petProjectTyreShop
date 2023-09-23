import React, { useContext, useEffect, useState } from 'react';
import '../../css/BasketCss/BasketNavBar.css';
import shoppingCart from '../../assets/icons/shopping_cart64Clear.png';
import shoppingCartFull from '../../../public/iconsCart/shopping_cart_full_94.png';
import { getBasketOrder } from '../../restAPI/restGoodsApi';
import { yieldToMain } from '../../restAPI/postTaskAdmin';
import { observer } from 'mobx-react-lite';
import { Context } from '../../context/Context';

interface IBasketNav {
  setActive():void;
}

const BasketNavBar = observer(({setActive}: IBasketNav) => {
  const { page, customer } = useContext<any | null>(Context);

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
            page.setBasketCount(getBasket?.basket_storage.reduce(
              (sum: number, current: any) => (sum + current.quantity),0)
            ); 
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
  },[page]);

  return (
    <div className='basketNav' onClick={setActive}>
      <a href='/basket'>
      {page.basketCount !== 0 ?       
        <img id='imgBasketNav' src={'/iconsCart/shopping_cart_full_94.png'}  alt='basketNav'/>
      :
        <img id='imgBasketNav' src={'/iconsCart/shopping_cart_94.png'}  alt='basketNav'/>
      }
      </a>
    {page.basketCount !== 0 ?
      <div className='basketNavCount'>
        <span className= {!customer ? 'basketNavCountNum' : 'basketNavCountNum active'}>
          {page.basketCount}
        </span>
      </div>
      : null}
    </div>
  );
});

export default BasketNavBar;