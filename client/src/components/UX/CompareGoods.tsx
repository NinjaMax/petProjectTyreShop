import React, { useContext } from 'react';
import '../../css/UXcss/CompareGoods.css';
import { Context } from '../../context/Context';

type ICompareCount = {
    countCompare: number
};

const CompareGoods = ({countCompare}: ICompareCount) => {
  const {customer} = useContext<any | null>(Context);

  return (

    <div className='compareGoods'>
        <i className={countCompare !== 0 ? 'iconCompareActive' : 'iconCompare'}>  
            </i>
            {countCompare !==0 ?
              <span className={
                customer._isAuth ? 'compareGoodsCount activeCount' : 'compareGoodsCount'
                
              }>
              {countCompare}
              </span>  
              : null
            }
    </div>
  )
};

export default CompareGoods;
