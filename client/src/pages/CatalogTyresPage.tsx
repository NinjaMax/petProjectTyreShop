import React, { useContext, useEffect, useState } from 'react';
import '../css/CatalogTyresPage.css';
import CatalogTyres from '../components/catalogs/CatalogTyres';
import FilterCatalogTyres from '../components/filterCatalog/FilterCatalogTyres';
import ReviewsMain from '../components/reviews/ReviewsMain';
import ReviewsGoods from '../components/reviews/ReviewsGoods';
import BreadCrumbs from '../components/BreadCrumbs';
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import { useLocation, useParams } from 'react-router-dom';
import { yieldToMain } from '../restAPI/postTaskAdmin';
import { getTyresCountAll, getTyresOffset} from '../restAPI/restGoodsApi';
import { Context } from '../context/Context';
import { observer } from 'mobx-react-lite';
import { tyreDiameterCat, tyreSeasonCat, tyreVehicleTypeCat } from '../services/tyresCatService';

const CatalogTyresPage = observer(({crumbsItem}: any) => {
  const {goodsTyre, filter} = useContext<any | null>(Context);
  const {page} = useContext<any | null>(Context);
  const [paramUrl, setParamUrl] = useState(0);
  const [stateClick, setStateClick]=useState(false);
  const params = useParams<any>();
  const location = useLocation();
    
  const cyrillicToTranslit = new (CyrillicToTranslit as any)();
  const paramsCat = cyrillicToTranslit.transform(params.category,''
            ).toLowerCase();

  useEffect(() =>{
    let isMounted = false;
    const loadMaintask = async() => {
      const taskLoad: any[] = [
        getTyresOffset,
        getTyresCountAll,
        // getTyresSeason,
        // getTyresType,
        // getTyresDiameter,
      ];
      const tyreCatType = tyreVehicleTypeCat(params.category);
      console.log('CAT_TYPE: ', tyreCatType);
      const tyreCatSeason = tyreSeasonCat(params.category);
      console.log('CAT_SEASON: ', tyreCatSeason);
      const tyreCatDiameter = tyreDiameterCat(params.category);
      console.log('CAT_DIAM: ', tyreCatDiameter);
      let i:number = 0;
      while(taskLoad.length > i) {
        if(!isMounted && taskLoad[i] === getTyresOffset) {
          let tyreGoods: any = await taskLoad[i](
            page.offset, 
            page.limit, 
            filter.width,
            filter.height,
            tyreCatDiameter ?? filter.diameter,
            tyreCatSeason ?? filter.season,
            filter.brands,
            filter.price,
            tyreCatType ?? filter.vehicle_type,
            filter.speed_index,
            filter.load_index,
            filter.studded,
            filter.run_flat,
            filter.homologation,
            filter.reinforced
          );
          
          page.loadMore > 0 ? goodsTyre?.setTyres(
            [...goodsTyre._tyres, ...tyreGoods] 
          ) : goodsTyre?.setTyres(tyreGoods);
          console.log('SET_TYRES: ', Array.from(new Set([...goodsTyre._tyres, ...tyreGoods])));
        }
        if(!isMounted && taskLoad[i] === getTyresCountAll) {
          let tyreTotalCount: any = await taskLoad[i]();
          goodsTyre?.setTotalCount(tyreTotalCount.count);
          console.log('SET_TYRES_TOTALCOUNT: ', tyreTotalCount.count);
        } 
        // if(!isMounted && taskLoad[i] === getTyresSeason && tyreCatSeason) {
        //   let tyreSeason: any = await taskLoad[i](tyreCatSeason);
        //   goodsTyre?.setTyres(tyreSeason);
        //   console.log('SET_TYRES_BY_SEASON: ', tyreSeason);
        // }
        // if(!isMounted && taskLoad[i] === getTyresType && tyreCatType) {
        //   let tyreType: any = await taskLoad[i](tyreCatType);
        //   goodsTyre?.setTyres(tyreType);
        //   console.log('SET_TYRES_BY_TYPE: ', tyreType);
        // }
        // if(!isMounted && taskLoad[i] === getTyresDiameter && tyreCatDiameter) {
        //   let tyreDiameter: any = await taskLoad[i](tyreCatDiameter);
        //   goodsTyre?.setTyres(tyreDiameter);
        //   console.log('SET_TYRES_BY_DIAMETER: ', tyreDiameter);
        // }
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
    goodsTyre, 
    params.category, 
    page.limit, 
    page.loadMore, 
    page.offset, 
    filter.width, 
    filter.height, 
    filter.diameter, 
    filter.season, 
    filter.vehicle_type,
    filter.brands, 
    filter.price, 
    filter.speed_index, 
    filter.load_index, 
    filter.studded, 
    filter.run_flat, 
    filter.homologation,  
    filter.reinforced
  ]);

  const handleFilterTyreChange = (e: any) => {
    console.log(e.currentTarget.value);
  }  

  const filterClick = () => {
    setStateClick(!stateClick);
    // console.log(e.target);
  }
  console.log('PARAMS: ', params.category);
  console.log('LOCATION: ', location.pathname);
  console.log('CATALOG_CLOSE_FILTER: ', stateClick);
  console.log('FILTER_WIDTH: ', filter.width);
  console.log('FILTER_HEIGHT: ', filter.height);
  console.log('FILTER_DIAMETER: ', filter.diameter,);
  console.log('GET_TYRES:', goodsTyre._tyres);

    return (
      <div className='catalogTyres'
        onClick={() => setStateClick(!stateClick)}
      >
        <div className='a'>
        {location.pathname.includes('tyres') ?
          <BreadCrumbs 
            route={['/','/tyres', `${params ?? null}`]} 
            hrefTitle={
              ['Головна','Шини',
            `${(params.category) ?? null}`]}
          />
        : null  
        }
        </div>
        <div className='b'>
        {location.pathname.includes('tyres') ?
          <FilterCatalogTyres
            filterState={stateClick} 
            setFilterAction={filterClick} 
          />
          : null
        }
        </div>
        <div className='c'>
          {location.pathname.includes('tyres') ?
            <CatalogTyres/>
            : null
          }

        </div>
        <div className='d'>
          <ReviewsMain props={'Відгуки клієнтів'}>
            <ReviewsGoods reviewExtend={true} btnLeft={undefined} btnRight={undefined}/>
          </ReviewsMain>
        </div>
        <div className='e'>
          
        </div>  
      </div>
    );
});

export default CatalogTyresPage;