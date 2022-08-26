import {React, useState} from 'react';
import '../css/Goods.css';
import BreadCrumbs from '../components/BreadCrumbs';
import TyresCard from '../components/Cards/TyresCard';
import TabsGoodsCard from '../components/Tabs/TabsGoodsCard';
import Benefits from '../components/Benefits';
import AllAboutProduct from '../components/Goods/AllAboutProduct';
import PropertiesGoods from '../components/Goods/PropertiesGoods';
import ReviewBrandOverall from '../components/Reviews/ReviewsBrandOverall';
import ReviewGoodsOverall from '../components/Reviews/ReviewGoodsOverall';
import ReviewsGoods from '../components/Reviews/ReviewsGoods';

const GoodsPage = () => {
  const [changeTabGoods, setChangeTabGoods] = useState();
  
  const handleChangeTab = (e) => {
    setChangeTabGoods(e.currentTarget.value);
  }

    return (
    
    <div className='goodsCard'>
      <div className='goodsBreadCrumbs'>
        <BreadCrumbs/>
      </div>
      <div className={changeTabGoods==="vseProTovar" ? 'tabGoods':'tabGoodsActive'}>
        <TabsGoodsCard
          itemTab={[
            {id:1, titleGoodsTab:"ВСЕ ПРО ТОВАР", value:"vseProTovar", 
            onChangeTab: handleChangeTab, checked: changeTabGoods},
            {id:2, titleGoodsTab:"ХАРАКТЕРИСТИКИ", value:"charakteristiki", 
            onChangeTab: handleChangeTab, checked: changeTabGoods},
            {id:3, titleGoodsTab:"ВІДГУКИ", value:"vidguki", 
            onChangeTab: handleChangeTab, checked: changeTabGoods},
            {id:3, titleGoodsTab:"ПИТАННЯ ТА ВІДПОВІДІ", value:"pitannja", 
            onChangeTab: handleChangeTab, checked: changeTabGoods}
          ]}>
            {changeTabGoods==="vseProTovar"?
                <AllAboutProduct/>
            :null}
            {changeTabGoods==="charakteristiki"?
                <PropertiesGoods/> 
            :null}
            {changeTabGoods==="vidguki"?
                <div className='tabReviewsActive'>
                  <ReviewGoodsOverall/> 
                  <ReviewBrandOverall/>
                  <ReviewsGoods/>
                  <ReviewsGoods/>
                  <ReviewsGoods/>
                  <ReviewsGoods/>
                  <ReviewsGoods/>
                </div>  
            :null}
            {changeTabGoods==="pitannja"?
                <span>ПИТАННЯ ТА ВІДПОВІДІ </span>
            :null}
        </TabsGoodsCard>
      </div>
      <div className='goodsBenefits'>
        <Benefits/>
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
      <div className={changeTabGoods==="vseProTovar" ? "noactive":'smallCard'}>
        <TyresCard/>
      </div>
     
    </div>

    );
};

export default GoodsPage;