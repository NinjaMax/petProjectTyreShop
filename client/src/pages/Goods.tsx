import React, { Fragment, Suspense, lazy, useContext, useEffect, useState} from 'react';
import '../css/Goods.css';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { NOT_FOUND_ROUTE } from '../utils/consts';
import { 
  addGoodsToBasket,
  createBasket,
  createTyreReview, 
  createWheelReview, 
  getAllTyresDiametersByModel, 
  getAllTyresModelByBrand, 
  getAllTyresParamsByModel, 
  getAllWheelsDiametersByBrand, 
  getAllWheelsModelByBrand, 
  getBasketById, 
  getStorageByIdParam, 
  getTyresBrandRatingAvg, 
  getTyresBrandRatingAvgSeason,  
  getTyresByFullName,  
  getTyresByIdParam, 
  getTyresByModel, 
  getTyresCountReviewByBrand, 
  getTyresCountReviewByModel, 
  getTyresModelRatingAvg, 
  getTyresParamsByBrandAndSeason, 
  getTyresParamsBySeason, 
  getTyresRatingAvgIdAndIdmodel, 
  getWheelByFullName, 
  getWheelsBrandRatingAvg, 
  getWheelsByIdParam, 
  getWheelsByModel, 
  getWheelsCountReviewByBrand, 
  getWheelsCountReviewByModel, 
  getWheelsModelRatingAvg, 
  getWheelsParamsBy, 
  getWheelsParamsByBrand, 
  getWheelsRatingAvgIdAndIdmodel, 
  likesTyreReview 
} from '../restAPI/restGoodsApi';
import { yieldToMain } from '../restAPI/postTaskAdmin';
import { observer } from 'mobx-react-lite';
import { Context } from '../context/Context';
import { createStringUrl } from '../services/stringUrl';
import { IReviewGoods } from '../components/reviews/interfaces/ReviewGoods.interface';
import { IRatingAvg } from './types/RatingModelAvg.type';
import { IRatingBrandAvg } from './types/RatingBrandAvg.type';
import { IRatingSeasonAvg } from './types/RatingBrandSeason.type';
import { FormValues } from '../components/reviews/types/ReviewTyreCreate.type';
import { ICheckOrderItem } from '../components/catalogs/types/CheckOrder.type';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import SpinnerCarRot from '../components/spinners/SpinnerCarRot';

type ILikeTyreType = {
  id_review: number;
  likeCount: number;
  dislikeCount: number;
};

const BreadCrumbs = lazy(() => import('../components/BreadCrumbs'));
const TabsGoodsCard = lazy(() => import('../components/tabs/TabsGoodsCard'));
const Benefits = lazy(() => import('../components/Benefits'));
const AllAboutProduct = lazy(() => import('../components/goods/AllAboutProduct'));
const PropertiesGoods = lazy(() => import('../components/goods/PropertiesGoods'));
const ReviewBrandOverall = lazy(() => import('../components/reviews/ReviewsBrandOverall'));
const ReviewGoodsOverall = lazy(() => import('../components/reviews/ReviewGoodsOverall'));
const ReviewsGoods = lazy(() => import('../components/reviews/ReviewsGoods'));
const SimilarGoods = lazy(() => import('../components/goods/SimilarGoods'));
const TyreCardSmall = lazy(() => import('../components/cards/CardSmall'));
const AllModelBrand = lazy(() => import('../components/goods/AllModelBrand'));
const ProductPayDel = lazy(() => import('../components/goods/ProductPayDel'));
const YouWatched = lazy(() => import('../components/goods/YouWatched'));
const AllTyreModelSize = lazy(() => import('../components/goods/AllTyreModelSize'));
const ButtonAction = lazy(() => import('../components/buttons/ButtonAction'));
const Modal = lazy(() => import('../components/modal/Modal'));
const ReviewCreate = lazy(() => import('../components/reviews/ReviewCreate'));
const ModelSection = lazy(() => import('../components/goods/ModelSection'));
const Question = lazy(() => import('../components/question/Questions'));
const PropertiesWheelGoods = lazy(() => import('../components/goods/PropertiesWheelGoods'));
const CheckOrder = lazy(() => import('../components/modal/CheckOrder'));

const GoodsPage = observer(() => {
  const {goodsTyre, goodsWheel, page, customer} = useContext<any | null>(Context);
  const [ratingModelAvg, setRatingModelAvg] = useState<IRatingAvg>();
  const [ratingBrandAvg, setRatingBrandAvg] = useState<IRatingBrandAvg>();
  const [ratingIdAndIdModelAvg, setRatingIdAndModelAvg] = useState<IRatingAvg>();
  const [ratingSummerAvg, setRatingSummerAvg] = useState<IRatingSeasonAvg>();
  const [ratingWinterAvg, setRatingWinterAvg] = useState<IRatingSeasonAvg>();
  const [ratingAllSeasonAvg, setRatingAllSeasonAvg] = useState<IRatingSeasonAvg>();
  const [reviewCountModel, setReviewCountModel] = useState<number>();
  const [createReview, setCreateReview] = useState<boolean>(false);
  const [dataReview, setDataReview] = useState<{} | null>(null);
  const [similarGoods, setSimilarGoods] = useState<any[] | null>();
  const [similarBrandGoods, setSimilarBrandGoods] = useState<any[] | null>();
  const [allModelsBrand, setAllModelsBrand] = useState<any[] | null>();
  const [allParamsModel, setAllParamsModel] = useState<any[] | null>();
  const [changeTabGoods, setChangeTabGoods] = useState<string>("vseProTovar");
  const [allDiametersModel, setAllDiametersModel] = useState<any[] | null>();
  const [paramsModel, setParamsModel] = useState<boolean>(false);
  const [active, setActive] = useState(false);
  const [checkOrderItem, setCheckOrderItem] = useState<ICheckOrderItem[] | null>([]);
  const isMobileProduct = useMediaQuery({ query: '(max-width: 1440px)' });
  const { t, i18n } = useTranslation();
  const history =  useHistory();
  const location = useLocation();
  const params = useParams<any>();

  useEffect(() => {
    let isMounted = false;
    const getProductByFullName = async () => {
      const getGoodsId: string = 
      JSON.parse(localStorage.getItem('goodsId')!);
      if (!isMounted && !getGoodsId) {
        //console.log('GET_PARAMS: ', params.goodsItem);
        const getProductByName = await getTyresByFullName(params.goodsItem);
        const getProductTyreByModel = await getTyresByModel(params.goodsItem);
        const getProductWheel = await getWheelByFullName(params.goodsItem);
        const getProductWheelByModel = await getWheelsByModel(params.goodsItem);
        // console.log('GET_TYRE_BY_FULL_NAME: ', getProductByName);
        // console.log('GET_TYRE_BY_MODEL: ', getProductTyreByModel);
        if (getProductByName) {
          goodsTyre.setProduct(getProductByName);
          //localStorage.setItem('goodsId', getProductByName?.id);
          //history.push(params.goodsItem);
        }
        if (getProductTyreByModel) {
          //localStorage.setItem('goodsId', getProductTyreByModel?.tyres[0]?.id);
          goodsTyre.setProduct(getProductTyreByModel?.tyres[0]);
          //history.push(params.goodsItem);
        }
        if (getProductWheel) {
          goodsWheel.setProduct(getProductWheel);
          //history.push(params.goodsItem);
        }
        if (getProductWheelByModel) {
          //goodsWheel.setProduct(getProductWheelByModel?.wheels[0]);
          localStorage.setItem('goodsId', getProductWheelByModel?.wheels[0]?.id);
          //history.push(params.goodsItem);
        }
        if (!getProductByName && 
          !getProductTyreByModel && 
          !getProductWheel && 
          !getProductWheelByModel) {
            history.push(NOT_FOUND_ROUTE);
        }
      }
    };
    getProductByFullName();
    return () => {
      isMounted = true;
    };
  },[goodsTyre, goodsWheel, history, params.goodsItem]);
  
  useEffect(() => {
    let isMounted = false;
    const getProduct = async () => {
      const taskProduct: any[] = [
        getTyresByIdParam,
        getWheelsByIdParam,
        getTyresModelRatingAvg,
        getTyresRatingAvgIdAndIdmodel,
        getWheelsModelRatingAvg,
        getWheelsRatingAvgIdAndIdmodel,
        getTyresBrandRatingAvg,
        getWheelsBrandRatingAvg,
        getTyresBrandRatingAvgSeason,
        getTyresCountReviewByBrand,
        getWheelsCountReviewByBrand,
        getTyresCountReviewByModel,
        getWheelsCountReviewByModel,
        createTyreReview,
        createWheelReview,
        getWheelsParamsBy,
        getWheelsParamsByBrand,
        getAllWheelsModelByBrand,
        getAllWheelsDiametersByBrand,
        likesTyreReview,
        getTyresParamsByBrandAndSeason,
        getTyresParamsBySeason,
        getAllTyresModelByBrand,
        getAllTyresParamsByModel,
        getAllTyresDiametersByModel,
      ]
    const getGoodsId: string = 
      JSON.parse(localStorage.getItem('goodsId')!);
    let i: number = 0; 
    while (taskProduct.length > i) {
      if (!isMounted && taskProduct[i] === getTyresByIdParam) {
        const getProduct: any = await taskProduct[i](getGoodsId);
        if (getProduct) {
          goodsTyre.setProduct(getProduct);
        }
      }
      if (!isMounted && taskProduct[i] === getWheelsByIdParam) {
        const getProductWheel: any = await taskProduct[i](getGoodsId);
        if (getProductWheel) {
          goodsWheel.setProduct(getProductWheel);
        } 
      }
      if (!isMounted && taskProduct[i] === getTyresModelRatingAvg && goodsTyre?._product?.id_model) {
        const getRatingModel: any = await taskProduct[i](
          goodsTyre?._product?.id_model
        );
        setRatingModelAvg(getRatingModel[0]); 
      }
      if (!isMounted && taskProduct[i] === getTyresRatingAvgIdAndIdmodel && 
        goodsTyre?._product?.id_model && goodsTyre?._product?.id ) {
        const getTyreRatingIdAndIdModel: any = await taskProduct[i](
          goodsTyre?._product?.id,
          goodsTyre?._product?.id_model
        );
        if(getTyreRatingIdAndIdModel) {
          setRatingIdAndModelAvg(getTyreRatingIdAndIdModel[0]);
        }
      }
      if (!isMounted && taskProduct[i] === getWheelsModelRatingAvg && 
        goodsWheel?._product?.id_model) {
        const getWheelRatingModel: any = await taskProduct[i](
          goodsWheel?._product?.id_model
        );
        setRatingModelAvg(getWheelRatingModel[0]);
      }
      if (!isMounted && taskProduct[i] === getWheelsRatingAvgIdAndIdmodel &&
        goodsWheel?._product?.id_model && goodsWheel?._product?.id
        ) 
        {
        const getWheelRatingIdAndIdModel: any = await taskProduct[i](
          goodsWheel?._product?.id,
          goodsWheel?._product?.id_model
        );
        if(getWheelRatingIdAndIdModel) {
          setRatingIdAndModelAvg(getWheelRatingIdAndIdModel[0]);
        }
      }
      if (!isMounted && taskProduct[i] === getTyresBrandRatingAvg && goodsTyre?._product?.id_brand) {
        const getRatingBrand: any = await taskProduct[i](
          goodsTyre?._product?.id_brand
        );
        setRatingBrandAvg(getRatingBrand);
      }
      if (!isMounted && taskProduct[i] === getWheelsBrandRatingAvg && goodsWheel?._product?.id_brand) {
        const getWheelRatingBrand: any = await taskProduct[i](
          goodsWheel?._product?.id_brand
        );
        setRatingBrandAvg(getWheelRatingBrand);
      }
      if (!isMounted && taskProduct[i] === getTyresBrandRatingAvgSeason && goodsTyre?._product?.id_brand) {
        const getRatingSummer: any = await taskProduct[i](
          goodsTyre?._product?.id_brand, 1
        );
        const getRatingWinter: any = await taskProduct[i](
          goodsTyre?._product?.id_brand, 2
        );
        const getRatingAllSeason: any = await taskProduct[i](
          goodsTyre?._product?.id_brand, 3
        );
        setRatingSummerAvg(getRatingSummer[0]);
        setRatingWinterAvg(getRatingWinter[0]);
        setRatingAllSeasonAvg(getRatingAllSeason[0]);
      }
      if (!isMounted && taskProduct[i] === getTyresCountReviewByModel && goodsTyre?._product?.id_model) {
        const getCountModel: any = await taskProduct[i](goodsTyre?._product?.id_model);
        setReviewCountModel(getCountModel);
      }
      if (!isMounted && taskProduct[i] === getWheelsCountReviewByModel && goodsWheel?._product?.id_model) {
        const getCountWheelModel: any = await taskProduct[i](goodsWheel?._product?.id_model);
        setReviewCountModel(getCountWheelModel);
      }
      if (!isMounted && taskProduct[i] === createTyreReview && dataReview && goodsTyre?._product) {
        if (dataReview) {
          const createReviewTyre: any = await taskProduct[i](
          dataReview,
          goodsTyre?._product?.id,
          goodsTyre?._product?.tyre_brand.id_brand,
          goodsTyre?._product?.tyre_model.id_model,
          goodsTyre?._product?.id_season,
          customer._customer.id_customer,
          customer._customer.picture ?? customer._customer.profile_image_url,
          goodsTyre?.ratingList.rating_dry_road,
          goodsTyre?.ratingList.rating_wet_road,
          goodsTyre?.ratingList.rating_snow_road,
          goodsTyre?.ratingList.rating_ice_road,
          goodsTyre?.ratingList.rating_cross_country,
          goodsTyre?.ratingList.rating_treadwear,
          goodsTyre?.ratingList.rating_price_quality
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
      if (!isMounted && taskProduct[i] === createWheelReview && dataReview && goodsWheel?._product) {
        if (dataReview) {
          const createReviewWheel: any = await taskProduct[i](
          dataReview,
          goodsWheel?._product?.id,
          goodsWheel?._product?.wheel_brand.id_brand,
          goodsWheel?._product?.wheel_model.id_model,
          customer._customer.id_customer,
          customer._customer.picture ?? customer._customer.profile_image_url,
          );
          if (createReviewWheel?.status === 201) {
            setDataReview(null);
            goodsWheel.setNewRating('rating_overall', 0);
            goodsWheel.setNewRating('rating_dry_road', 0);
            goodsWheel.setNewRating('rating_wet_road', 0);
            goodsWheel.setNewRating('rating_snow_road', 0);
            goodsWheel.setNewRating('rating_ice_road', 0);
            goodsWheel.setNewRating('rating_cross_country', 0);
            goodsWheel.setNewRating('rating_treadwear', 0);
            goodsWheel.setNewRating('rating_price_quality', 0);
            setCreateReview(!createReview);
          }
        } 
      }
      if (!isMounted && taskProduct[i] === getTyresParamsByBrandAndSeason 
        && goodsTyre?._product?.id_brand && goodsTyre?._product?.id_season) {
        const getTyresParamsByBrandSeason: any = await taskProduct[i](
          goodsTyre?._product?.params?.params,
          goodsTyre?._product?.tyre_brand?.brand,
          goodsTyre?._product?.season?.season_ua,
        );
        setSimilarBrandGoods(getTyresParamsByBrandSeason);
      }
      if (!isMounted && taskProduct[i] === getWheelsParamsByBrand 
        && goodsWheel?._product?.id_brand) {
        const getWheelsParamsByBrand: any = await taskProduct[i](
          goodsWheel?._product?.wheel_brand.brand,
          goodsWheel?._product?.width.width,
          goodsWheel?._product?.bolt_count_pcd.bolt_count_pcd,
          goodsWheel?._product?.dia.dia,
          goodsWheel?._product?.et.et,
          goodsWheel?._product?.diameter.diameter,
        );
        setSimilarBrandGoods(getWheelsParamsByBrand);
      }
      if (!isMounted && taskProduct[i] === getTyresParamsBySeason 
        && goodsTyre?._product?.id_brand && goodsTyre?._product?.id_season) {
        const getTyresParamsBySeason: any = await taskProduct[i](
          goodsTyre?._product?.params.params,
          goodsTyre?._product?.season.season_ua,
        );
        setSimilarGoods(getTyresParamsBySeason);
      }
      if (!isMounted && taskProduct[i] === getWheelsParamsBy 
        && goodsWheel?._product?.id_width && goodsWheel?._product?.id_dia &&
        goodsWheel?._product?.id_bolt_count_pcd
        ) {
        const getWheelsParamsBy: any = await taskProduct[i](
          goodsWheel?._product?.width.width,
          goodsWheel?._product?.bolt_count_pcd.bolt_count_pcd,
          goodsWheel?._product?.dia.dia,
          goodsWheel?._product?.et.et,
          goodsWheel?._product?.diameter.diameter,
        );
        setSimilarGoods(getWheelsParamsBy);
      }
      if (!isMounted && taskProduct[i] === getAllTyresModelByBrand 
        && goodsTyre?._product?.id_brand && goodsTyre?._product?.id_season) {
        const getTyresModelByBrand: any = await taskProduct[i](
          goodsTyre?._product?.id_brand,
        );
        setAllModelsBrand(getTyresModelByBrand);
      }
      if (!isMounted && taskProduct[i] === getAllWheelsModelByBrand 
        && goodsWheel?._product?.id_brand && goodsWheel?._product?.id_model) {
        const getWheelsModelByBrand: any = await taskProduct[i](
          goodsWheel?._product?.id_brand,
        );
        setAllModelsBrand(getWheelsModelByBrand);
      }
      if (!isMounted && taskProduct[i] === getAllTyresParamsByModel 
        && goodsTyre?._product?.id_brand && goodsTyre?._product?.id_season) {
        const getTyresParamsByModel: any = await taskProduct[i](
          goodsTyre?._product?.id_model,
        );
        setAllParamsModel(getTyresParamsByModel);
      }
      if (!isMounted && taskProduct[i] === getAllTyresDiametersByModel 
        && goodsTyre?._product?.id_brand && goodsTyre?._product?.id_season) {
        const getTyresDiametersByModel: any = await taskProduct[i](
          goodsTyre._product.id_model,
        );
        setAllDiametersModel(getTyresDiametersByModel);
      }
      if (!isMounted && taskProduct[i] === getAllWheelsDiametersByBrand 
        && goodsWheel?._product?.id_brand && goodsWheel?._product?.id_diameter) {
        const getWheelsDiametersByBrand: any = await taskProduct[i](
          goodsWheel?._product?.id_brand,
        );
        setAllDiametersModel(getWheelsDiametersByBrand);
      }
      const task = taskProduct.shift();
      task();
      await yieldToMain();
    }
    localStorage.removeItem('goodsId');
    };
    getProduct();
    return () => {
      isMounted = true;
    };
  },
  [
    createReview, 
    customer._customer.id_customer, 
    customer._customer.picture, 
    customer._customer.profile_image_url, 
    dataReview, 
    goodsTyre, 
    goodsWheel,
    goodsTyre.product,
    goodsWheel.product,
    goodsTyre._product,
    goodsWheel._product,
  ]);
  
  useEffect(() => {
    let isMounted = false;
    const getPathCard = async () => {
      if (!isMounted) {
        if (goodsTyre._product?.full_name) {
          const getTyreUrl: string = 
          createStringUrl(goodsTyre._product?.full_name);
          const getTyreModelUrl = createStringUrl(
            goodsTyre._product?.tyre_brand?.brand + '-' 
            + goodsTyre._product?.tyre_model?.model);
          if (params.goodsItem !== getTyreUrl && 
            params.goodsItem !== getTyreModelUrl) {
            history.push(NOT_FOUND_ROUTE);
          }
          if (params.goodsItem === getTyreModelUrl) {
            setParamsModel(true);
          }
        }
        if (goodsWheel._product?.full_name) {
          const getWheelUrl: string = 
          createStringUrl(goodsWheel?._product?.full_name);
          const getWheelBrandUrl = createStringUrl(
            goodsWheel._product?.wheel_brand?.brand + '-' 
            + goodsWheel._product?.wheel_model?.model);
          if (params.goodsItem !== getWheelUrl && 
            params.goodsItem !== getWheelBrandUrl) {
            history.push(NOT_FOUND_ROUTE);
          }
          if (params.goodsItem === getWheelBrandUrl) {
            setParamsModel(true);
          }
        }
        if (history.location.hash === '#vidguki') {
          setChangeTabGoods("vidguki");
        }
      }
    }
    getPathCard();
    return () => {
      isMounted = true;
    };
  },[
    goodsTyre._product?.full_name,
    goodsTyre._product?.tyre_brand?.brand, 
    goodsTyre._product?.tyre_model?.model, 
    goodsTyre._product?.wheel_brand?.brand, 
    goodsTyre._product?.wheel_model?.model, 
    goodsWheel._product?.full_name, 
    goodsWheel._product?.wheel_brand?.brand, 
    goodsWheel._product?.wheel_model?.model, 
    history, 
    params.goodsItem
  ]) ;

  const handleChangeTab = (e: any) => {
    setChangeTabGoods(e.target.value);
  }
  const openToCreateReview = () => {
    if (changeTabGoods === "vidguki") {
      setCreateReview(!createReview);
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
    }
  };

  const submitDataReview = (data: FormValues) => {
    setDataReview(data);
  };

  const checkOrders = async (
    item : ICheckOrderItem, 
    ratingModel: {avgRatingModel: number },
    storageItem: number,
    priceStockIndex: number,
    ) => {
    try {
      setActive(!active);
      if (!active) {
        const getStorage = await getStorageByIdParam(storageItem);
        const basket: any = await createBasket({
          id_customer: customer.customer?.id, 
          storage: getStorage.storage
        });
        if(basket?.status === 201) {
          const checkItem = checkOrderItem?.find(value => +value.id === +item.id);
          const addTobasket: any = await addGoodsToBasket(
            +item.id,
            item.id_cat,
            checkItem?.quantity ? checkItem?.quantity + 4 : 4,
            item.price[priceStockIndex].price_wholesale,
            item.price[priceStockIndex]?.price,
            item.stock[priceStockIndex]?.id_supplier ?? item.price[priceStockIndex].id_supplier,
            item.stock[priceStockIndex]?.id_storage ?? item.price[priceStockIndex].id_supplier,
            item.category?.category,
            basket.data.id_basket,
            item.full_name,
            item.season?.season_ua ?? null,
            ratingModel?.avgRatingModel ?? 0,
            item.reviews.length,
            item.diameter.diameter,
          ); 
          if (addTobasket?.status === 201) {
            const updateBasketStorage = await getBasketById(basket.data.id_basket);
            setCheckOrderItem(
              [...updateBasketStorage?.basket_storage]
            );
            page.setBasketCount(
              updateBasketStorage?.basket_storage.reduce(
                (sum: any, current: any) => (sum + current.quantity),0)
            );
          }  
        }
      }
    } catch (error) {
        console.log('BASKET_ERROR: ',error);
    }
  }

  return (
    <div className='goodsCard'>
      <Suspense fallback={<SpinnerCarRot/>}>
      <div className='goodsBreadCrumbs'>
      {goodsTyre._product ?
        <BreadCrumbs 
          route={[i18n.resolvedLanguage === 'uk' ? '/' : '/ru' , i18n.resolvedLanguage === 'uk' ? '/tyres' : '/ru/tyres', `${createStringUrl(goodsTyre._product.tyre_brand?.brand) ?? ''}`, `${goodsTyre._product.season?.season_ua ? `${createStringUrl(i18n.resolvedLanguage === 'uk' ? goodsTyre._product.season?.season_ua : goodsTyre?._product?.season?.season)}/${createStringUrl(goodsTyre._product.tyre_brand?.brand)}` : ''}`,`${createStringUrl(goodsTyre._product.tyre_brand?.brand) ?? null}-${createStringUrl(goodsTyre._product.tyre_model?.model) ?? null}`,`${createStringUrl(params.season) ?? null}${createStringUrl(params.studded) ?? null}${createStringUrl(i18n.resolvedLanguage === 'uk' ? goodsTyre._product.vehicle_type?.vehicle_type_ua : goodsTyre?._product?.vehicle_type?.vehicle_type) ?? null}${createStringUrl(goodsTyre._product.tyre_brand?.brand) ?? null} ${createStringUrl(goodsTyre._product.width?.width) ?? null}${createStringUrl(goodsTyre._product.height?.height) ?? null}${createStringUrl(goodsTyre._product.diameter?.diameter) ?? null}${createStringUrl(goodsTyre._product.load_index?.load_index) ?? null}${createStringUrl(goodsTyre._product.speed_index?.speed_index) ?? null}${createStringUrl(goodsTyre._product.reinforce?.reinforce) ?? null}${createStringUrl(goodsTyre._product.homologation?.homologation) ?? null}`]} 
          hrefTitle={[t('goodsPage.bread_crumbs_site'),t('goodsPage.bread_crumbs_tyre'), `${goodsTyre._product.tyre_brand?.brand && !goodsTyre._product.tyre_brand?.brand?.includes(',') ? `${t('goodsPage.bread_crumbs_tyre')} ${goodsTyre._product.tyre_brand?.brand}` : ''}`, goodsTyre._product.tyre_brand?.brand ? `${t('goodsPage.bread_crumbs_tyre')} ${i18n.resolvedLanguage === 'uk' ? goodsTyre._product.season.season_ua : goodsTyre?._product?.season.season} ${goodsTyre._product.tyre_brand.brand}` : '',`${goodsTyre._product.tyre_brand?.brand ?? ''} ${goodsTyre._product.tyre_model?.model ?? ''}`, `${t('goodsPage.bread_crumbs_tyre')} ${goodsTyre._product.vehicle_type?.vehicle_type_ua && !goodsTyre._product.vehicle_type.vehicle_type_ua?.includes(',') ? (i18n.resolvedLanguage === 'uk' ? goodsTyre._product.vehicle_type.vehicle_type_ua : goodsTyre?._product?.vehicle_type.vehicle_type) : ''} ${goodsTyre._product.season?.season_ua && !goodsTyre._product.season.season_ua?.includes(',') ? (i18n.resolvedLanguage === 'uk' ? goodsTyre._product.season.season_ua : goodsTyre?._product?.season.season) : ''} ${goodsTyre._product.studded?.studded && !goodsTyre._product.studded.studded?.includes(',') ? goodsTyre._product.studded.studded : ''} ${goodsTyre._product.tyre_brand?.brand && !goodsTyre._product.tyre_brand.brand?.includes(',') ? goodsTyre._product.tyre_brand.brand : ''}  ${goodsTyre._product.tyre_model?.model && !goodsTyre._product.tyre_model.model?.includes(',') ? goodsTyre._product.tyre_model.model : ''}${goodsTyre._product.width?.width ? goodsTyre._product.width.width : ''} ${goodsTyre._product.height?.height ? '/' + goodsTyre._product.height.height : ''} ${goodsTyre._product.diameter?.diameter ? 'R' + goodsTyre._product.diameter.diameter : '' } ${goodsTyre._product.load_index?.load_index && !goodsTyre._product.load_index.load_index?.includes(',') ? goodsTyre._product.load_index.load_index : ''} ${goodsTyre._product.speed_index?.speed_index && !goodsTyre._product.speed_index.speed_index?.includes(',') ? goodsTyre._product.speed_index.speed_index : ''} ${goodsTyre._product.reinforce?.reinforce && !goodsTyre._product.reinforce.reinforce?.includes(',') ? goodsTyre._product.reinforce.reinforce : ''} ${goodsTyre._product.homologation?.homologation && !goodsTyre._product.homologation.homologation?.includes(',')  ? goodsTyre._product.homologation.homologation : ''}`]}
        />
        : null  
        }
        {goodsWheel._product ?
          <BreadCrumbs 
            route={[i18n.resolvedLanguage === 'uk' ? '/' : '/ru', i18n.resolvedLanguage === 'uk' ? '/wheels' : '/ru/wheels',`${goodsWheel._product.wheel_brand?.brand && !goodsWheel._product.wheel_brand?.brand.includes(',') ?  createStringUrl(goodsWheel._product.wheel_brand?.brand) : null}`,`${createStringUrl(goodsWheel._product.type?.type) ?? null}/${createStringUrl(goodsWheel._product.wheel_brand?.brand) ?? null}`,`${createStringUrl(goodsWheel._product.type?.type) ?? null}${createStringUrl(goodsWheel._product.wheel_brand?.brand) ?? null}${createStringUrl(goodsWheel._product.width?.width) ?? null}${createStringUrl(goodsWheel._product.diameter?.diameter) ?? null}${createStringUrl(goodsWheel._product.bolt_count?.bolt_count) ?? null}${createStringUrl(goodsWheel._product.pcd?.pcd) ?? null}${createStringUrl(goodsWheel._product.et?.et) ?? null}${createStringUrl(goodsWheel._product.dia?.dia) ?? null}`]} 
            hrefTitle={
              [t('goodsPage.bread_crumbs_site'),t('goodsPage.bread_crumbs_wheel'),  `${goodsWheel._product.wheel_brand?.brand && !goodsWheel._product.wheel_brand?.brand?.includes(',') ? `Диски ${goodsWheel._product.wheel_brand?.brand}` : ''}`, goodsWheel._product.wheel_brand?.brand ? `Диск ${goodsWheel._product.type?.type} ${goodsWheel._product.wheel_brand.brand}` : '',`${goodsWheel._product.wheel_brand?.brand ?? ''} ${goodsWheel._product.wheel_model?.model ?? ''}`, `Диски ${goodsWheel._product.wheel_type?.wheel_type && !goodsWheel._product.wheel_type?.type?.includes(',') ? goodsWheel._product.wheel_type.type : ''} ${goodsWheel._product.wheel_brand?.brand && !goodsWheel._product.wheel_brand.brand?.includes(',') ? goodsWheel._product.wheel_brand.brand : ''}  ${goodsWheel._product.wheel_model?.model && !goodsWheel._product.wheel_model.model?.includes(',') ? goodsWheel._product.wheel_model.model : ''} ${goodsWheel._product.width?.width ? goodsWheel._product.width.width : ''} ${goodsWheel._product.diameter?.diameter ? 'R' + goodsWheel._product.diameter.diameter : '' } ${goodsWheel._product.bolt_count?.bolt_count && !goodsWheel._product.bolt_count.bolt_count?.includes(',') ? goodsWheel._product.bolt_count.bolt_count : ''} ${goodsWheel._product.pcd?.pcd && !goodsWheel._product.pcd.pcd?.includes(',') ? goodsWheel._product.pcd.pcd : ''} ${goodsWheel._product.et?.et && !goodsWheel._product.et.et?.includes(',') ? goodsWheel._product.et.et : ''} ${goodsWheel._product.dia?.dia && !goodsWheel._product.dia.dia?.includes(',')  ? goodsWheel._product.dia.dia : ''}`
            //`${(params.category) ?? null}`
          ]}
          />
        : null  
        }
      </div>
      <div className={changeTabGoods === "vseProTovar" ? 
        'tabGoods' : 'tabGoodsActive'}
      >
        { goodsTyre._product && !paramsModel?
        <Helmet>
            <title>{t('goods.goods_tyre_title', {full_name: goodsTyre?._product?.full_name, interpolation: { escapeValue: false }})}</title>
            <meta
                name="description"
                content={t('goods.goods_tyre_description', {full_name: goodsTyre?._product?.full_name, interpolation: { escapeValue: false }})}
            />
            <meta
                name="keywords"
                content={t('goods.goods_tyre_keywords', {full_name: goodsTyre?._product?.full_name, interpolation: { escapeValue: false }})}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + location.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + location.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + location.pathname}/>
        </Helmet>
        : null
        }
        { goodsTyre._product && paramsModel ?
        <Helmet>
            <title>{t('goodsModel.goods_tyre_title', {model: goodsTyre?._product?.tyre_brand?.brand + ' ' + goodsTyre?._product?.tyre_model?.model, interpolation: { escapeValue: false }})}</title>
            <meta
                name="description"
                content={t('goodsModel.goods_tyre_description', {model: goodsTyre?._product?.tyre_brand?.brand + ' ' + goodsTyre?._product?.tyre_model?.model, interpolation: { escapeValue: false }})}
            />
            <meta
                name="keywords"
                content={t('goodsModel.goods_tyre_keywords', {model: goodsTyre?._product?.tyre_brand?.brand + ' ' + goodsTyre?._product?.tyre_model?.model, interpolation: { escapeValue: false }})}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + location.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + location.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + location.pathname}/>
        </Helmet>
        : null
        }
        { goodsWheel._product ?
        <Helmet>
            <title>{t('goods.goods_wheel_title', {full_name: goodsTyre?._product?.full_name, interpolation: { escapeValue: false }})}</title>
            <meta
                name="description"
                content={t('goods.goods_wheel_description', {full_name: goodsTyre?._product?.full_name, interpolation: { escapeValue: false }})}
            />
            <meta
                name="keywords"
                content={t('goods.goods_wheel_keywords', {full_name: goodsTyre?._product?.full_name, interpolation: { escapeValue: false }})}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + location.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + location.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + location.pathname}/>
        </Helmet>
        : null
        }
        <TabsGoodsCard
            onChangeTab={handleChangeTab}
            itemTab={[{id:'1',
            titleGoodsTab: t('goodsPage.tab_title_about'),
            value:"vseProTovar", 
            checked: changeTabGoods,
            reviewCount:0,
            },{id:'2',
            titleGoodsTab:t('goodsPage.tab_title_character'),
            value:"charakteristiki", 
            checked: changeTabGoods,
            reviewCount:0,
            }, {id:'3',
            titleGoodsTab:t('goodsPage.tab_title_reviews'), 
            value:"vidguki",
            checked: changeTabGoods,
            reviewCount: goodsTyre?._product?.reviews?.length ??
            goodsWheel?._product?.reviews?.length
            ?? 0,
            }, {id:'4',
            titleGoodsTab:t('goodsPage.tab_title_questions'),
            value:"pitannja",
            checked: changeTabGoods,
            reviewCount: goodsWheel?._product?.question?.length ?? 
            goodsTyre?._product?.question?.length ?? 0
            }
          ]}
            >
            {changeTabGoods === "vseProTovar" && 
              goodsTyre?._product ?
                <AllAboutProduct 
                  paramsModel={paramsModel}
                  paramsModelPrice={allDiametersModel}
                  goods={goodsTyre?._product}
                  countModelReview={goodsTyre?._product?.reviews?.length}
                  avgRatingModel={ratingIdAndIdModelAvg?.avgRatingModel}
                />
            :null}
            {changeTabGoods === "vseProTovar" && 
              goodsWheel?._product ?
                <AllAboutProduct 
                  paramsModel={paramsModel}
                  paramsModelPrice={allDiametersModel}
                  goods={goodsWheel?._product}
                  countModelReview={goodsWheel?._product?.reviews?.length}
                  avgRatingModel={ratingIdAndIdModelAvg?.avgRatingModel}
                />
            :null}
            {changeTabGoods === "charakteristiki" && goodsTyre?._product ?
              <PropertiesGoods product={goodsTyre?._product}/> 
            :null}
            {changeTabGoods === "charakteristiki" && goodsWheel?._product ?
              <PropertiesWheelGoods product={goodsWheel?._product}/>
            : null
            }
          {changeTabGoods === "vidguki" ?
            <div className='tabReviewsActive'>
              <p/>
              <div className='preReview' onClick={e => e.stopPropagation()}>
                {goodsTyre?._product?.tyre_brand?.brand ?
                <span>
                  {t('goodsPage.review_tyres')} {
                  goodsTyre?._product.tyre_brand.brand 
                  + '' 
                  + goodsTyre?._product.tyre_model.model
                  }
                </span>
                : null
                }
                {goodsWheel?._product?.wheel_brand?.brand ?
                <span>
                  {t('goodsPage.review_wheels')} {
                  goodsWheel?._product.wheel_brand.brand 
                  + '' 
                  + goodsWheel?._product.wheel_model.model
                  }
                </span> 
                : null 
                }
                <ButtonAction 
                  props={t('goodsPage.review_create')}
                  eventItem={openToCreateReview}
                />
              </div>
              <ReviewGoodsOverall 
                typeGoods={goodsTyre?._product ? true : false}
                reviewCount={reviewCountModel}
                ratingsModel={ratingModelAvg}
              /> 
              <ReviewBrandOverall 
                typeGoods={goodsTyre?._product ? true : false}
                brandName={goodsTyre?._product?.tyre_brand?.brand ??
                  goodsWheel?._product?.wheel_brand?.brand 
                }
                avgBrand={ ratingBrandAvg?.rows![0]?.avgRatingBrand} 
                countReviewBrand={ratingBrandAvg?.count}
                ratingSummer={ratingSummerAvg?.avgRatingBrandBySeason}
                ratingWinter={ratingWinterAvg?.avgRatingBrandBySeason}
                ratingAllseason={ratingAllSeasonAvg?.avgRatingBrandBySeason}
              />
              {goodsTyre?._product?.reviews?.length !== 0 ?
                goodsTyre?._product?.reviews?.map((item: IReviewGoods) =>
                <Fragment key={item.id_review}>
                <ReviewsGoods 
                  productFullName={goodsTyre?._product.full_name}
                  rating={goodsTyre?._product.rating}
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
              {goodsWheel?._product?.reviews?.length !== 0 ?
                goodsWheel?._product?.reviews?.map((item: IReviewGoods) =>
                <Fragment key={item.id_review}>
                <ReviewsGoods 
                  productFullName={goodsWheel?._product.full_name}
                  rating={goodsWheel?._product.rating}
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
              <Question/>
            :null
          }
        </TabsGoodsCard>
      </div>
      <div className={
        changeTabGoods === "vseProTovar" || paramsModel ? 
        'productPayDelGoods' : 'productPayDelGoodsNext'}>
        <ProductPayDel/>
      </div>
      <div className={
        changeTabGoods === "vseProTovar" || paramsModel ? 
        'goodsBenefits': 'goodsBenefitsNext'}>
        <Benefits/>
      </div>
      <div className={paramsModel ? 'modelSectionGoodsActive' : 
        'modelSectionGoods'
      }>
      {paramsModel ?
        <ModelSection 
          title={t('goodsPage.options_size_model')}
          modelGoods={allDiametersModel}
          modelName={goodsTyre?._product?.tyre_model?.model ?? goodsWheel?._product?.wheel_model?.model}
          checkOrders={checkOrders}
        /> 
        : null
      }
      </div>
      <div className={paramsModel ? 'similarGoodsModelNone' : 'similarGoodsModel'}>
        <SimilarGoods 
          title={t('goodsPage.similar_brand_goods')}
          similarGoodsList={similarBrandGoods}
          checkOrders={checkOrders}
        />
      </div>
      <div className={paramsModel ? 'similarGoodsNone' : 'similarGoodsGoods'}>
        <SimilarGoods 
          title={t('goodsPage.similar_goods')}
          similarGoodsList={similarGoods}
          checkOrders={checkOrders}
        />
      </div>
      {goodsTyre?.model ?
      <div className={paramsModel ? 'allSizeModelNone' : 'allSizeModel'}>
        <span>{t('goodsPage.all_size_model')} {goodsTyre?.model ?? ''}</span>
        <AllTyreModelSize sizeTyresList={allParamsModel}/>
      </div>
      : null  
      }
      <div className={paramsModel ? 'allModelBrandNone' : 'allModelBrand'}>
        <span>{t('goodsPage.all_size_brand')} {goodsTyre?.brand ?? goodsWheel?.brand ?? ''}</span>
        <AllModelBrand 
          brand={goodsTyre?._product?.tyre_brand?.brand ?? goodsWheel?._product?.wheel_brand?.brand}
          modelBrandList={allModelsBrand ?? []}
        />
      </div>
      <div className= {paramsModel ? 'youWatchedModel' : 'youWatched'}>
        <YouWatched
          checkOrders={checkOrders}
        />
      </div>
      <div className={changeTabGoods === 'vseProTovar' && !isMobileProduct ? 
        'smallCardOne' : 'smallCardNext'
        }
      >
        {goodsTyre._product && !isMobileProduct && !paramsModel ?
          <TyreCardSmall 
            rating={ratingIdAndIdModelAvg}
            product={goodsTyre._product}
            checkOrders={checkOrders}
          />
        : null 
        }
        {goodsWheel._product && !isMobileProduct && !paramsModel ?
          <TyreCardSmall 
            rating={ratingIdAndIdModelAvg}
            product={goodsWheel._product}
            checkOrders={checkOrders}
          />
        : null 
        }
      </div>
      <div className={paramsModel ? 'goodsModalBoxModel' : 'goodsModalBox'}>
        <Modal active={createReview} setActive={setCreateReview}>
          <ReviewCreate 
            onSubmitReviewTyre={submitDataReview}
          />
        </Modal>
        <Modal active={active} setActive={setActive}>
          <CheckOrder orderItem={checkOrderItem}/> 
        </Modal> 
      </div>  
      </Suspense>
    </div>
  );
});

export default GoodsPage;