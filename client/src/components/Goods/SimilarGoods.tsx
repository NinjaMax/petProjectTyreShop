import React from 'react';
import '../../css/Goods/SimilarGoods.css';
import TyresCardList from '../cards/CardList';

type ISimilarGoods ={
    similarGoodsList?: any[] | null;
    checkOrders?(arg0: any, ...arg:any[]): Promise<void | undefined>;
};

const SimilarGoods = ({similarGoodsList, checkOrders}: ISimilarGoods) => {
    

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
                    checkOrders={checkOrders}
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