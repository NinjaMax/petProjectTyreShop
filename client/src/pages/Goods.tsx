import React, { SetStateAction, useContext, useEffect, useState} from 'react';
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
import { useHistory, useParams } from 'react-router-dom';
import { GOODS_ROUTE } from '../utils/consts';
import { getTyresById, getTyresByIdParam } from '../restAPI/restGoodsApi';
import { yieldToMain } from '../restAPI/postTaskAdmin';
import { observer } from 'mobx-react-lite';
import { Context } from '../context/Context';

const GoodsPage = observer(() => {
  //const [product, setProduct] = useState<any>();
  const {goodsTyre} = useContext<any | null>(Context);
  const [productId, setProductId] = useState<string | null>();
  const [changeTabGoods, setChangeTabGoods] = useState<string>("vseProTovar");
  const history =  useHistory();
  const param = useParams<any>();

  // useEffect(() => {
  //   const getTyreId: string = 
  //     JSON.parse(localStorage.getItem('goodsId')!);
  //     if (getTyreId) {
  //       setProductId(getTyreId)
  //     }
  // },[]) ;
  // const getTyreId: string = 
  //     JSON.parse(localStorage.getItem('goodsId')!);
  
  useEffect(() => {
    let isMounted = false;
    const getProduct = async () => {
      const taskProduct: any[] = [
        getTyresByIdParam,
      ]
    const getTyreId: string = 
      JSON.parse(localStorage.getItem('goodsId')!);
    let i: number = 0; 
    //console.log(getTyreId);
    while (taskProduct.length > i) {

      //if (getTyreId && !isMounted) {
      if (!isMounted && taskProduct[i] === getTyresByIdParam && getTyreId) {
        console.log(getTyreId);
        const getProduct: any = await taskProduct[i](getTyreId);
        //const getProduct = await getTyresByIdParam(getTyreId);
        //setProduct(getProduct)
        goodsTyre.setProduct(getProduct);
        //localStorage.removeItem('goodsId');
      }
      const task = taskProduct.shift();
      task();
      await yieldToMain();
    }
    };
    getProduct();
    return () => {
      isMounted = true;
    };
  },[goodsTyre]);

  console.log('PRODUCT: ', goodsTyre._product);
  console.log('LOCALSORAGE_GOODS_ID: ',JSON.parse(localStorage.getItem('goodsId')!));

  const handleChangeTab = (e: any) => {
    setChangeTabGoods(e.currentTarget.value);
  }
  //console.log('PARAMS_GOODS: ', param.goods); replace(/ /g, "-")
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
                <AllAboutProduct goods={goodsTyre._product}/>
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
        <span>Усі розміри моделі {goodsTyre?.model}</span>
        <AllTyreModelSize/>
      </div>
      <div className='allModelBrand'>
        <span>Усі моделі бренда {goodsTyre?.brand}</span>
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
});

export default GoodsPage;