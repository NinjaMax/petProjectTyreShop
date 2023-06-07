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
import { getTyresCountAll, getTyresOffset, getTyresSeason } from '../restAPI/restGoodsApi';
import { Context } from '../context/Context';
import { observer } from 'mobx-react-lite';

const CatalogTyresPage = observer(({crumbsItem}: any) => {
  const {goodsTyre, user, customer} = useContext<any | null>(Context);
  const {page} = useContext<any | null>(Context);
  const [paramUrl, setParamUrl] = useState(0);
  const params = useParams<any>();
  const location = useLocation();

  const cyrillicToTranslit = new (CyrillicToTranslit as any)();

  useEffect(() =>{
    let isMounted = false;
    const loadMaintask = async() => {
        const taskLoad: any[] = [
            getTyresOffset,
            getTyresCountAll,
            getTyresSeason,
        ];
    let i:number = 0;
    while(taskLoad.length > i) {
        if(!isMounted && taskLoad[i] === getTyresOffset) {
          let tyreGoods: any = await taskLoad[i](
            page.offset, page.limit
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
        if(!isMounted && taskLoad[i] === getTyresSeason) {
          let tyreSeason: any = await taskLoad[i](
            cyrillicToTranslit.transform(params.category,''
            ).toLowerCase()
          );
          if (tyreSeason) {
            goodsTyre?.setTotalCount(tyreSeason);
            console.log('SET_TYRES_BY_SEASON: ', tyreSeason);
          }
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
  goodsTyre, 
  params.category, 
  page.limit, 
  page.loadMore, 
  page.offset
]);

  
  
  // const crumbs ={ 
  //   crumbs: '/season', 
  //   title: 'Season'
  // }

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