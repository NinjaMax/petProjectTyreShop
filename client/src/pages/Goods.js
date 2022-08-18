import {React, useState} from 'react';
import '../css/Goods.css';
import BreadCrumbs from '../components/BreadCrumbs';
import TyresCard from '../components/Cards/TyresCard';
import TabsGoodsCard from '../components/Tabs/TabsGoodsCard';
import Benefits from '../components/Benefits';
import AllAboutProduct from '../components/Goods/AllAboutProduct';
import OptionsTyreBox from '../components/Cards/OptionsTyreBox';
import ReviewBrandOverall from '../components/Reviews/ReviewsBrandOverall';
import ReviewGoodsOverall from '../components/Reviews/ReviewGoodsOverall';
import TabGoodsLabel from '../components/Tabs/TabGoodsLabel';

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
        <div className='tabGoods'>
          <TabsGoodsCard titleGoodsTab={"ВСЕ ПРО ТОВАР"} value={"vseProTovar"} 
              onChangeTab={handleChangeTab} checked={changeTabGoods}>
            
                <AllAboutProduct/>
            
          </TabsGoodsCard>  
            <TabGoodsLabel titleGoodsTab={"ХАРАКТЕРИСТИКИ"} value={"charakteristiki"} 
            onChangeTab={handleChangeTab} checked={changeTabGoods}>
            {changeTabGoods==="charakteristiki"?
             <OptionsTyreBox/> 
            :null}
            </TabGoodsLabel>

            <TabGoodsLabel 
            titleGoodsTab={"ВІДГУКИ"} value={"vidguki"} 
            onChangeTab={handleChangeTab} checked={changeTabGoods}>
            {changeTabGoods==="vidguki"?
              <>
                <ReviewBrandOverall/>,
                <ReviewGoodsOverall/> 
              </>  
            :null}
            </TabGoodsLabel>

            <TabGoodsLabel titleGoodsTab={"ПИТАННЯ ТА ВІДПОВІДІ"} value={"pitannja"} onChangeTab={handleChangeTab}
            checked={changeTabGoods}>
            {changeTabGoods==="pitannja"?
             <span>ПИТАННЯ ТА ВІДПОВІДІ </span>
            :null}
            </TabGoodsLabel>

            <TabGoodsLabel>
              <div>PITENNJA</div>
            </TabGoodsLabel>
          
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
        <div className='smallCard'>
        {changeTabGoods==="vseProTovar"?
         <TyresCard optionsBox={false}/> 
        :null}
        </div>
    </div>
    );
};

export default GoodsPage;