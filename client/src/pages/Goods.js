import React from 'react';
import '../css/Goods.css';
import BreadCrumbs from '../components/BreadCrumbs';
import TyresCard from '../components/Cards/TyresCard';
import TabsGoodsCard from '../components/Tabs/TabsGoodsCard';

                      
const GoodsPage = () => {
    return (
    
    <div className='goodsCard'>
        <div className='goodsBreadCrumbs'>
          <BreadCrumbs/>
        </div>
        <div className='tabGoods'>
          <TabsGoodsCard/>
        </div>
        <div className='goodsBenefits'>
          benefits
        </div>
        <div className='similarGoods'>
          similar goods
        </div>
        <div className='allSizeModel'>
          all size model
        </div>
        <div className='youWatched'>
          you watched
        </div>
        <div className='allModelBrand'>
          all model brand
        </div>
        <div className='smallCard'>
          smallCard
          <TyresCard optionsBox={false}/>
        </div>
    </div>
    );
};

export default GoodsPage;