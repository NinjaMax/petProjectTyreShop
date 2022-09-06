import React from 'react';
import '../../css/Modal/CheckOrder.css';
import ButtonAction from '../Buttons/ButtonAction';
import TyresCardList from '../Cards/TyresCardList';

const CheckOrder = () => {


    return (
        <div className='checkOrder'>
                <div>Кошик</div>
                <TyresCardList/>
                <ButtonAction props={'Оформити замовлення'}/>    
        </div>       
        
    );
};

export default CheckOrder;