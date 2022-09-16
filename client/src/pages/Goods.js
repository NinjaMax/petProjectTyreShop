import {React, useState} from 'react';
import '../css/Goods.css';
import BreadCrumbs from '../components/BreadCrumbs';
import TabsGoodsCard from '../components/Tabs/TabsGoodsCard';
import Benefits from '../components/Benefits';
import AllAboutProduct from '../components/Goods/AllAboutProduct';
import PropertiesGoods from '../components/Goods/PropertiesGoods';
import ReviewBrandOverall from '../components/Reviews/ReviewsBrandOverall';
import ReviewGoodsOverall from '../components/Reviews/ReviewGoodsOverall';
import ReviewsGoods from '../components/Reviews/ReviewsGoods';
import SimilarGoods from '../components/Goods/SimilarGoods';
import TyreCardSmall from '../components/Cards/TyreCardSmall';
import AllTyreModelSize from '../components/Goods/AllTyreModelSize';
import AllModelBrand from '../components/Goods/AllModelBrand';
import ProductPayDel from '../components/Goods/ProductPayDel';
import YouWatched from '../components/Goods/YouWatched';

const GoodsPage = () => {
  const modelBrand = "CONTICROSSPREMIUMCONTACT";
  const brandName = "Continental";
  const [changeTabGoods, setChangeTabGoods] = useState("vseProTovar");
  
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
            itemTab={[{id:1, titleGoodsTab:"ВСЕ ПРО ТОВАР", value:"vseProTovar", 
            onChangeTab: handleChangeTab, checked: "vseProTovar"},
            {id:2, titleGoodsTab:"ХАРАКТЕРИСТИКИ", value:"charakteristiki", 
            onChangeTab: handleChangeTab, checked: changeTabGoods},
            {id:3, titleGoodsTab:"ВІДГУКИ", value:"vidguki", 
            onChangeTab: handleChangeTab, checked: changeTabGoods},
            {id:4, titleGoodsTab:"ПИТАННЯ ТА ВІДПОВІДІ", value:"pitannja", 
            onChangeTab: handleChangeTab, checked: changeTabGoods}]}>
            {changeTabGoods==="vseProTovar" ?
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
      <div className={changeTabGoods==="vseProTovar" ?'productPayDelGoods' : 'productPayDelGoodsNext'}>
        <ProductPayDel/>
      </div>
      <div className={changeTabGoods==="vseProTovar" ?'goodsBenefits': 'goodsBenefitsNext'}>
        <Benefits/>
      </div>
      <div className='similarGoods'>
        <SimilarGoods/>
      </div>
      <div className='allSizeModel'>
        <span>Усі розміри моделі {modelBrand}</span>
        <AllTyreModelSize/>
      </div>
      <div className='allModelBrand'>
        <span>Усі моделі бренда {brandName}</span>
        <AllModelBrand/>
      </div>
      <div className='youWatched'>
        <YouWatched/>
      </div>
      <div className={changeTabGoods==="vseProTovar" ? "smallCardOne":"smallCardNext"}>
        <TyreCardSmall/>
      </div>
    </div>

    );
};

export default GoodsPage;