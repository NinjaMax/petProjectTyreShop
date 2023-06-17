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
import { getTyresCountAll, getTyresOffset, getTyresWithoutOffset} from '../restAPI/restGoodsApi';
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
        getTyresWithoutOffset,
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
        if(!isMounted && taskLoad[i] === getTyresWithoutOffset) {
          let tyreFilterGoods: any = await taskLoad[i](
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
              ))
            )
          } else {
            goodsTyre?.setWidth(
              Array.from(new Set(setWidthFilter))
            )
          }
          if (filter.height) {
            goodsTyre?.setHeight(
              Array.from(new Set(
                [...goodsTyre._height, ...setHightFilter]
              ))
            )
          } else {
            goodsTyre?.setHeight(
              Array.from(new Set(setHightFilter))
            )
          }
          if (filter.diameter) {
            goodsTyre?.setDiameter(
              Array.from(new Set(
                [...goodsTyre._diameter, ...setDiameterFilter]
              ))
            )
          } else {
            goodsTyre?.setDiameter(
              Array.from(new Set(setDiameterFilter))
            )
          }
          if (filter.brands) {
            goodsTyre?.setBrands(
              Array.from(new Set(
                [...goodsTyre._brands, ...setBrandFilter]
              ))
            )
          } else {
            goodsTyre?.setBrands(
              Array.from(new Set(setBrandFilter))
            )
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
              ))
            )
          } else {
            goodsTyre?.setSpeedIndex(
              Array.from(new Set(setSpeedIndexFilter))
            )
          }
          if (filter.load_index) {
            goodsTyre?.setLoadIndex(
              Array.from(new Set(
                [...goodsTyre._load_index, ...setLoadIndexFilter]
              ))
            )
          } else {
            goodsTyre?.setLoadIndex(
              Array.from(new Set(setLoadIndexFilter))
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
          let tyreTotalCount: any = await taskLoad[i]();
          goodsTyre?.setTotalCount(tyreTotalCount.count);
          console.log('SET_TYRES_TOTALCOUNT: ', tyreTotalCount.count);
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
  console.log('TYRES_FILTER: ', goodsTyre._tyres_filter);
  console.log('TYRES_FILTER_WIDTH: ', goodsTyre._width);
  console.log('TYRES_FILTER_HEIGHT: ', goodsTyre._height);
  console.log('TYRES_FILTER_DIAMETER: ', goodsTyre._diameter);
  console.log('TYRES_FILTER_BRANDS: ', goodsTyre._brands);
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