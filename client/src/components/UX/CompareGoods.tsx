import React from 'react';
import '../../css/UXcss/CompareGoods.css';

type ICompareCount = {
    countCompare: number
};

const CompareGoods = ({countCompare}: ICompareCount) => {
  return (

    <div className='compareGoods'>
        <i className={countCompare !== 0 ? 'iconCompareActive' : 'iconCompare'}>  
            </i>
            {countCompare !==0 ?
              <span>{countCompare}</span>  
              : null
            }
    </div>
  )
};

export default CompareGoods;
