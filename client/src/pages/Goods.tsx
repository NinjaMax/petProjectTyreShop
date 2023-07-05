import React, { Fragment, useContext, useEffect, useState} from 'react';
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
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { GOODS_ROUTE, NOT_FOUND_ROUTE } from '../utils/consts';
import { getTyresById, getTyresByIdParam } from '../restAPI/restGoodsApi';
import { yieldToMain } from '../restAPI/postTaskAdmin';
import { observer } from 'mobx-react-lite';
import { Context } from '../context/Context';
import { createStringUrl } from '../services/stringUrl';
import ButtonAction from '../components/buttons/ButtonAction';
import Modal from '../components/modal/Modal';
import ReviewTyreCreate from '../components/reviews/ReviewTyreCreate';
import { IReviewGoods } from '../components/reviews/interfaces/ReviewGoods.interface';

const GoodsPage = observer(() => {
  //const [product, setProduct] = useState<any>();
  const {goodsTyre} = useContext<any | null>(Context);
  const [productId, setProductId] = useState<string | null>();
  const [createReview, setCreateReview] = useState<boolean>(false);
  const [changeTabGoods, setChangeTabGoods] = useState<string>("vseProTovar");
  const history =  useHistory();
  const param = useParams<any>();
  let match = useRouteMatch<any>('/:goodsItem');
  
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

  useEffect(() => {
    if (goodsTyre._product.full_name) {
      const getTyreUrl: string = 
      createStringUrl(goodsTyre._product.full_name)
      //console.log('PRODUCT_STRING_URL:', getTyreUrl);
      if (match?.params.goodsItem !== getTyreUrl) {
        history.push(NOT_FOUND_ROUTE);
      }
    }
  },[
    goodsTyre._product.full_name,
    history, 
    match?.params.goodsItem]) ;

  // console.log('MATCH_URL_PARAMS: ', match?.params.goodsItem);
  // console.log('MATCH_URL: ', match);
  console.log('PRODUCT: ', goodsTyre._product);
  // console.log('LOCALSORAGE_GOODS_ID: ',JSON.parse(localStorage.getItem('goodsId')!));

  const handleChangeTab = (e: any) => {
    setChangeTabGoods(e.target.value);
  }
  const openToCreateReview = () => {
    setCreateReview(!createReview);
  };
  
  return (
    <div className='goodsCard'>
      <div className='goodsBreadCrumbs'>
        <BreadCrumbs route={['/','/tyres']} hrefTitle={['Home','Tyres']}/>
      </div>
      <div className={changeTabGoods === "vseProTovar" ? 
        'tabGoods' : 'tabGoodsActive'}
      >
        <TabsGoodsCard
            onChangeTab={handleChangeTab}
            itemTab={[{id:'1',
            titleGoodsTab: "ВСЕ ПРО ТОВАР",
            value:"vseProTovar", 
            checked: changeTabGoods,
            reviewCount:0,
            },{id:'2',
            titleGoodsTab:"ХАРАКТЕРИСТИКИ",
            value:"charakteristiki", 
            checked: changeTabGoods,
            reviewCount:0,
            }, {id:'3',
            titleGoodsTab:"ВІДГУКИ", 
            value:"vidguki",
            checked: changeTabGoods,
            reviewCount: goodsTyre?._product?.reviews?.length ?? 0,
            }, {id:'4',
            titleGoodsTab:"ПИТАННЯ ТА ВІДПОВІДІ",
            value:"pitannja",
            checked: changeTabGoods,
            reviewCount:0,
            }
          ]}
            >
            {changeTabGoods === "vseProTovar" ?
                <AllAboutProduct goods={goodsTyre._product}/>
            :null}
            {changeTabGoods === "charakteristiki"?
                <PropertiesGoods product={goodsTyre._product}/> 
            :null}
          {changeTabGoods === "vidguki" ?
            <div className='tabReviewsActive'>
              <div className='preReview'>
                <span>
                  Відгуки про шини {
                  goodsTyre._product.tyre_brand.brand + '' 
                  + goodsTyre._product.tyre_model.model}
                </span> 
                <ButtonAction 
                  props={'Написати відгук'}
                  eventItem={openToCreateReview}
                />
              </div>
              <ReviewGoodsOverall  /> 
              <ReviewBrandOverall/>
              {goodsTyre._product.reviews.length !== 0 ?
                goodsTyre._product.reviews.map((item: IReviewGoods) =>
                <Fragment key={item.id_review}>
                <ReviewsGoods 
                  reviewEntity={item}
                  reviewExtend={false} 
                  btnLeft={undefined} 
                  btnRight={undefined}
                />
                </Fragment>
                )
                : null
              }
            </div>  
            :null
          }
          {changeTabGoods === "pitannja" ?
              <span>ПИТАННЯ ТА ВІДПОВІДІ </span>
            :null
          }
        </TabsGoodsCard>
      </div>
      <div className={
        changeTabGoods === "vseProTovar" ? 
        'productPayDelGoods' : 'productPayDelGoodsNext'}>
        <ProductPayDel/>
      </div>
      <div className={
        changeTabGoods === "vseProTovar" ? 
        'goodsBenefits': 'goodsBenefitsNext'}>
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
        {goodsTyre._product ?
          <TyreCardSmall product={goodsTyre._product}/>
        : null 
        }
      </div>
        <Modal active={createReview} setActive={openToCreateReview}>
          <ReviewTyreCreate 
            active={createReview}
            setActive={openToCreateReview}
          />
        </Modal> 
    </div>

    );
});

export default GoodsPage;