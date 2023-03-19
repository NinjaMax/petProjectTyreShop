import React from 'react';
import '../../css/UXcss/CountBtnOrder.css';

const CountBtnOrder = ({countGoods}) => {
    return (
        <div className='countBtnOrder'>
            <button className='countBtnOrderLeft'>&#x2B;</button>
            <span className='countGoodsOrder'>{countGoods}</span>
            <button className='countBtnOrderRight'>&#x2212;</button>
        </div>
    );
};

export default CountBtnOrder;