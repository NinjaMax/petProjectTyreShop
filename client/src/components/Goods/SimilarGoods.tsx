import React from 'react';
import '../../css/Goods/SimilarGoods.css';
import TyresCardList from '../cards/CardList';

type ISimilarGoods ={
    title: string;
    similarGoodsList?: any[] | null;
    checkOrders?(arg0: any, ...arg:any[]): Promise<void | undefined>;
};

const SimilarGoods = ({similarGoodsList, title, checkOrders}: ISimilarGoods) => {

    return (
        <div className='similarGoodsContainer'>
            <div className='similarText'>{title}</div>
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