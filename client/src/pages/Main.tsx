import React, { useContext, useEffect, useState, Suspense, lazy} from 'react';
import '../css/Main.css';
import { Context } from '../context/Context';
import { getAllArticlesLimit, getAllOrdersLeader, getAllStoreReviewLimit, getTyresById, getTyresOffsetMain, getWheelsById, getWheelsMainOffset } from '../restAPI/restGoodsApi';
import { yieldToMain } from '../restAPI/postTaskAdmin';
import { observer } from 'mobx-react-lite';
import { useMediaQuery } from 'react-responsive';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import SpinnerCarRot from '../components/spinners/SpinnerCarRot';

const Slider = lazy(() => import('../components/Slider'));
const CategorySlide = lazy(() => import('../components/CategorySlide'));
const TabProdMain = lazy(() => import('../components/tabs/TabProdMain'));
const Benefits = lazy(() => import('../components/Benefits'));
const ReviewsMain = lazy(() => import('../components/reviews/ReviewsMain'));
const TabMain = lazy(() => import('../components/tabs/TabMain'));
const NewsMainBox = lazy(() => import('../components/news/NewsMainBox'));
const ReviewStore = lazy(() => import('../components/reviews/ReviewStore'));
const BrandsListMain = lazy(() => import('../components/BrandsListMain'));
const PromotionBox = lazy(() => import('../components/PromotionBox'));
const ButtonPrevNext = lazy(() => import('../components/buttons/ButtonPrevNext'));

const Main = observer(() => {
  const {goodsTyre, goodsWheel, filter} = useContext<any | null>(Context);
  const [filterClose, setFilterClose] = useState<boolean>(false);
  const [leaderOrder, setLeaderOrder] = useState<any[] | null>([]);
  const [prevBtnLeader, setPrevBtnLeader] = useState<number>(0);
  const [nextBtnLeader, setNextBtnLeader] = useState<number>(4);
  const [reviewStoreAll, setReviewStoreAll] = useState<any[] | null>();
  const [prevBtnReview, setPrevBtnReview] = useState<number>(0);
  const [nextBtnReview, setNextBtnReview] = useState<number>(0);
  const [articlesAll, setArticlesAll] = useState<any[] | null>();
  const [chooseFilterState, setChooseFilterState] = useState<string>('ШИНИ');
  const isMobileMain = useMediaQuery({ query: '(max-width: 475px)' });
  const { t, i18n } = useTranslation();

  useEffect(() =>{
    let isMounted = false;
    const loadMainTyreTask = async () => {
      if(!isMounted) {
        let tyreFilterGoods: any = await getTyresOffsetMain(
          chooseFilterState === 'ШИНИ' ? filter.width : '',
          chooseFilterState === 'ШИНИ' ? filter.height : '',
          chooseFilterState === 'ШИНИ' ? filter.diameter : '',
          chooseFilterState === 'ШИНИ' ? filter.season : '',
          chooseFilterState === 'ШИНИ' ? filter.brands : '',
            filter.sort,
          );
          let setSeasonFilter :any[] | null = [];
          
          tyreFilterGoods?.rows?.season?.map((item: any) =>
          { return (
            setSeasonFilter?.push(i18n.resolvedLanguage === 'uk' ? item?.season_ua : item?.season)
            )
          })
          if (filter.width) {
            goodsTyre?.setWidth(
              Array.from(new Set(
                [...goodsTyre._width, ...tyreFilterGoods?.rows?.width])).sort(
                (a: any, b: any) => a?.localeCompare(b))
            );
            filter.setWidthSearch(goodsTyre._width);
          } else {
            goodsTyre?.setWidth(
              Array.from(new Set(tyreFilterGoods?.rows?.width)).sort(
              (a: any, b: any) => a?.localeCompare(b))
            );
            filter.setWidthSearch(goodsTyre._width);
          }
          if (filter.height) {
            goodsTyre?.setHeight(
              Array.from(new Set(
                [...goodsTyre._height, ...tyreFilterGoods?.rows?.height]
              )).sort(
                (a: any, b: any) => a?.localeCompare(b))
            );
            filter.setHeightSearch(goodsTyre._height);
          } else {
            goodsTyre?.setHeight(
              Array.from(new Set(tyreFilterGoods?.rows?.height)).sort(
                (a: any, b: any) => a?.localeCompare(b))
            );
            filter.setHeightSearch(goodsTyre._height);
          }
          if (filter.diameter) {
            goodsTyre?.setDiameter(
              Array.from(new Set(
                [...goodsTyre._diameter, ...tyreFilterGoods?.rows?.diameter]
              )).sort(
                (a: any, b: any) => a?.localeCompare(b))
            );
            filter.setDiameterSearch(goodsTyre._diameter);
          } else {
            goodsTyre?.setDiameter(
              Array.from(new Set(tyreFilterGoods?.rows?.diameter)).sort(
                (a: any, b: any) => a?.localeCompare(b))
            );
            filter.setDiameterSearch(goodsTyre._diameter);
          }
          if (filter.brands) {
            goodsTyre?.setBrands(
              Array.from(new Set(
                [...goodsTyre._brands, ...tyreFilterGoods?.rows?.brand]
              )).sort(
                (a: any, b: any) => a?.localeCompare(b))
            );
            filter.setBrandSearch(goodsTyre._brands);
          } else {
            goodsTyre?.setBrands(
              Array.from(new Set(tyreFilterGoods?.rows?.brand)).sort(
                (a:any, b:any) => a?.localeCompare(b))
            );
            filter.setBrandSearch(goodsTyre._brands); 
          }
          if (filter.season) {
            goodsTyre?.setSeason(
              Array.from(new Set(
                [...goodsTyre._season, ...setSeasonFilter]
              ))
            )
          } else {
            goodsTyre?.setSeason(
              Array.from(new Set(setSeasonFilter))
            )
          }
          setSeasonFilter =  null;
      }
    }
    loadMainTyreTask();
    return () => {
        isMounted = true;
    };
  },
  [
    filter, 
    goodsTyre, 
    filter.width, 
    filter.height, 
    filter.diameter, 
    filter.season, 
    filter.brands, 
    filter.sort, 
    chooseFilterState, 
    i18n.resolvedLanguage
  ]);

  useEffect(() =>{
    let isMounted = false;
    const loadMainWheelTask = async() => {
      const taskLoad: any[] = [
        getWheelsMainOffset
      ];
      let i:number = 0;
      while(taskLoad.length > i) {
        if(!isMounted && taskLoad[i] === getWheelsMainOffset) {
          let wheelFilterGoods: any = await taskLoad[i](
            chooseFilterState === 'ДИСКИ' ? filter.width : '',
            chooseFilterState === 'ДИСКИ' ? filter.diameter : '',
            chooseFilterState === 'ДИСКИ' ? filter.bolt_count : '',
            chooseFilterState === 'ДИСКИ' ? filter.brands : '',
            chooseFilterState === 'ДИСКИ' ? filter.type : '',
            filter.sort,
          );
          if (filter.width) {
            goodsWheel?.setWidth(
              Array.from(new Set(
                [...goodsWheel._width, ...wheelFilterGoods?.rows?.width]
              )).sort(
                (a: any, b: any) => a?.localeCompare(b))
            );
            filter.setWidthSearch(goodsWheel._width);
          } else {
            goodsWheel?.setWidth(
              Array.from(new Set(wheelFilterGoods?.rows?.width)).sort(
              (a: any, b: any) => a?.localeCompare(b))
            );
            filter.setWidthSearch(goodsWheel._width);
          }
          if (filter.diameter) {
            goodsWheel?.setDiameter(
              Array.from(new Set(
                [...goodsWheel._diameter, ...wheelFilterGoods?.rows?.diameter]
              )).sort(
                (a: any, b: any) => a?.localeCompare(b))
            );
            filter.setDiameterSearch(goodsWheel._diameter);
          } else {
            goodsWheel?.setDiameter(
              Array.from(new Set(wheelFilterGoods?.rows?.diameter)).sort(
                (a: any, b: any) => a?.localeCompare(b))
            );
            filter.setDiameterSearch(goodsWheel._diameter);
          }
          if (filter.brands) {
            goodsWheel?.setBrands(
              Array.from(new Set(
                [...goodsWheel._brands, ...wheelFilterGoods?.rows?.brand]
              )).sort(
                (a: any, b: any) => a?.localeCompare(b))
            );
            filter.setBrandSearch(goodsWheel._brands);
          } else {
            goodsWheel?.setBrands(
              Array.from(new Set(wheelFilterGoods?.rows?.brand)).sort(
                (a: any, b: any) => a?.localeCompare(b))
            );
            filter.setBrandSearch(goodsWheel._brands);   
          }
          if (filter.bolt_count) {
            goodsWheel?.setBoltCount(
              Array.from(new Set(
                [...goodsWheel._bolt_count, ...wheelFilterGoods?.rows?.bolt_count]
              ))
            )
          } else {
            goodsWheel?.setBoltCount(
              Array.from(new Set(wheelFilterGoods?.rows?.bolt_count))
            )
            filter.setBoltCount(goodsWheel._bolt_count);
          }
          if (filter.type) {
            goodsWheel?.setType(
              Array.from(new Set(
                [...goodsWheel._type, ...wheelFilterGoods?.rows?.type]
              ))
            )
          } else {
            goodsWheel?.setType(
              Array.from(new Set(wheelFilterGoods?.rows?.type))
            )
          }
        }
        const task = taskLoad.shift();
        task();
        await yieldToMain(); 
      }
    }
    loadMainWheelTask();
    return () => {
        isMounted = true;
    };
  },
  [
    filter, 
    chooseFilterState,
    filter.width, 
    filter.diameter,  
    filter.brands, 
    filter.sort, 
    filter.bolt_count,
    filter.brands,
    filter.type,
    goodsWheel, 
  ]);

  useEffect(() => {
    let isMountedReview = false;
    const getTyresReviews = async () => {
      if (!isMountedReview) {
        let getAllReviewStore: any = await getAllStoreReviewLimit(
          String(1),
          String(nextBtnReview)
        );
        if (getAllReviewStore && getAllReviewStore?.length > 0) {
          setReviewStoreAll(getAllReviewStore);
        }
      }
    };
    getTyresReviews();
    return () => {
      isMountedReview = true;
    };
  },[nextBtnReview]);

  useEffect(() => {
    let isMountedLeader = false;
    const getLeadersOrder = async () => {
      if (!isMountedLeader) {
        let getOrdersLeader: any[] | undefined = await getAllOrdersLeader();
        if (Array.isArray(getOrdersLeader) && getOrdersLeader?.length > 0) {
          getOrdersLeader?.forEach( async(item: any) => {
            const getTyre: any = await getTyresById(item.id);
            const getWheel: any = await getWheelsById(item.id);
            if (getTyre) {
              getTyre.typeCard = 'tyre';
              setLeaderOrder(
                oldLeader=> Array.from(new Set([...oldLeader!, getTyre]))
              );
            }
            if (getWheel) {
              getWheel.typeCard = 'wheel';
              setLeaderOrder(
              oldLeader => Array.from(new Set([...oldLeader!, getWheel])));
            }
          });
        };
      };
    };
    getLeadersOrder();
    return () => {
      isMountedLeader = true;
    };
  },[]);

  useEffect(() => {
    let isMountedReview = false;
    const getArticles = async () => {
      if (!isMountedReview) {
        let getAllArticles: any = await getAllArticlesLimit(
          String(3),
          String(0)
        );
        if (getAllArticles) {
          setArticlesAll(getAllArticles);
        }
      }
    };
    getArticles();
    return () => {
      isMountedReview = true;
    };
  },[]);

  const handleCloseFilter =() => {
    if(filterClose) {
      setFilterClose(false);
    }
  };

  const prevBtnEvent = () => {
    if (prevBtnLeader === 0 
       && nextBtnLeader <= (leaderOrder!.length - 6)) {
      setPrevBtnLeader(oldPrevBtn => leaderOrder!.length - oldPrevBtn);
      setNextBtnLeader(oldNextBtn => oldNextBtn - 1);
    }
    if (prevBtnLeader > leaderOrder!.length - 4 
      && nextBtnLeader <= (leaderOrder!.length - 6)) {
      setPrevBtnLeader(oldPrevBtn => oldPrevBtn - 1);
      setNextBtnLeader(oldNextBtn => oldNextBtn - 1);
    }
    if (prevBtnLeader === leaderOrder!.length - 3 
      && nextBtnLeader === 0) {
      setPrevBtnLeader(6);
      setNextBtnLeader(leaderOrder!.length);
    }
    if (prevBtnLeader <= leaderOrder!.length - 4 
      && nextBtnLeader <= leaderOrder!.length) {
        setPrevBtnLeader(oldPrevBtn => oldPrevBtn - 1);
        setNextBtnLeader(oldNextBtn => oldNextBtn - 1);
    }
  };

  const nextBtnEvent = () => {
     if (prevBtnLeader < leaderOrder!.length - 4 
       && nextBtnLeader < leaderOrder!.length) {
      setPrevBtnLeader(oldPrevBtn => oldPrevBtn + 1);
      setNextBtnLeader(oldNextBtn => oldNextBtn + 1);
     }
    if (prevBtnLeader > leaderOrder!.length - 4 
      && nextBtnLeader < leaderOrder!.length - 6) {
      setPrevBtnLeader(oldPrevBtn => oldPrevBtn + 1);
      setNextBtnLeader(oldNextBtn => oldNextBtn + 1);
    }
    if (prevBtnLeader === leaderOrder!.length - 4
      && nextBtnLeader === leaderOrder!.length) {
      setPrevBtnLeader(oldPrevBtn => oldPrevBtn + 1);
      setNextBtnLeader(0);
    }
    if (prevBtnLeader === leaderOrder!.length 
      && nextBtnLeader === (leaderOrder!.length - 7)) {
      setPrevBtnLeader(1);
      setNextBtnLeader(5);
    }
  };

  const prevBtnReviewStore = () => {
    if (prevBtnReview > 0) {
      setPrevBtnReview(oldPrevBtn => oldPrevBtn - 1);
      setNextBtnReview(oldNextBtn => oldNextBtn - 1);
    }
    if (prevBtnReview === 0) {
      setPrevBtnReview(0);
      setNextBtnReview(0);
    }
  };

  const nextBtnReviewStore = () => {
    setNextBtnReview(oldNextBtn => oldNextBtn + 1);
    setPrevBtnReview(oldPrevBtn => oldPrevBtn + 1);
  };

  return (
    <div className='main'
      onClick={handleCloseFilter}
    > 
      {i18n.resolvedLanguage === 'uk' ?
      <Helmet>
        <title>SKYPARTS - Інтернет Магазин Шин І Дисків В Україні Краща Ціна Авто Товари Гума І Диски Купити Для будь-якого типу автомобіля</title>
        <meta
          name="description"
          content="Шини та диски в інтернет-магазині СКАЙПАРТС. Великий вибір автомобільна гума, найкращі ціни у Харкові, Дніпрі, Києві. ✈Швидка доставка по Україні✈. 💰Знижки акції💰. ✍️Відгуки✍️. ☎ +38 (099) 490-00-55"
        />
        <meta
          name="keywords"
          content="шини та диски. Автомобільні диски гума в інтернет-магазині СКАЙПАРСТ"
        />
        <link rel="canonical" href={process.env.REACT_APP_CORS}/>
        <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru'}/>
        <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS}/>
      </Helmet>
      :
      <Helmet>
        <title>SKYPARTS - Интернет Магазин Шин И Дисков В Украине Лучшая Цена Авто Товары Резина И Диски Купить Для Любого Типа Автомобиля</title>
        <meta
          name="description"
          content="Шины и диски в интернет - магазине СКАЙПАРТС. Большой выбор автомобильная резина, лучшие цены в Харькове, Днепре, Киеве. ✈Быстрая доставка по Украине✈. 💰Скидки акции💰. ✍️Отзывы✍️. ☎ +38 (099) 490-00-55"
        />
        <meta
          name="keywords"
          content="шины и диски. Автомобильные диски резина в интернет-магазине СКАЙПАРСТ"
        />
        <link rel="canonical" href={process.env.REACT_APP_CORS + '/ru'}/>
        <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS}/>
        <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru'}/>
      </Helmet>
      }
      <Suspense fallback={<SpinnerCarRot/>}>
      {!isMobileMain ?
        <Slider/>
        : null
      }
      <TabMain
        filterMainState={filterClose}
        filterStateAction={setFilterClose}
        getFilterTitle={setChooseFilterState}
      />
      <BrandsListMain/>
      <TabProdMain titleTab={t('main.title_prod_main')}>
        <PromotionBox 
          prevButtonEvent={prevBtnEvent}
          nextButtonEvent={nextBtnEvent}
          prevBtn={prevBtnLeader}
          nextBtn={nextBtnLeader}
          itemsArray={leaderOrder} 
        />
      </TabProdMain>
      <Benefits/>
      <CategorySlide/>
      <div className='mainReviewsBox'>
        <ReviewsMain 
          props={t('main.review_main')}
          marginText={0}
          prevBtnAction={undefined}
          nextBtnAction={undefined}
          buttonPosition={undefined}
        >
        <div >
          {Array.isArray(reviewStoreAll) && reviewStoreAll?.length > 0 ?
          reviewStoreAll?.map((item: any) =>
          <div key={item?.id_review_store + '_review'}>
            <ReviewStore storeData={item}/>
          </div>
          )
          : 
          <div className='mainAfterReviews' >
            <a className='mainLinkReview'
            href='/review'>{t('main.review_main_all')}</a>
          </div>
          }
        </div>
        </ReviewsMain>
      </div>
      <ButtonPrevNext 
        prevBtnLeft={200} 
        prevTop={-200} 
        nextBtnRight={-1125} 
        nextTop={-195}    
        leftClickActive={prevBtnReviewStore} 
        rightClickActive={nextBtnReviewStore}
      />
      <NewsMainBox 
        isNewsPage={false}
        articlesArr={articlesAll}
      />
      </Suspense>
    </div>   
  );
});

export default Main;