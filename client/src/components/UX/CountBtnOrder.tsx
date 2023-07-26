import React from 'react';
import '../../css/UXcss/CountBtnOrder.css';

interface ICountBtnOrder {
    dataId?: number;
    countGoods: number;
    countAction?(arg0: any): void;
}

const CountBtnOrder = ({countGoods, dataId, countAction}: ICountBtnOrder) => {
    return (
        <div className='countBtnOrder'>
            <button
                data-count={countGoods}
                data-id={dataId}
                value={'plus'}
                className='countBtnOrderLeft'
                onClick={countAction}
            >&#x2B;</button>
            <span className='countGoodsOrder'>{countGoods}</span>
            <button 
                data-count={countGoods}
                data-id={dataId}
                value={'minus'}
                className='countBtnOrderRight'
                onClick={countAction}
            >&#x2212;</button>
        </div>
    );
};

export default CountBtnOrder;