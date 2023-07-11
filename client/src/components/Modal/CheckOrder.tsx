import React from 'react';
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
        <div className='checkOrder'>
                <div>Кошик</div>
                    <TyresCardList goods={orderItem}/>
                <ButtonAction 
                    eventItem={goToBasket}
                    props={'Оформити замовлення'}
                />    
        </div>       
        
    );
};

export default CheckOrder;