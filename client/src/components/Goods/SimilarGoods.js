import React from 'react';
import '../../css/Goods/SimilarGoods.css';
import TyresCardList from '../Cards/TyresCardList';

const SimilarGoods = () => {
    return (
        <div>
            <div className='similarText'>Схожі товари</div>
            <div className='similarGoods'>
                <TyresCardList/>
                <TyresCardList/>
                <TyresCardList/>
                <TyresCardList/>   
            </div>
        </div>
    );
};

export default SimilarGoods;