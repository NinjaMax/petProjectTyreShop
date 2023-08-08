import React from 'react';
import '../../css/Goods/SimilarGoods.css';
import TyresCardList from '../cards/TyresCardList';

type ISimilarGoods ={
    similarGoodsList?: any[] | null;
};

const SimilarGoods = ({similarGoodsList}: ISimilarGoods) => {
    

    return (
        <div className='similarGoodsContainer'>
            <div className='similarText'>Схожі товари</div>
            <div className='similarGoods'>
            {similarGoodsList?.length !== 0 ?
            similarGoodsList?.map((item: any) => (
            <div  key={item.id + 'sim'}>
                <TyresCardList 
                    goods={item} 
                    forOrder={false}

                />
            </div>
            ))  
            : null
            }
            </div>
        </div>
    );
};

export default SimilarGoods;