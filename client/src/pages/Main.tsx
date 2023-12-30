import React, { useContext, useEffect, useState } from 'react';
import '../css/Main.css';
import Slider from '../components/Slider';
import CategorySlide from '../components/CategorySlide';
import TabProdMain from '../components/tabs/TabProdMain';
import Benefits from '../components/Benefits';
import ReviewsMain from '../components/reviews/ReviewsMain';
import TabMain from '../components/tabs/TabMain';
import NewsMainBox from '../components/news/NewsMainBox';
import ReviewStore from '../components/reviews/ReviewStore';
import { Context } from '../context/Context';
import { getAllArticlesLimit, getAllOrdersLeader, getAllStoreReviewLimit, getTyresById, getTyresOffsetMain, getTyresWithoutOffset, getWheelsById, getWheelsMainOffset, getWheelsWithoutOffset } from '../restAPI/restGoodsApi';
import { yieldToMain } from '../restAPI/postTaskAdmin';
import { observer } from 'mobx-react-lite';
import BrandsListMain from '../components/BrandsListMain';
import PromotionBox from '../components/PromotionBox';
import ButtonPrevNext from '../components/buttons/ButtonPrevNext';

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

  useEffect(() =>{
    let isMounted = false;
    
    const loadMainTyreTask = async () => {
      if(!isMounted) {
        console.time('GET_REQUEST_TYRE_FROM_DATA_BASE');
        let tyreFilterGoods: any = await getTyresOffsetMain(
            filter.width,
            filter.height,
            filter.diameter,
            filter.season,
            filter.brands,
            filter.sort,
          );
          console.timeEnd('GET_REQUEST_TYRE_FROM_DATA_BASE');

          let setWidthFilter:any[] | null = [];
          let setHightFilter:any[] | null = [];
          let setDiameterFilter:any[] | null = [];
          let setBrandFilter:any[] | null = [];
          let setSeasonFilter :any[] | null = [];
          
          tyreFilterGoods?.rows.map((item: any) =>
          { return (
            setWidthFilter?.push(item.width.width),
            setHightFilter?.push(item.height.height),
            setDiameterFilter?.push(item.diameter.diameter),
            setBrandFilter?.push(item.tyre_brand.brand),
            setSeasonFilter?.push(item.season.season_ua)
            )
          })
          //console.log('WIDTH', setWidthFilter);
          if (filter.width) {
            goodsTyre?.setWidth(
              Array.from(new Set(
                [...goodsTyre._width, ...setWidthFilter])).sort(
                (a: any, b: any) => a.localeCompare(b))
            );
            filter.setWidthSearch(goodsTyre._width);
          } else {
            goodsTyre?.setWidth(
              Array.from(new Set(setWidthFilter)).sort(
              (a: any, b: any) => a.localeCompare(b))
            );
            filter.setWidthSearch(goodsTyre._width);
          }
          if (filter.height) {
            goodsTyre?.setHeight(
              Array.from(new Set(
                [...goodsTyre._height, ...setHightFilter]
              )).sort(
                (a: any, b: any) => a.localeCompare(b))
            );
            filter.setHeightSearch(goodsTyre._height);
          } else {
            goodsTyre?.setHeight(
              Array.from(new Set(setHightFilter)).sort(
                (a: any, b: any) => a.localeCompare(b))
            );
            filter.setHeightSearch(goodsTyre._height);
          }
          if (filter.diameter) {
            goodsTyre?.setDiameter(
              Array.from(new Set(
                [...goodsTyre._diameter, ...setDiameterFilter]
              )).sort(
                (a: any, b: any) => a.localeCompare(b))
            );
            filter.setDiameterSearch(goodsTyre._diameter);
          } else {
            goodsTyre?.setDiameter(
              Array.from(new Set(setDiameterFilter)).sort(
                (a: any, b: any) => a.localeCompare(b))
            );
            filter.setDiameterSearch(goodsTyre._diameter);
          }
          if (filter.brands) {
            goodsTyre?.setBrands(
              Array.from(new Set(
                [...goodsTyre._brands, ...setBrandFilter]
              )).sort(
                (a: any, b: any) => a.localeCompare(b))
            );
            filter.setBrandSearch(goodsTyre._brands);
          } else {
            goodsTyre?.setBrands(
              Array.from(new Set(setBrandFilter)).sort(
                (a, b) => a.localeCompare(b))
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
          setWidthFilter = null;
          setHightFilter = null;
          setDiameterFilter = null;
          setBrandFilter = null;
          setSeasonFilter =  null;
      }
    }
    console.time('LOAD_MAIN_TYRE_TASK');
    loadMainTyreTask();
    console.timeEnd('LOAD_MAIN_TYRE_TASK');
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
          console.time('GET_REQUEST_WHEEL_FROM_DATA_BASE');
          let wheelFilterGoods: any = await taskLoad[i](
            filter.width,
            filter.diameter,
            filter.bolt_count,
            filter.brands,
            filter.type,
            filter.sort,
          );
          console.timeEnd('GET_REQUEST_WHEEL_FROM_DATA_BASE');
          let setWidthFilter:any[] | null = [];
          let setDiameterFilter:any[] | null = [];
          let setBrandFilter:any[] | null = [];
          let setBoltCountFilter :any[] | null = [];
          let setTypeFilter :any[] | null = [];
 
          wheelFilterGoods.rows.map((item: any) => 
          { return (
            setWidthFilter?.push(item.width.width),
            setDiameterFilter?.push(item.diameter.diameter),
            setBrandFilter?.push(item.wheel_brand.brand),
            setBoltCountFilter?.push(item.bolt_count.bolt_count),
            setTypeFilter?.push(item.type.type)
            )
          })
          if (filter.width) {
            goodsWheel?.setWidth(
              Array.from(new Set(
                [...goodsWheel._width, ...setWidthFilter]
              )).sort(
                (a: any, b: any) => a.localeCompare(b))
            );
            filter.setWidthSearch(goodsWheel._width);
          } else {
            goodsWheel?.setWidth(
              Array.from(new Set(setWidthFilter)).sort(
              (a: any, b: any) => a.localeCompare(b))
            );
            filter.setWidthSearch(goodsWheel._width);
          }
          if (filter.diameter) {
            goodsWheel?.setDiameter(
              Array.from(new Set(
                [...goodsWheel._diameter, ...setDiameterFilter]
              )).sort(
                (a: any, b: any) => a.localeCompare(b))
            );
            filter.setDiameterSearch(goodsWheel._diameter);
          } else {
            goodsWheel?.setDiameter(
              Array.from(new Set(setDiameterFilter)).sort(
                (a: any, b: any) => a.localeCompare(b))
            );
            filter.setDiameterSearch(goodsWheel._diameter);
          }
          if (filter.brands) {
            goodsWheel?.setBrands(
              Array.from(new Set(
                [...goodsWheel._brands, ...setBrandFilter]
              )).sort(
                (a: any, b: any) => a.localeCompare(b))
            );
            filter.setBrandSearch(goodsWheel._brands);
          } else {
            goodsWheel?.setBrands(
              Array.from(new Set(setBrandFilter)).sort(
                (a, b) => a.localeCompare(b))
            );
            filter.setBrandSearch(goodsWheel._brands);   
          }
          if (filter.bolt_count) {
            goodsWheel?.setBoltCount(
              Array.from(new Set(
                [...goodsWheel._bolt_count, ...setBoltCountFilter]
              ))
            )
          } else {
            goodsWheel?.setBoltCount(
              Array.from(new Set(setBoltCountFilter))
            )
            filter.setBoltCount(goodsWheel._bolt_count);
          }
          if (filter.type) {
            goodsWheel?.setType(
              Array.from(new Set(
                [...goodsWheel._type, ...setTypeFilter]
              ))
            )
          } else {
            goodsWheel?.setType(
              Array.from(new Set(setTypeFilter))
            )
          }
          setWidthFilter = null;
          setDiameterFilter = null;
          setBrandFilter = null;
          setBoltCountFilter = null;
          setTypeFilter = null;
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
        if (getAllReviewStore) {
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
      //if (!isMountedLeader && (prevBtnLeader || nextBtnLeader)) {
      if (!isMountedLeader) {
        let getOrdersLeader: any = await getAllOrdersLeader();
        //console.log('GET_LEADERS: ', getOrdersLeader);
        getOrdersLeader.forEach( async(item: any) => {
          const getTyre = await getTyresById(item.id);
          const getWheel = await getWheelsById(item.id);
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
      }
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
      <Slider/>
      <TabMain
        filterMainState={filterClose}
        filterStateAction={setFilterClose}
      />
      <BrandsListMain/>
      <TabProdMain titleTab='ЛІДЕРИ ПРОДАЖУ'>
        <PromotionBox 
          prevButtonEvent={prevBtnEvent}
          nextButtonEvent={nextBtnEvent}
          prevBtn={prevBtnLeader}
          nextBtn={nextBtnLeader}
          itemsArray={leaderOrder} 
        />
      </TabProdMain>
      {/* <div onClick={e => e.stopPropagation()}>
      <TabProdMain titleTab='РЕКОМЕНДУЄМО'>
        <PromotionBox 
          prevButtonEvent={() => console.log('PREV_BTN_REC')}
          nextButtonEvent={() => console.log('NEXT_BTN_REC')}
          prevBtn={0}
          nextBtn={4}
          itemsArray={leaderOrder}/>
      </TabProdMain>
      </div>
      <div onClick={e => e.stopPropagation()}>
      <TabProdMain titleTab='НОВИНКИ'>
        <PromotionBox 
          prevButtonEvent={() => console.log('PREV_BTN_NOV')}
          nextButtonEvent={() => console.log('NEXT_BTN_NOV')}
          prevBtn={0}
          nextBtn={4}
          itemsArray={leaderOrder}/>
      </TabProdMain>
      </div> */}
      <Benefits/>
      <CategorySlide/>
      <div className='mainReviewsBox'>
        <ReviewsMain 
          props={'Відгуки про магазин'}
          marginText={-285}
          prevBtnAction={undefined}
          nextBtnAction={undefined}
          buttonPosition={undefined}
        >
        <div >
          {reviewStoreAll?.length !== 0 ? 
          reviewStoreAll?.map((item: any) =>
          <div key={item.id_review_store + '_review'}>
            <ReviewStore storeData={item}/>
          </div>
          )
          : 
          <div className='mainAfterReviews' >
            <a className='mainLinkReview'
            href='/review'>Дивитися всі відгуки про магазин</a>
          </div>
          }
        </div>
        </ReviewsMain>
      </div>
      <ButtonPrevNext 
        prevBtnLeft={20} 
        prevTop={-155} 
        nextBtnRight={-73} 
        nextTop={-155}    
        leftClickActive={prevBtnReviewStore} 
        rightClickActive={nextBtnReviewStore}
      />
      <NewsMainBox 
        isNewsPage={false}
        articlesArr={articlesAll}/>
    </div>   
  );
});

export default Main;