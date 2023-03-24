import React from 'react';
import '../../css/UXcss/CountBtnOrder.css';

interface ICountBtnOrder {
    countGoods: number;
}

const CountBtnOrder = ({countGoods}: ICountBtnOrder) => {
    return (
        <div className='countBtnOrder'>
            <button className='countBtnOrderLeft'>&#x2B;</button>
            <span className='countGoodsOrder'>{countGoods}</span>
            <button className='countBtnOrderRight'>&#x2212;</button>
        </div>
    );
};

export default CountBtnOrder;