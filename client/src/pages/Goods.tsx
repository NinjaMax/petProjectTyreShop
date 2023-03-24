import React, { SetStateAction, useState} from 'react';
import '../css/Goods.css';
import BreadCrumbs from '../components/BreadCrumbs';
import TabsGoodsCard from '../components/tabs/TabsGoodsCard';
import Benefits from '../components/Benefits';
import AllAboutProduct from '../components/goods/AllAboutProduct';
import PropertiesGoods from '../components/goods/PropertiesGoods';
import ReviewBrandOverall from '../components/reviews/ReviewsBrandOverall';
import ReviewGoodsOverall from '../components/reviews/ReviewGoodsOverall';
import ReviewsGoods from '../components/reviews/ReviewsGoods';
import SimilarGoods from '../components/goods/SimilarGoods';
import TyreCardSmall from '../components/cards/TyreCardSmall';
import AllTyreModelSize from '../components/goods/AllTyreModelSize';
import AllModelBrand from '../components/goods/AllModelBrand';
import ProductPayDel from '../components/goods/ProductPayDel';
import YouWatched from '../components/goods/YouWatched';

const GoodsPage = () => {
  const modelBrand = "CONTICROSSPREMIUMCONTACT";
  const brandName = "Continental";
  const [changeTabGoods, setChangeTabGoods] = useState<string>("vseProTovar");
  
  const handleChangeTab = (e: { currentTarget: { value: SetStateAction<string>; }; }) => {
    setChangeTabGoods(e.currentTarget.value);
  }

    return (
    
    <div className='goodsCard'>
      <div className='goodsBreadCrumbs'>
        <BreadCrumbs route={['/','/tyres']} hrefTitle={['Home','Tyres']}/>
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
                  <ReviewsGoods reviewExtend={false} btnLeft={undefined} btnRight={undefined}/>
                  <ReviewsGoods reviewExtend={false} btnLeft={undefined} btnRight={undefined}/>
                  <ReviewsGoods reviewExtend={false} btnLeft={undefined} btnRight={undefined}/>
                  <ReviewsGoods reviewExtend={false} btnLeft={undefined} btnRight={undefined}/>
                  <ReviewsGoods reviewExtend={false} btnLeft={undefined} btnRight={undefined}/>
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