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
import TyreCardSmall from '../components/cards/CardSmall';
import AllTyreModelSize from '../components/goods/AllTyreModelSize';
import AllModelBrand from '../components/goods/AllModelBrand';
import ProductPayDel from '../components/goods/ProductPayDel';
import YouWatched from '../components/goods/YouWatched';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
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
import ButtonAction from '../components/buttons/ButtonAction';
import Modal from '../components/modal/Modal';
import ReviewCreate from '../components/reviews/ReviewCreate';
import { IReviewGoods } from '../components/reviews/interfaces/ReviewGoods.interface';
import { IRatingAvg } from './types/RatingModelAvg.type';
import { IRatingBrandAvg } from './types/RatingBrandAvg.type';
import { IRatingSeasonAvg } from './types/RatingBrandSeason.type';
import { FormValues } from '../components/reviews/types/ReviewTyreCreate.type';
import ModelSection from '../components/goods/ModelSection';
import Question from '../components/question/Questions';
import PropertiesWheelGoods from '../components/goods/PropertiesWheelGoods';
import { ICheckOrderItem } from '../components/catalogs/types/CheckOrder.type';
import CheckOrder from '../components/modal/CheckOrder';
import { useMediaQuery } from 'react-responsive';

type ILikeTyreType = {
  id_review: number;
  likeCount: number;
  dislikeCount: number;
};

const GoodsPage = observer(() => {
  const {goodsTyre, goodsWheel, page, customer} = useContext<any | null>(Context);
  const [ratingModelAvg, setRatingModelAvg] = useState<IRatingAvg>();
  const [ratingBrandAvg, setRatingBrandAvg] = useState<IRatingBrandAvg>();
  const [ratingIdAndIdModelAvg, setRatingIdAndModelAvg] = useState<IRatingAvg>();
  const [ratingSummerAvg, setRatingSummerAvg] = useState<IRatingSeasonAvg>();
  const [ratingWinterAvg, setRatingWinterAvg] = useState<IRatingSeasonAvg>();
  const [ratingAllSeasonAvg, setRatingAllSeasonAvg] = useState<IRatingSeasonAvg>();
  //const [reviewCountBrand, setReviewCountBrand] = useState<number>();
  const [reviewCountModel, setReviewCountModel] = useState<number>();
  const [createReview, setCreateReview] = useState<boolean>(false);
  const [dataReview, setDataReview] = useState<{} | null>(null);
  //const [likeReview, setLikeReview] = useState<ILikeTyreType | null>(null);
  //const [dislikeReview, setDislikeReview] = useState<number>(0);
  // const [thumbUp, setThumbUp] = useState<boolean | null>(null);
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
  const history =  useHistory();
  const params = useParams<any>();
  let match = useRouteMatch<any>('/:goodsItem');

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
      // if (!isMounted && taskProduct[i] === getTyresCountReviewByBrand && goodsTyre._product.id_brand) {
      //   const getCountBrand: any = await taskProduct[i](goodsTyre._product.id_brand);
      //   setReviewCountBrand(getCountBrand);
      // }
      // if (!isMounted && taskProduct[i] === getWheelsCountReviewByBrand && goodsWheel._product.id_brand) {
      //   const getCountWheelBrand: any = await taskProduct[i](goodsWheel._product.id_brand);
      //   setReviewCountBrand(getCountWheelBrand);
      // }
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
        //console.log('SIMILAR_BRAND_GOODS_PARAMS: ', getTyresParamsByBrandSeason);
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
        //console.log('SIMILAR_BRAND_GOODS_PARAMS: ', getWheelsParamsByBrand);
        setSimilarBrandGoods(getWheelsParamsByBrand);
      }
      if (!isMounted && taskProduct[i] === getTyresParamsBySeason 
        && goodsTyre?._product?.id_brand && goodsTyre?._product?.id_season) {
        const getTyresParamsBySeason: any = await taskProduct[i](
          goodsTyre?._product?.params.params,
          goodsTyre?._product?.season.season_ua,
        );
        //console.log('SIMILAR_GOODS_PARAMS: ', getTyresParamsBySeason);
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
        //console.log('SIMILAR_GOODS_PARAMS: ', getWheelsParamsBy);
        setSimilarGoods(getWheelsParamsBy);
      }
      if (!isMounted && taskProduct[i] === getAllTyresModelByBrand 
        && goodsTyre?._product?.id_brand && goodsTyre?._product?.id_season) {
        const getTyresModelByBrand: any = await taskProduct[i](
          goodsTyre?._product?.id_brand,
        );
        //console.log('ALL_TYRES_MODEL_BY_BRAND: ', getTyresModelByBrand);
        setAllModelsBrand(getTyresModelByBrand);
      }
      if (!isMounted && taskProduct[i] === getAllWheelsModelByBrand 
        && goodsWheel?._product?.id_brand && goodsWheel?._product?.id_model) {
        const getWheelsModelByBrand: any = await taskProduct[i](
          goodsWheel?._product?.id_brand,
        );
        //console.log('ALL_WHEELS_MODEL_BY_BRAND: ', getWheelsModelByBrand);
        setAllModelsBrand(getWheelsModelByBrand);
      }
      if (!isMounted && taskProduct[i] === getAllTyresParamsByModel 
        && goodsTyre?._product?.id_brand && goodsTyre?._product?.id_season) {
        const getTyresParamsByModel: any = await taskProduct[i](
          goodsTyre?._product?.id_model,
        );
        //console.log('ALL_TYRES_MODEL_PARAMS: ', getTyresParamsByModel);
        setAllParamsModel(getTyresParamsByModel);
      }
      if (!isMounted && taskProduct[i] === getAllTyresDiametersByModel 
        && goodsTyre?._product?.id_brand && goodsTyre?._product?.id_season) {
        const getTyresDiametersByModel: any = await taskProduct[i](
          goodsTyre._product.id_model,
        );
        //console.log('ALL_TYRES_MODEL_PARAMS_DIAMETER: ', getTyresDiametersByModel);
        setAllDiametersModel(getTyresDiametersByModel);
      }
      if (!isMounted && taskProduct[i] === getAllWheelsDiametersByBrand 
        && goodsWheel?._product?.id_brand && goodsWheel?._product?.id_diameter) {
        const getWheelsDiametersByBrand: any = await taskProduct[i](
          goodsWheel?._product?.id_brand,
        );
        //console.log('ALL_WHEEL_MODEL_PARAMS_DIAMETER: ', getWheelsDiametersByBrand);
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
          //console.log('PRODUCT_STRING_URL:', getTyreUrl);
          if (match?.params.goodsItem !== getTyreUrl && 
            match?.params.goodsItem !== getTyreModelUrl) {
            history.push(NOT_FOUND_ROUTE);
          }
          if (match?.params.goodsItem === getTyreModelUrl) {
            setParamsModel(true);
          }
        }
        if (goodsWheel._product?.full_name) {
          const getWheelUrl: string = 
          createStringUrl(goodsWheel?._product?.full_name);
          const getWheelBrandUrl = createStringUrl(
            goodsWheel._product?.wheel_brand?.brand + '-' 
            + goodsWheel._product?.wheel_model?.model);
          //console.log('PRODUCT_STRING_URL:', getTyreUrl);
          if (match?.params.goodsItem !== getWheelUrl && 
            match?.params.goodsItem !== getWheelBrandUrl) {
            history.push(NOT_FOUND_ROUTE);
          }
          if (match?.params.goodsItem === getWheelBrandUrl) {
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
    match?.params.goodsItem
  ]) ;
  //console.log('LOCATION_PATH:', history.location.hash);
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

  const checkOrders = async (
    item : ICheckOrderItem, 
    ratingModel: {avgRatingModel: number },
    storageItem: number,
    priceStockIndex: number,
    ) => {
    try {
        setActive(!active);
        if (!active) {
            // console.log('ITEM: ', item);
            // console.log("RATING_ITEM", ratingModel);
            // console.log("STORAGE_ITEM", storageItem);
            // console.log("PRICE_STOCK_INDEX", priceStockIndex);
            const getStorage = await getStorageByIdParam(storageItem);
            const basket: any = await createBasket({
                id_customer: customer.customer?.id, 
                storage: getStorage.storage
            });
            // console.log('GET_STORAGE: ', getStorage);
            
            // console.log('CREATE_BASKET_ID_BASKET: ', basket?.data);
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
                //console.log('ADD_BASK: ', addTobasket);
                if (addTobasket?.status === 201) {
                    const updateBasketStorage = await getBasketById(basket.data.id_basket);
                    setCheckOrderItem(
                        [...updateBasketStorage?.basket_storage]
                    );
                    page.setBasketCount(
                        updateBasketStorage?.basket_storage.reduce(
                            (sum: any, current: any) => (sum + current.quantity),0)
                    );
                // console.log('BASKET_ORDERS_ARR: ', basket?.data.basket_storage);
                // console.log('ADD_TO_BASKET: ', addTobasket?.data); 
                }  
            }
        }
    } catch (error) {
        console.log('BASKET_ERROR: ',error);
    }
  }

  // console.log('LIKE_REVIEW: ', likeReview);
  //console.log("DATA_REVIEW: ", dataReview);
  //console.log('MATCH_URL_PARAMS: ', match?.params.goodsItem);
  // console.log('MATCH_URL: ', match);
  // console.log('RATING_MODEL_AVRG: ', ratingModelAvg?.avgRatingModel);
  // console.log("RATING_AVRG_ID_AND_ID_MODEL: ", ratingIdAndIdModelAvg?.avgRatingModel);
  //console.log('RATING_SUMMER: ', ratingSummerAvg);
  console.log('PRODUCT_WHEEL: ', goodsWheel?._product);
  console.log('PRODUCT_TYRE: ', goodsTyre?._product);
  // console.log('LOCALSORAGE_GOODS_ID: ',JSON.parse(localStorage.getItem('goodsId')!));
  // console.log('THUMB_UP:', thumbUp);
  // console.log('THUMB_DOWN:', thumbDown);
  //console.log('GOODS_TYRE_PRODUCT: ', goodsTyre.product)
  //console.log("PARAMS: ", params);
  //console.log("PARAMS_FROM_URL: ", params.goodsItem.replace(/-/g, ' '));

  return (
    <div className='goodsCard'>
      <div className='goodsBreadCrumbs'>
      {goodsTyre._product ?
        <BreadCrumbs 
          route={['/','/tyres', `${createStringUrl(goodsTyre._product.tyre_brand?.brand) ?? ''}`, `${goodsTyre._product.season?.season_ua ? `${createStringUrl(goodsTyre._product.season?.season_ua)}/${createStringUrl(goodsTyre._product.tyre_brand?.brand)}` : ''}`,`${createStringUrl(goodsTyre._product.tyre_brand?.brand) ?? null}-${createStringUrl(goodsTyre._product.tyre_model?.model) ?? null}`,`${createStringUrl(params.season) ?? null}${createStringUrl(params.studded) ?? null}${createStringUrl(goodsTyre._product.vehicle_type?.vehicle_type_ua) ?? null}${createStringUrl(goodsTyre._product.tyre_brand?.brand) ?? null} ${createStringUrl(goodsTyre._product.width?.width) ?? null}${createStringUrl(goodsTyre._product.height?.height) ?? null}${createStringUrl(goodsTyre._product.diameter?.diameter) ?? null}${createStringUrl(goodsTyre._product.load_index?.load_index) ?? null}${createStringUrl(goodsTyre._product.speed_index?.speed_index) ?? null}${createStringUrl(goodsTyre._product.reinforce?.reinforce) ?? null}${createStringUrl(goodsTyre._product.homologation?.homologation) ?? null}`]} 
          hrefTitle={['Інтернет-магазин SkyParts','Шини', `${goodsTyre._product.tyre_brand?.brand && !goodsTyre._product.tyre_brand?.brand?.includes(',') ? `Шини ${goodsTyre._product.tyre_brand?.brand}` : ''}`, goodsTyre._product.tyre_brand?.brand ? `Шина ${goodsTyre._product.season.season_ua} ${goodsTyre._product.tyre_brand.brand}` : '',`${goodsTyre._product.tyre_brand?.brand ?? ''} ${goodsTyre._product.tyre_model?.model ?? ''}`, `Шини ${goodsTyre._product.vehicle_type?.vehicle_type_ua && !goodsTyre._product.vehicle_type.vehicle_type_ua?.includes(',') ? goodsTyre._product.vehicle_type.vehicle_type_ua : ''} ${goodsTyre._product.season?.season_ua && !goodsTyre._product.season.season_ua?.includes(',') ? goodsTyre._product.season.season_ua : ''} ${goodsTyre._product.studded?.studded && !goodsTyre._product.studded.studded?.includes(',') ? goodsTyre._product.studded.studded : ''} ${goodsTyre._product.tyre_brand?.brand && !goodsTyre._product.tyre_brand.brand?.includes(',') ? goodsTyre._product.tyre_brand.brand : ''}  ${goodsTyre._product.tyre_model?.model && !goodsTyre._product.tyre_model.model?.includes(',') ? goodsTyre._product.tyre_model.model : ''}${goodsTyre._product.width?.width ? goodsTyre._product.width.width : ''} ${goodsTyre._product.height?.height ? '/' + goodsTyre._product.height.height : ''} ${goodsTyre._product.diameter?.diameter ? 'R' + goodsTyre._product.diameter.diameter : '' } ${goodsTyre._product.load_index?.load_index && !goodsTyre._product.load_index.load_index?.includes(',') ? goodsTyre._product.load_index.load_index : ''} ${goodsTyre._product.speed_index?.speed_index && !goodsTyre._product.speed_index.speed_index?.includes(',') ? goodsTyre._product.speed_index.speed_index : ''} ${goodsTyre._product.reinforce?.reinforce && !goodsTyre._product.reinforce.reinforce?.includes(',') ? goodsTyre._product.reinforce.reinforce : ''} ${goodsTyre._product.homologation?.homologation && !goodsTyre._product.homologation.homologation?.includes(',')  ? goodsTyre._product.homologation.homologation : ''}`]}
        />
        : null  
        }
        {goodsWheel._product ?
          <BreadCrumbs 
            route={['/','/wheels',`${goodsWheel._product.wheel_brand?.brand && !goodsWheel._product.wheel_brand?.brand.includes(',') ?  createStringUrl(goodsWheel._product.wheel_brand?.brand) : null}`,`${createStringUrl(goodsWheel._product.type?.type) ?? null}/${createStringUrl(goodsWheel._product.wheel_brand?.brand) ?? null}`,`${createStringUrl(goodsWheel._product.type?.type) ?? null}${createStringUrl(goodsWheel._product.wheel_brand?.brand) ?? null}${createStringUrl(goodsWheel._product.width?.width) ?? null}${createStringUrl(goodsWheel._product.diameter?.diameter) ?? null}${createStringUrl(goodsWheel._product.bolt_count?.bolt_count) ?? null}${createStringUrl(goodsWheel._product.pcd?.pcd) ?? null}${createStringUrl(goodsWheel._product.et?.et) ?? null}${createStringUrl(goodsWheel._product.dia?.dia) ?? null}`]} 
            hrefTitle={
              ['Інтернет-магазин SkyParts','Диски',  `${goodsWheel._product.wheel_brand?.brand && !goodsWheel._product.wheel_brand?.brand?.includes(',') ? `Диски ${goodsWheel._product.wheel_brand?.brand}` : ''}`, goodsWheel._product.wheel_brand?.brand ? `Диск ${goodsWheel._product.type?.type} ${goodsWheel._product.wheel_brand.brand}` : '',`${goodsWheel._product.wheel_brand?.brand ?? ''} ${goodsWheel._product.wheel_model?.model ?? ''}`, `Диски ${goodsWheel._product.wheel_type?.wheel_type && !goodsWheel._product.wheel_type?.type?.includes(',') ? goodsWheel._product.wheel_type.type : ''} ${goodsWheel._product.wheel_brand?.brand && !goodsWheel._product.wheel_brand.brand?.includes(',') ? goodsWheel._product.wheel_brand.brand : ''}  ${goodsWheel._product.wheel_model?.model && !goodsWheel._product.wheel_model.model?.includes(',') ? goodsWheel._product.wheel_model.model : ''} ${goodsWheel._product.width?.width ? goodsWheel._product.width.width : ''} ${goodsWheel._product.diameter?.diameter ? 'R' + goodsWheel._product.diameter.diameter : '' } ${goodsWheel._product.bolt_count?.bolt_count && !goodsWheel._product.bolt_count.bolt_count?.includes(',') ? goodsWheel._product.bolt_count.bolt_count : ''} ${goodsWheel._product.pcd?.pcd && !goodsWheel._product.pcd.pcd?.includes(',') ? goodsWheel._product.pcd.pcd : ''} ${goodsWheel._product.et?.et && !goodsWheel._product.et.et?.includes(',') ? goodsWheel._product.et.et : ''} ${goodsWheel._product.dia?.dia && !goodsWheel._product.dia.dia?.includes(',')  ? goodsWheel._product.dia.dia : ''}`
            //`${(params.category) ?? null}`
          ]}
          />
        : null  
        }
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
            reviewCount: goodsTyre?._product?.reviews?.length ??
            goodsWheel?._product?.reviews?.length
            ?? 0,
            }, {id:'4',
            titleGoodsTab:"ПИТАННЯ ТА ВІДПОВІДІ",
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
              <div className='preReview'>
                {goodsTyre?._product?.tyre_brand?.brand ?
                <span>
                  Відгуки про шини {
                  goodsTyre?._product.tyre_brand.brand 
                  + '' 
                  + goodsTyre?._product.tyre_model.model
                  }
                </span>
                : null
                }
                {goodsWheel?._product?.wheel_brand?.brand ?
                <span>
                  Відгуки про диски {
                  goodsWheel?._product.wheel_brand.brand 
                  + '' 
                  + goodsWheel?._product.wheel_model.model
                  }
                </span> 
                : null 
                } 
                <ButtonAction 
                  props={'Написати відгук'}
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
          modelGoods={allDiametersModel}
          modelName={goodsTyre?._product?.tyre_model?.model ?? goodsWheel?._product?.wheel_model?.model}
          checkOrders={checkOrders}
        /> 
        : null
      }
      </div>
      <div className={paramsModel ? 'similarGoodsModelNone' : 'similarGoodsModel'}>
        <SimilarGoods 
          similarGoodsList={similarBrandGoods}
          checkOrders={checkOrders}
        />
      </div>
      <div className={paramsModel ? 'similarGoodsNone' : 'similarGoods'}>
        <SimilarGoods 
          similarGoodsList={similarGoods}
          checkOrders={checkOrders}
        />
      </div>
      {goodsTyre?.model ?
      <div className={paramsModel ? 'allSizeModelNone' : 'allSizeModel'}>
        <span>Усі розміри моделі {goodsTyre?.model ?? ''}</span>
        <AllTyreModelSize sizeTyresList={allParamsModel}/>
      </div>
      : null  
      }
      <div className={paramsModel ? 'allModelBrandNone' : 'allModelBrand'}>
        <span>Усі моделі бренда {goodsTyre?.brand ?? goodsWheel?.brand ?? ''}</span>
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
        <Modal active={createReview} setActive={openToCreateReview}>
          <ReviewCreate 
            onSubmitReviewTyre={submitDataReview}
          />
        </Modal> 
        <Modal active={active} setActive={setActive}>
          <CheckOrder orderItem={checkOrderItem}/> 
        </Modal> 
      </div>  
    </div>
  );
});

export default GoodsPage;