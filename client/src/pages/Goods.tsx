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
import { createTyreReview, getAllTyresDiametersByModel, getAllTyresModelByBrand, getAllTyresParamsByModel, getTyresBrandRatingAvg, getTyresBrandRatingAvgSeason, getTyresById, getTyresByIdParam, getTyresCountReviewByBrand, getTyresCountReviewByModel, getTyresModelRatingAvg, getTyresParamsByBrandAndSeason, getTyresParamsBySeason, likesTyreReview } from '../restAPI/restGoodsApi';
import { yieldToMain } from '../restAPI/postTaskAdmin';
import { observer } from 'mobx-react-lite';
import { Context } from '../context/Context';
import { createStringUrl } from '../services/stringUrl';
import ButtonAction from '../components/buttons/ButtonAction';
import Modal from '../components/modal/Modal';
import ReviewTyreCreate from '../components/reviews/ReviewTyreCreate';
import { IReviewGoods } from '../components/reviews/interfaces/ReviewGoods.interface';
import { IRatingAvg } from './types/RatingModelAvg.type';
import { IRatingBrandAvg } from './types/RatingBrandAvg.type';
import { IRatingSeasonAvg } from './types/RatingBrandSeason.type';
import { FormValues } from '../components/reviews/types/ReviewTyreCreate.type';
import ModelSection from '../components/goods/ModelSection';

type ILikeTyreType = {
  id_review: number;
  likeCount: number;
  dislikeCount: number;
};


const GoodsPage = observer(() => {
  const {goodsTyre, customer} = useContext<any | null>(Context);
  const [ratingModelAvg, setRatingModelAvg] = useState<IRatingAvg>();
  const [ratingBrandAvg, setRatingBrandAvg] = useState<IRatingBrandAvg>();
  const [ratingSummerAvg, setRatingSummerAvg] = useState<IRatingSeasonAvg>();
  const [ratingWinterAvg, setRatingWinterAvg] = useState<IRatingSeasonAvg>();
  const [ratingAllSeasonAvg, setRatingAllSeasonAvg] = useState<IRatingSeasonAvg>();
  const [reviewCountBrand, setReviewCountBrand] = useState<number>();
  const [reviewCountModel, setReviewCountModel] = useState<number>();
  const [createReview, setCreateReview] = useState<boolean>(false);
  const [dataReview, setDataReview] = useState<{} | null>(null);
  //const [likeReview, setLikeReview] = useState<ILikeTyreType | null>(null);
  //const [dislikeReview, setDislikeReview] = useState<number>(0);
  // const [thumbUp, setThumbUp] = useState<boolean | null>(null);
  // const [thumbDown, setThumbDown] = useState<boolean | null>(null);
  const [similarGoods, setSimilarGoods] = useState<any[] | null>();
  const [similarBrandGoods, setSimilarBrandGoods] = useState<any[] | null>();
  const [allModelsBrand, setAllModelsBrand] = useState<any[] | null>();
  const [allParamsModel, setAllParamsModel] = useState<any[] | null>();
  const [changeTabGoods, setChangeTabGoods] = useState<string>("vseProTovar");
  const [allDiametersModel, setAllDiametersModel] = useState<any[] | null>();
  const [paramsModel, setParamsModel] = useState<boolean>(false);
  const history =  useHistory();
  const param = useParams<any>();
  let match = useRouteMatch<any>('/:goodsItem');
  
  useEffect(() => {
    let isMounted = false;
    const getProduct = async () => {
      const taskProduct: any[] = [
        getTyresByIdParam,
        getTyresModelRatingAvg,
        getTyresBrandRatingAvg,
        getTyresBrandRatingAvgSeason,
        getTyresCountReviewByBrand,
        getTyresCountReviewByModel,
        createTyreReview,
        likesTyreReview,
        getTyresParamsByBrandAndSeason,
        getTyresParamsBySeason,
        getAllTyresModelByBrand,
        getAllTyresParamsByModel,
        getAllTyresDiametersByModel,
      ]
    const getTyreId: string = 
      JSON.parse(localStorage.getItem('goodsId')!);
    let i: number = 0; 
    while (taskProduct.length > i) {
      if (!isMounted && taskProduct[i] === getTyresByIdParam && getTyreId) {
        const getProduct: any = await taskProduct[i](getTyreId);
        goodsTyre.setProduct(getProduct);
      }
      if (!isMounted && taskProduct[i] === getTyresModelRatingAvg && goodsTyre._product.id_model) {
        const getRatingModel: any = await taskProduct[i](
          goodsTyre._product.id_model
        );
        setRatingModelAvg(getRatingModel[0]);
      }
      if (!isMounted && taskProduct[i] === getTyresBrandRatingAvg && goodsTyre._product.id_brand) {
        const getRatingBrand: any = await taskProduct[i](
          goodsTyre._product.id_brand
        );
        setRatingBrandAvg(getRatingBrand[0]);
      }
      if (!isMounted && taskProduct[i] === getTyresBrandRatingAvgSeason && goodsTyre._product.id_brand) {
        const getRatingSummer: any = await taskProduct[i](
          goodsTyre._product.id_brand, 1
        );
        const getRatingWinter: any = await taskProduct[i](
          goodsTyre._product.id_brand, 2
        );
        const getRatingAllSeason: any = await taskProduct[i](
          goodsTyre._product.id_brand, 3
        );
        setRatingSummerAvg(getRatingSummer[0]);
        setRatingWinterAvg(getRatingWinter[0]);
        setRatingAllSeasonAvg(getRatingAllSeason[0]);
      }
      if (!isMounted && taskProduct[i] === getTyresCountReviewByBrand && goodsTyre._product.id_brand) {
        const getCountBrand: any = await taskProduct[i](goodsTyre._product.id_brand);
        setReviewCountBrand(getCountBrand);
      }
      if (!isMounted && taskProduct[i] === getTyresCountReviewByModel && goodsTyre._product.id_model) {
        const getCountModel: any = await taskProduct[i](goodsTyre._product.id_model);
        setReviewCountModel(getCountModel);
      }
      if (!isMounted && taskProduct[i] === createTyreReview && dataReview) {
        if (dataReview) {
          const createReviewTyre: any = await taskProduct[i](
          dataReview,
          goodsTyre._product.id,
          goodsTyre._product.tyre_brand.id_brand,
          goodsTyre._product.tyre_model.id_model,
          goodsTyre._product.id_season,
          customer._customer.id_customer,
          customer._customer.picture ?? customer._customer.profile_image_url,
          goodsTyre.ratingList.rating_dry_road,
          goodsTyre.ratingList.rating_wet_road,
          goodsTyre.ratingList.rating_snow_road,
          goodsTyre.ratingList.rating_ice_road,
          goodsTyre.ratingList.rating_cross_country,
          goodsTyre.ratingList.rating_treadwear,
          goodsTyre.ratingList.rating_price_quality
          );
          if (createReviewTyre?.status === 201) {
            setDataReview(null);
            goodsTyre.setNewRating('rating_overall', 0);
            goodsTyre.setNewRating('rating_dry_road', 0);
            goodsTyre.setNewRating('rating_wet_road', 0);
            goodsTyre.setNewRating('rating_snow_road', 0);
            goodsTyre.setNewRating('rating_ice_road', 0);
            goodsTyre.setNewRating('rating_cross_country', 0);
            goodsTyre.setNewRating('rating_treadwear', 0);
            goodsTyre.setNewRating('rating_price_quality', 0);
            setCreateReview(!createReview);
          }
        } 
      }
      if (!isMounted && taskProduct[i] === getTyresParamsByBrandAndSeason 
        && goodsTyre._product.id_brand && goodsTyre._product.id_season) {
        const getTyresParamsByBrandSeason: any = await taskProduct[i](
          goodsTyre._product.params.params,
          goodsTyre._product.tyre_brand.brand,
          goodsTyre._product.season.season_ua,
        );
        console.log('SIMILAR_BRAND_GOODS_PARAMS: ', getTyresParamsByBrandSeason);
        setSimilarBrandGoods(getTyresParamsByBrandSeason);
      }
      if (!isMounted && taskProduct[i] === getTyresParamsBySeason 
        && goodsTyre._product.id_brand && goodsTyre._product.id_season) {
        const getTyresParamsBySeason: any = await taskProduct[i](
          goodsTyre._product.params.params,
          goodsTyre._product.season.season_ua,
        );
        console.log('SIMILAR_GOODS_PARAMS: ', getTyresParamsBySeason);
        setSimilarGoods(getTyresParamsBySeason);
      }
      if (!isMounted && taskProduct[i] === getAllTyresModelByBrand 
        && goodsTyre._product.id_brand && goodsTyre._product.id_season) {
        const getTyresModelByBrand: any = await taskProduct[i](
          goodsTyre._product.id_brand,
        );
        console.log('ALL_TYRES_MODEL_BY_BRAND: ', getTyresModelByBrand);
        setAllModelsBrand(getTyresModelByBrand);
      }
      if (!isMounted && taskProduct[i] === getAllTyresParamsByModel 
        && goodsTyre._product.id_brand && goodsTyre._product.id_season) {
        const getTyresParamsByModel: any = await taskProduct[i](
          goodsTyre._product.id_model,
        );
        console.log('ALL_TYRES_MODEL_PARAMS: ', getTyresParamsByModel);
        setAllParamsModel(getTyresParamsByModel);
      }
      if (!isMounted && taskProduct[i] === getAllTyresDiametersByModel 
        && goodsTyre._product.id_brand && goodsTyre._product.id_season) {
        const getTyresDiametersByModel: any = await taskProduct[i](
          goodsTyre._product.id_model,
        );
        console.log('ALL_TYRES_MODEL_PARAMS: ', getTyresDiametersByModel);
        setAllDiametersModel(getTyresDiametersByModel);
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
  },[
    createReview, 
    customer._customer.id_customer,
    customer._customer.picture,
    customer._customer.profile_image_url,
    dataReview,
    goodsTyre
  ]);

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
    match?.params.goodsItem
  ]) ;

  // const tumbUpAction = () => {
  //   setThumbUp(!thumbUp);
  // };

  // const tumbDownAction = () => {
  //   setThumbDown(!thumbDown);
  // };  
  const handleChangeTab = (e: any) => {
    setChangeTabGoods(e.target.value);
  }
  const openToCreateReview = () => {
    setCreateReview(!createReview);
    //if(dataReview) {
      setDataReview(null);
      goodsTyre.setRatingList({
        rating_overall: 0,
        rating_dry_road: 0,
        rating_wet_road: 0,
        rating_snow_road: 0,
        rating_ice_road: 0,
        rating_cross_country:0,
        rating_treadwear:0,
        rating_price_quality:0,
      });
    //}
  };

  const submitDataReview = (data: FormValues) => {
    setDataReview(data);
  };
  // console.log('LIKE_REVIEW: ', likeReview);
  //console.log("DATA_REVIEW: ", dataReview);
  // console.log('MATCH_URL_PARAMS: ', match?.params.goodsItem);
  // console.log('MATCH_URL: ', match);
  console.log('RATING_SUMMER: ', ratingSummerAvg);
  console.log('PRODUCT: ', goodsTyre._product);

  // console.log('LOCALSORAGE_GOODS_ID: ',JSON.parse(localStorage.getItem('goodsId')!));
  // console.log('THUMB_UP:', thumbUp);
  // console.log('THUMB_DOWN:', thumbDown);

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
                <AllAboutProduct 
                  paramsModel={paramsModel}
                  paramsModelPrice={allDiametersModel}
                  goods={goodsTyre._product}
                  countModelReview={reviewCountModel}
                  avgRatingModel={ratingModelAvg?.avgRatingModel}
                />
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
              <ReviewGoodsOverall 
                reviewCount={reviewCountModel}
                ratingsModel={ratingModelAvg}
              /> 
              <ReviewBrandOverall 
                brandName={goodsTyre._product.tyre_brand.brand}
                avgBrand={ratingBrandAvg?.avgRatingBrand} 
                countReviewBrand={reviewCountBrand}
                ratingSummer={ratingSummerAvg?.avgRatingBrandBySeason}
                ratingWinter={ratingWinterAvg?.avgRatingBrandBySeason}
                ratingAllseason={ratingAllSeasonAvg?.avgRatingBrandBySeason}
              />
              {goodsTyre._product.reviews.length !== 0 ?
                goodsTyre._product.reviews.map((item: IReviewGoods) =>
                <Fragment key={item.id_review}>
                <ReviewsGoods 
                  productFullName={goodsTyre._product.full_name}
                  rating={goodsTyre._product.rating}
                  reviewEntity={item}
                  reviewExtend={false}
                  btnLeft={undefined}
                  btnRight={undefined} 
                  //setLikeReview={setLikeReview} 
                  //setThumbDown={setDislikeReview}
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
      <div className={paramsModel ? 'modelSectionGoodsActive' : 
        'modelSectionGoods'
      }>
      {paramsModel ?
        <ModelSection 
          modelGoods={allDiametersModel}
          modelName={goodsTyre?._product?.tyre_model?.model}
        /> 
        : null
      }
      </div>
      <div className={paramsModel ? 'similarGoodsModelNone' : 'similarGoodsModel'}>
        <SimilarGoods similarGoodsList={similarBrandGoods}/>
      </div>
      <div className={paramsModel ? 'similarGoodsNone' : 'similarGoods'}>
        <SimilarGoods similarGoodsList={similarGoods}/>
      </div>
      <div className={paramsModel ? 'allSizeModelNone' : 'allSizeModel'}>
        <span>Усі розміри моделі {goodsTyre?.model}</span>
        <AllTyreModelSize sizeTyresList={allParamsModel}/>
      </div>
      <div className={paramsModel ? 'allModelBrandNone' : 'allModelBrand'}>
        <span>Усі моделі бренда {goodsTyre?.brand}</span>
        <AllModelBrand modelBrandList={allModelsBrand}/>
      </div>

      <div className='youWatched'>
        <YouWatched/>
      </div>
      <div className={changeTabGoods==="vseProTovar" ? "smallCardOne":"smallCardNext"}>
        {goodsTyre._product && !paramsModel ?
          <TyreCardSmall product={goodsTyre._product}/>
        : null 
        }
      </div>
        <Modal active={createReview} setActive={openToCreateReview}>
          <ReviewTyreCreate 
            onSubmitReviewTyre={submitDataReview}
            // active={createReview}
            // setActive={openToCreateReview}
          />
        </Modal> 
    </div>

    );
});

export default GoodsPage;