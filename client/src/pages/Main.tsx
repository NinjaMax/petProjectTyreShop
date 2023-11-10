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
import { getAllArticlesLimit, getAllOrdersLeader, getAllStoreReviewLimit, getTyresById, getTyresWithoutOffset, getWheelsById, getWheelsWithoutOffset } from '../restAPI/restGoodsApi';
import { yieldToMain } from '../restAPI/postTaskAdmin';
import { observer } from 'mobx-react-lite';
import BrandsListMain from '../components/BrandsListMain';
import PromotionBox from '../components/PromotionBox';

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
    
    const loadMainTyreTask = async() => {
        if(!isMounted) {
          console.time('GET_REQUEST_FROM_DATA_BASE');
          let tyreFilterGoods: any = await getTyresWithoutOffset(
            filter.width,
            filter.height,
            filter.diameter,
            filter.season,
            filter.brands,
            filter.price,
            filter.vehicle_type,
            filter.speed_index,
            filter.load_index,
            filter.studded,
            filter.run_flat,
            filter.homologation,
            filter.reinforced,
            filter.sort,
          );
          console.timeEnd('GET_REQUEST_FROM_DATA_BASE');

          let setWidthFilter:any[] = [];
          let setHightFilter:any[] = [];
          let setDiameterFilter:any[] = [];
          let setBrandFilter:any[] = [];
          let setSeasonFilter :any[] = [];
          let setVehicleTypeFilter :any[] = [];
          let setSpeedIndexFilter :any[] = [];
          let setLoadIndexFilter: any[] = [];
          let setHomologationFilter :any[] = [];
          let setReinforcedFilter :any[] = [];
          let setRunFlatFilter :any[] = [];
          let setStuddedFilter :any[] = [];
          
          tyreFilterGoods.rows.map((item: any) =>
          { return (
            setWidthFilter.push(item.width.width),
            setHightFilter.push(item.height.height),
            setDiameterFilter.push(item.diameter.diameter),
            setBrandFilter.push(item.tyre_brand.brand),
            setSeasonFilter.push(item.season.season_ua),
            setVehicleTypeFilter.push(item.vehicle_type.vehicle_type_ua),
            setSpeedIndexFilter.push(item.speed_index.speed_index_with_desc),
            setLoadIndexFilter.push(item.load_index.load_index_with_desc),
            setHomologationFilter.push(item.homologation.homologation),
            setReinforcedFilter.push(item.reinforce.reinforce),
            setRunFlatFilter.push(item.run_flat.run_flat),
            setStuddedFilter.push(item.studded.studded)
            )
          })

          if (filter.width) {
            goodsTyre?.setWidth(
              Array.from(new Set(
                [...goodsTyre._width, ...setWidthFilter]
              )).sort(
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
          if (filter.vehicle_type) {
            goodsTyre?.setVehicleType(
              Array.from(new Set(
                [...goodsTyre._vehicle_type, ...setVehicleTypeFilter]
              ))
            )
          } else {
            goodsTyre?.setVehicleType(
              Array.from(new Set(setVehicleTypeFilter))
            )
          }
          if (filter.studded) {
            goodsTyre?.setStudded(
              Array.from(new Set(
                [...goodsTyre._studded, ...setStuddedFilter]
              ))
            )
          } else {
            goodsTyre?.setStudded(
              Array.from(new Set(setStuddedFilter))
            )
          }
          if (filter.speed_index) {
            goodsTyre?.setSpeedIndex(
              Array.from(new Set(
                [...goodsTyre._speed_index, ...setSpeedIndexFilter]
              )).sort(
                (a: any, b: any) => a.localeCompare(b))
            )
          } else {
            goodsTyre?.setSpeedIndex(
              Array.from(new Set(setSpeedIndexFilter)).sort(
                (a: any, b: any) => a.localeCompare(b))
            )
          }
          if (filter.load_index) {
            goodsTyre?.setLoadIndex(
              Array.from(new Set(
                [...goodsTyre._load_index, ...setLoadIndexFilter]
              )).sort(
                (a: any, b: any) => a.localeCompare(b))
            )
          } else {
            goodsTyre?.setLoadIndex(
              Array.from(new Set(setLoadIndexFilter)).sort(
                (a: any, b: any) => a.localeCompare(b))
            )
          }
          if (filter.homologation) {
            goodsTyre?.setHomologation(
              Array.from(new Set(
                [...goodsTyre._homologation, ...setHomologationFilter]
              ))
            )
          } else {
            goodsTyre?.setHomologation(
              Array.from(new Set(setHomologationFilter))
            )
          }
          if (filter.run_flat) {
            goodsTyre?.setRunFlat(
              Array.from(new Set(
                [...goodsTyre._run_flat, ...setRunFlatFilter]
              ))
            )
          } else {
            goodsTyre?.setRunFlat(
              Array.from(new Set(setRunFlatFilter))
            )
          }
          if (filter.reinforced) {
            goodsTyre?.setReinforced(
              Array.from(new Set(
                [...goodsTyre._reinforced, ...setReinforcedFilter]
              ))
            )
          } else {
            goodsTyre?.setReinforced(
              Array.from(new Set(setReinforcedFilter))
            )
          }
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
    filter.price, 
    filter.vehicle_type, 
    filter.speed_index, 
    filter.load_index, 
    filter.studded, 
    filter.run_flat, 
    filter.homologation, 
    filter.reinforced, 
    filter.sort,
  ]);

  useEffect(() =>{
    let isMounted = false;
    const loadMainWheelTask = async() => {
      const taskLoad: any[] = [
        getWheelsWithoutOffset,
      ];
      let i:number = 0;
      while(taskLoad.length > i) {
        if(!isMounted && taskLoad[i] === getWheelsWithoutOffset) {
          let wheelFilterGoods: any = await taskLoad[i](
            filter.width,
            filter.diameter,
            filter.bolt_count,
            filter.bolt_count_pcd,
            filter.brands,
            filter.price,
            filter.type,
            filter.color,
            filter.dia,
            filter.et,
            filter.pcd,
            filter.pcd2,
            filter.sort,
          );
          let setWidthFilter:any[] = [];
          let setDiameterFilter:any[] = [];
          let setBrandFilter:any[] = [];
          let setBoltCountFilter :any[] = [];
          let setBoltCountPcdFilter :any[] = [];
          let setColorFilter :any[] = [];
          let setDiaFilter: any[] = [];
          let setEtFilter :any[] = [];
          let setPcdFilter :any[] = [];
          let setPcd2Filter :any[] = [];
          let setTypeFilter :any[] = [];

          wheelFilterGoods.rows.map((item: any) => 
          { return (
            setWidthFilter.push(item.width.width),
            setDiameterFilter.push(item.diameter.diameter),
            setBrandFilter.push(item.wheel_brand.brand),
            setBoltCountFilter.push(item.bolt_count.bolt_count),
            setBoltCountPcdFilter.push(item.bolt_count_pcd.bolt_count_pcd),
            setColorFilter.push(item.color.color),
            setDiaFilter.push(item.dia.dia),
            setEtFilter.push(item.et.et),
            setPcdFilter.push(item.pcd.pcd),
            setPcd2Filter.push(item.pcd2.pcd2),
            setTypeFilter.push(item.type.type)
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
          }
          if (filter.bolt_count_pcd) {
            goodsWheel?.setBoltCountPcd(
              Array.from(new Set(
                [...goodsWheel._bolt_count_pcd, ...setBoltCountPcdFilter]
              ))
            )
          } else {
            goodsWheel?.setBoltCountPcd(
              Array.from(new Set(setBoltCountPcdFilter))
            )
          }
          if (filter.color) {
            goodsWheel?.setColor(
              Array.from(new Set(
                [...goodsWheel._color, ...setColorFilter]
              ))
            )
          } else {
            goodsWheel?.setColor(
              Array.from(new Set(setColorFilter))
            )
          }
          if (filter.dia) {
            goodsWheel?.setDia(
              Array.from(new Set(
                [...goodsWheel._dia, ...setDiaFilter]
              )).sort(
                (a: any, b: any) => a.localeCompare(b))
            )
          } else {
            goodsWheel?.setDia(
              Array.from(new Set(setDiaFilter)).sort(
                (a: any, b: any) => a.localeCompare(b))
            )
          }
          if (filter.et) {
            goodsWheel?.setEt(
              Array.from(new Set(
                [...goodsWheel._et, ...setEtFilter]
              )).sort(
                (a: any, b: any) => a.localeCompare(b))
            )
          } else {
            goodsWheel?.setEt(
              Array.from(new Set(setEtFilter)).sort(
                (a: any, b: any) => a.localeCompare(b))
            )
          }
          if (filter.pcd) {
            goodsWheel?.setPcd(
              Array.from(new Set(
                [...goodsWheel._pcd, ...setPcdFilter]
              ))
            )
          } else {
            goodsWheel?.setPcd(
              Array.from(new Set(setPcdFilter))
            )
          }
          if (filter.pcd2) {
            goodsWheel?.setPcd2(
              Array.from(new Set(
                [...goodsWheel._pcd2, ...setPcd2Filter]
              ))
            )
          } else {
            goodsWheel?.setPcd2(
              Array.from(new Set(setPcd2Filter))
            )
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
    filter.height, 
    filter.diameter,  
    filter.brands, 
    filter.price, 
    filter.sort, 
    filter.bolt_count,
    filter.bolt_count_pcd,
    filter.brands,
    filter.price,
    filter.type,
    filter.color,
    filter.dia,
    filter.et,
    filter.pcd,
    filter.pcd2,
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
        prevBtnAction={prevBtnReviewStore}
        nextBtnAction={nextBtnReviewStore}
        buttonPosition={{
          prevBtnLeft: -5, 
          prevTop: -75, 
          nextBtnRight: -93,  
          nextTop: -75, 
        }}
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
      <NewsMainBox 
        isNewsPage={false}
        articlesArr={articlesAll}/>
    </div>   
  );
});

export default Main;