import React, { useContext, useEffect, useState } from 'react';
import '../css/Main.css';
import { useLocation, useParams } from 'react-router-dom';
import Slider from '../components/Slider';
import CategorySlide from '../components/CategorySlide';
import TabProdMain from '../components/tabs/TabProdMain';
import Benefits from '../components/Benefits';
import ReviewsMain from '../components/reviews/ReviewsMain';
import TabMain from '../components/tabs/TabMain';
import NewsMainBox from '../components/news/NewsMainBox';
import ReviewStore from '../components/reviews/ReviewStore';
import ReviewsGoods from '../components/reviews/ReviewsGoods';
import { Context } from '../context/Context';
import { getTyresCountAll, getTyresWithoutOffset } from '../restAPI/restGoodsApi';
import { yieldToMain } from '../restAPI/postTaskAdmin';
import { observer } from 'mobx-react-lite';
import { tyreDiameterCat, tyreSeasonCat, tyreVehicleTypeCat } from '../services/tyresCatService';
import BrandsListMain from '../components/BrandsListMain';

const Main = observer(() => {
  const {goodsTyre, filter, page, user, customer} = useContext<any | null>(Context);
  const params = useParams<any>();
  const location = useLocation();
    // const {page} = useContext<any | null>(Context);
    // const [pageNum, setPageNum] = useState(0);

  useEffect(() =>{
    let isMounted = false;
    const loadMaintask = async() => {
      const taskLoad: any[] = [
        getTyresWithoutOffset,
        getTyresCountAll,
      ];
      const tyreCatType = tyreVehicleTypeCat(params.category);
      console.log('CAT_TYPE: ', tyreCatType);
      const tyreCatSeason = tyreSeasonCat(params.category);
      console.log('CAT_SEASON: ', tyreCatSeason);
      const tyreCatDiameter = tyreDiameterCat(params.category);
      console.log('CAT_DIAM: ', tyreCatDiameter);
      let i:number = 0;
      while(taskLoad.length > i) {
      if(!isMounted && taskLoad[i] === getTyresWithoutOffset) {
        let tyreFilterGoods: any = await taskLoad[i](
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
    
        //console.log('TYRE_FILTER_GET: ', tyreFilterGoods);
    
        page.loadMore > 0 ? goodsTyre?.setTyres(
        [...goodsTyre._tyres, 
          ...tyreFilterGoods.splice(page.offset, page.limit)] 
        ) : goodsTyre?.setTyres(
          tyreFilterGoods.splice(page.offset, page.limit));
    
        goodsTyre?.setTyresFilter(tyreFilterGoods);
        goodsTyre._tyres_filter.map((item: any) => 
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
      if(!isMounted && taskLoad[i] === getTyresCountAll) {
        let tyreTotalCount: any = await taskLoad[i](
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
        );
        goodsTyre?.setTotalCount(tyreTotalCount.count);
        //console.log('SET_TYRES_TOTALCOUNT: ', tyreTotalCount.count);
      }
      const task = taskLoad.shift();
      task();
      await yieldToMain(); 
    }
  }
    loadMaintask();
    return () => {
      isMounted = true;
    };
  },[
    filter, 
    goodsTyre, 
    page.limit, 
    page.loadMore, 
    page.offset, 
    params.category
  ]);

  return (
    <div className='main'>    
      <Slider/>
      <TabMain/>
      <BrandsListMain/>
      <TabProdMain/>
      <Benefits/>
      <CategorySlide/>
      <ReviewsMain props={'Відгуки'}>
      <ReviewStore/>
        {/* <ReviewsGoods 
          reviewExtend={false}
          btnLeft={undefined}
          btnRight={undefined} 
          reviewEntity={undefined}/> */}
      </ReviewsMain>
      <NewsMainBox/>
    </div>   
  );
});

export default Main;