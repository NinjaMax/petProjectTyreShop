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
  const {goodsTyre, user, customer} = useContext<any | null>(Context);
  const {page} = useContext<any | null>(Context);
  const [paramUrl, setParamUrl] = useState(0);
  const params = useParams<any>();
  const location = useLocation();

  const cyrillicToTranslit = new (CyrillicToTranslit as any)();
  const paramsCat = cyrillicToTranslit.transform(params.category,''
            ).toLowerCase();

  const width=undefined;
  const height=undefined;
  const brand=undefined;
  const price=undefined;
  const speed_index=undefined;
  const load_index=undefined;
  const studded=undefined;
  const run_flat=undefined;
  const homologation=undefined;

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
            width,
            height,
            tyreCatDiameter,
            tyreCatSeason,
            brand,
            price,
            tyreCatType,
            speed_index,
            load_index,
            studded,
            run_flat,
            homologation,
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
  page.offset
]);

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
          <FilterCatalogTyres/>
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