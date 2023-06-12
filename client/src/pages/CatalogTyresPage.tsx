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
            filter.brand,
            filter.price,
            tyreCatType,
            filter.speed_index,
            filter.load_index,
            filter.studded,
            filter.run_flat,
            filter.homologation,
          );
          page.loadMore > 0 ?
          goodsTyre?.setTyres(
            [...goodsTyre._tyres, ...tyreGoods]
          ) :
          goodsTyre?.setTyres(tyreGoods);
          console.log('SET_TYRES_PAGE_1: ', tyreGoods);
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
  filter.brand, 
  filter.price, 
  filter.speed_index, 
  filter.load_index, 
  filter.studded, 
  filter.run_flat, 
  filter.homologation]);

const handleFilterTyreChange = (e: any) => {
  console.log(e.currentTarget.value);
}  
  console.log('PARAMS: ', params.category);
  console.log('LOCATION: ', location.pathname);

    return (
      <div className='catalogTyres'>
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
          <FilterCatalogTyres handleChange={handleFilterTyreChange}/>
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