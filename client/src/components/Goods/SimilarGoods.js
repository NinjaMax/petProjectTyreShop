import React from 'react';
import '../../css/Goods/SimilarGoods.css';
import TyreCard from '../Cards/TyresCard';

const SimilarGoods = () => {
    return (
        <div>
            <div className='similarText'>Схожі товари</div>
            <div className='similarGoods'>
                <TyreCard optionsBox={false}/>
                <TyreCard optionsBox={false}/>
                <TyreCard optionsBox={false}/>
            </div>
        </div>
    );
};

export default SimilarGoods;