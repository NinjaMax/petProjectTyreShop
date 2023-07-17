import React, { Fragment } from 'react';
import '../../css/Modal/CheckOrder.css';
import ButtonAction from '../buttons/ButtonAction';
import TyresCardList from '../cards/TyresCardList';
import { ICheckTyreModal } from './types/CheckTyreItem.type';
import { useHistory } from 'react-router-dom';

const CheckOrder = ({orderItem}: any) => {
    const history = useHistory<any>();

    const goToBasket = () => {
        history.push('/basket/');
    };

    return (
        <div className='checkOrderContainer'>
                <div>Кошик</div>
                <div className='checkOrder'>
                {orderItem ?
                    orderItem.map((item: any) =>
                    <div 
                        className='checkOrderItem' 
                        key={item.id + 'b'}
                    >
                        <TyresCardList 
                            goods={item}
                            priceItem={item.price}
                            forOrder={true}
                        />   
                    </div>
                   ) : null
                }    
                </div>
                <ButtonAction 
                    eventItem={goToBasket}
                    props={'Оформити замовлення'}
                />    
        </div>       
    );
};

export default CheckOrder;