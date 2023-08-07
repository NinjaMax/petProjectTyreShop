import React from 'react';
import '../../css/Goods/SimilarGoods.css';
import TyresCardList from '../cards/TyresCardList';

const SimilarGoods = (similarGoods: any[] | null | undefined) => {
    

    return (
        <div>
            <div className='similarText'>Схожі товари</div>

            <div className='similarGoods'>
                <TyresCardList forOrder={false}/>
                <TyresCardList forOrder={false}/>
                <TyresCardList forOrder={false}/>
                <TyresCardList forOrder={false}/>   
            </div>
        </div>
    );
};

export default SimilarGoods;