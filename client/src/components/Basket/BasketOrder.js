import React from 'react';
import '../../css/BasketCss/BasketOrder.css';
import TyresCardList from '../Cards/TyresCardList';

const BasketOrder = () => {
    return (
        <div className='basketOrder'>
            Оформлення замовлення
            <div className='basketColmLeft'>
                данні замовлення
                <div>
                    <input className='inputBasketOrderName' 
                    type='text' 
                    name='basketOrderName' 
                    id='nameOrder' 
                    placeholder="Прізвище ім'я Побатькові *" 
                    required/>    
                </div>
                <div>
                    <input className='inputBasketOrderPhone' 
                    type='number' 
                    name='basketOrderPhone' 
                    id='phoneOrder' 
                    placeholder="номер телефону *" 
                    required/>    
                </div>
                <div>  
                    <input className='inputBasketOrderEmail' 
                    type='text' 
                    name='basketOrderEmail' 
                    id='emailOrder' 
                    placeholder="email" 
                    required/>    
                </div>
                <div>  
                    <input className='inputBasketOrderAdress' 
                    type='text' 
                    name='basketOrderAdress' 
                    id='adressOrder' 
                    placeholder="місто" 
                    required/>    
                </div>
                <span>Оплата</span>
            </div>
            <div className='basketColmRight'>
                Товар і ціна 
                остаточна сумма замовлення
                <div>
                    <TyresCardList/> 
                      
                </div>
                <span>сумма</span>
                <span>Всьго</span>
                
            </div>
        </div>
    );
};

export default BasketOrder;