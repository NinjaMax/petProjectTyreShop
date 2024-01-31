import React, { useContext, useEffect, useState } from 'react';
import '../css/CatalogTyresPage.css';
import { observer } from 'mobx-react-lite';
import CatalogTyres from '../components/catalogs/CatalogTyres';
import FilterCatalogTyres from '../components/filterCatalog/FilterCatalogTyres';
import ReviewsMain from '../components/reviews/ReviewsMain';
import ReviewsGoods from '../components/reviews/ReviewsGoods';
import BreadCrumbs from '../components/BreadCrumbs';
//import CyrillicToTranslit from 'cyrillic-to-translit-js';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { yieldToMain } from '../restAPI/postTaskAdmin';
import { getTyresOffsetMain, getTyresReviewLimit, getTyresWithCatOffset, getTyresWithoutOffset, getTyresWithoutOffsetProps, getWheelsReviewLimit, getWheelsWithCatOffset, getWheelsWithoutOffset} from '../restAPI/restGoodsApi';
import { Context } from '../context/Context';
import { tyreSeasonCat, tyreVehicleTypeCat } from '../services/tyresCatService';
import CatalogWheels from '../components/catalogs/CatalogWheels';
import FilterCatalogWheels from '../components/filterCatalog/FilterCatalogWheels';
import { CATALOG_TYRES_ROUTE, CATALOG_WHEELS_ROUTE } from '../utils/consts';
import { createStringUrl } from '../services/stringUrl';
import { typeWheelsCat } from '../services/wheelsProps.service';
import { useTranslation } from 'react-i18next';

const CatalogTyresPage = observer(() => {
  const {goodsTyre, goodsWheel, filter} = useContext<any | null>(Context);
  const {page} = useContext<any | null>(Context);
  const [reviewGoodsData, setReviewGoodsData] = useState<any[] | null>();
  const [prevBtnReview, setPrevBtnReview] = useState<number>(0);
  const [nextBtnReview, setNextBtnReview] = useState<number>(0);
  const [langState, setLangState] = useState<string>('ua');
  const params = useParams<any>();
  const location = useLocation();
  const history = useHistory();
  const [stateFilter, setStateFilter]=useState<boolean>(false);
  const { t, i18n } = useTranslation();
  
  useEffect(() => {
    if (i18n.resolvedLanguage === 'uk') {
      setLangState('uk');
    }
    if (i18n.resolvedLanguage === 'ru') {
      setLangState('ru');
    } 
  },[i18n.resolvedLanguage]);

  useEffect(() => {
    let isMountedReview = false;
    const getTyresPathUrl = async () => {
      if(!isMountedReview && location.pathname.includes('tyres')) {
        if (localStorage.getItem('filterTyreUrl')) {
          const getMainFilterItem = localStorage.getItem('filterTyreUrl')?.split('/');
          if (getMainFilterItem![0]) {
            filter.setSeason(getMainFilterItem![0]);
            if (getMainFilterItem![0]?.includes(',')) {
              filter.setChipSeason(
                Array.from(new Set([...getMainFilterItem![0]?.split(',')]))
              ); 
            } else {
              filter.setChipSeason(
                Array.from(new Set([...filter.chipSeason, getMainFilterItem![0]]))
              ); 
            }
          }
          if (getMainFilterItem![1]) {
            filter.setBrands(getMainFilterItem![1]);
            if (getMainFilterItem![1]?.includes(',')) {
              filter.setChipBrands(
                Array.from(new Set([...getMainFilterItem![1]?.split(',')]))
              );
            } else {
              filter.setChipBrands(
                Array.from(new Set([...filter.chipBrands, getMainFilterItem![1]]))
              );
            }
          }
          if (getMainFilterItem![2]) {
            filter.setWidth(getMainFilterItem![2]);
            filter.setChipWidth(
              Array.from(new Set([...filter.chipWidth, getMainFilterItem![2]]))
            );
          }
          if (getMainFilterItem![3]) {
            filter.setHeight(getMainFilterItem![3]);
            filter.setChipHeight(
              Array.from(new Set([...filter.chipHeight, getMainFilterItem![3]]))
            );
          }
          if (getMainFilterItem![4]) {
            filter.setDiameter(getMainFilterItem![4]);
            filter.setChipDiameter(
              Array.from(new Set([...filter.chipDiameter, getMainFilterItem![4]]))
            );
          }
          localStorage.removeItem('filterTyreUrl');
          const tyrePathFromMainPage: string | undefined = 
          `${CATALOG_TYRES_ROUTE}${filter.season && !filter.season.includes(',') ? `/${createStringUrl(getMainFilterItem![0])}` : '' }${filter.brands && !filter.brands.includes(',') ? `/${createStringUrl(getMainFilterItem![1])}` : ''}${filter.width ? `/w${createStringUrl(getMainFilterItem![2])}` : ''}${filter.height ? `/h${createStringUrl(getMainFilterItem![3])}` : ''}${filter.diameter ? `/r${createStringUrl(getMainFilterItem![4])}` : ''}`;
          history.push(
            tyrePathFromMainPage, 
          );
        }
      }
    };
    getTyresPathUrl();
    return () => {
      isMountedReview = true;
    };
  },[filter, history, location.pathname]);

  useEffect(() => {
    let isMountedReview = false;
    const getWheelsPathUrl = async () => {
      if(!isMountedReview && location.pathname.includes('wheels')) {
        if (localStorage.getItem('filterWheelUrl')) {
          const getMainFilterItemW = localStorage.getItem('filterWheelUrl')?.split('/');
          if (getMainFilterItemW![0]) {
            filter.setType(getMainFilterItemW![0]);
            if (getMainFilterItemW![0]?.includes(',')) {
              filter.setChipType(
                Array.from(new Set([...getMainFilterItemW![0]?.split(',')]))
              ); 
            } else {
              filter.setChipType(
                Array.from(new Set([...filter.chipSeason, getMainFilterItemW![0]]))
              ); 
            }
          }
          if (getMainFilterItemW![1]) {
            filter.setBrands(getMainFilterItemW![1]);
            if (getMainFilterItemW![1]?.includes(',')) {
              filter.setChipBrands(
                Array.from(new Set([...getMainFilterItemW![1]?.split(',')]))
              );
            } else {
              filter.setChipBrands(
                Array.from(new Set([...filter.chipBrands, getMainFilterItemW![1]]))
              );
            }
          }
          if (getMainFilterItemW![2]) {
            filter.setWidth(getMainFilterItemW![2]);
            filter.setChipWidth(
              Array.from(new Set([...filter.chipWidth, getMainFilterItemW![2]]))
            );
          }
          if (getMainFilterItemW![3]) {
            filter.setBoltCount(getMainFilterItemW![3]);
            if (getMainFilterItemW![3]?.includes(',')) {
              filter.setChipBoltCount(
                Array.from(new Set([...getMainFilterItemW![3]?.split(',')]))
              );
            } else {
              filter.setChipBoltCount(
                Array.from(new Set([...filter.chipBoltCount, getMainFilterItemW![3]]))
              );
            }
          }
          if (getMainFilterItemW![4]) {
            filter.setDiameter(getMainFilterItemW![4]);
            filter.setChipDiameter(
              Array.from(new Set([...filter.chipDiameter, getMainFilterItemW![4]]))
            );
          }
          localStorage.removeItem('filterWheelUrl');
        
          const wheelCatalogPath: string | undefined = 
          `${CATALOG_WHEELS_ROUTE}${filter.type && !filter.type.includes(',') ? `/${createStringUrl(getMainFilterItemW![0])}` : '' }${filter.brands && !filter.brands.includes(',') ? `/${createStringUrl(getMainFilterItemW![1])}` : ''}${filter.width ? `/w${createStringUrl(getMainFilterItemW![2])}` : ''}${filter.diameter ? `/r${createStringUrl(getMainFilterItemW![4])}` : ''}${filter.bolt_count && !filter.bolt_count.includes(',') ? `/${createStringUrl(getMainFilterItemW![3])}` : '' }`;
          history.push(
            wheelCatalogPath, 
          );
        }
      }
    };
    getWheelsPathUrl();
    return () => {
      isMountedReview = true;
    };
  },[filter, history, location.pathname]);

  useEffect(() =>{
    let isMounted = false;
    const loadCatalogTyre = async() => {
      if (!isMounted && location.pathname.includes('tyres')) {
        console.time('GET_REQUEST_TYRE_CATALOG');
        let tyreFilterGoodsId: any = await getTyresWithCatOffset(
            page.limit,
            page.offset,
            filter.width ?? '',
            filter.height ?? '',
            filter.diameter ?? '',
            filter.season ?? '',
            filter.brands ?? '',
            filter.price ?? '',
            filter.vehicle_type ?? '',
            filter.speed_index ?? '',
            filter.load_index ?? '',
            filter.studded ?? '',
            filter.run_flat ?? '',
            filter.homologation ?? '',
            filter.reinforced ?? '',
            filter.sort,
          );
        console.log('CAT_TYRE: ', tyreFilterGoodsId)
        goodsTyre?.setTotalCount(tyreFilterGoodsId.count);
        console.timeEnd('GET_REQUEST_TYRE_CATALOG');
        page.loadMore > 0  ? goodsTyre?.setTyres(
          [...goodsTyre._tyres, 
            ...tyreFilterGoodsId.rows] 
          ) : goodsTyre?.setTyres(
            tyreFilterGoodsId.rows);
      }
    }
    loadCatalogTyre();
    return () => {
        isMounted = true;
    };
  },
  [ 
    filter, 
    params,
    filter.brands, 
    filter.diameter, 
    filter.height, 
    filter.homologation, 
    filter.load_index, 
    filter.price, 
    filter.reinforced, 
    filter.run_flat, 
    filter.season, 
    filter.sort, 
    filter.speed_index, 
    filter.studded, 
    filter.vehicle_type, 
    filter.width, 
    goodsTyre, 
    location.pathname, 
    page.limit, 
    page.loadMore, 
    page.offset
  ]);

  useEffect(() =>{
    let isMounted = false;
    const loadMainFilterTyreTask = async () => {
      if(!isMounted && location.pathname.includes('tyres')) {
        console.time('GET_REQUEST_TYRE_FROM_DATA_BASE');
        let tyreFilterGoods: any = await getTyresOffsetMain(
            filter.width,
            filter.height,
            filter.diameter,
            filter.season,
            filter.brands,
            'ASC',
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
            //setSeasonFilter?.push(item.season.season_ua)
            setSeasonFilter?.push(langState === 'uk' ? item.season.season_ua : item.season.season)
            //setSeasonFilter?.push(i18n.resolvedLanguage === 'uk' ? item.season.season_ua : item.season.season)
            )
          })
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
      for (let key in params) {
        if (params[key] && !filter.season && filter.chipSeason.length === 0 ) {
          const tyreCatSeason = tyreSeasonCat(params[key]);
          if (tyreCatSeason) {
            filter.setSeason(tyreCatSeason);
            filter.setChipSeason(
              Array.from(new Set([...filter.chipSeason, tyreCatSeason]))
            ); 
          }
        }
        if (params[key] && !filter.studded && filter.chipStudded.length === 0 ) {
          const tyreStudded = goodsTyre._studded?.find(
            (studded:string) => 
            createStringUrl(studded.toLocaleLowerCase()) === params[key]);
          if (tyreStudded) {
            filter.setStudded(tyreStudded);
            filter.setChipStudded(
              Array.from(new Set([...filter.chipStudded, tyreStudded]))
            ); 
          }
        }
        if (params[key] && !filter.vehicle_type && filter.chipVehicleType.length === 0) {
          const tyreCatType = tyreVehicleTypeCat(params[key]);
          if (tyreCatType) {
            filter.setVehicleType(tyreCatType);
            filter.setChipVehicleType(
              Array.from(new Set([...filter.chipVehicleType, tyreCatType]))
            );
          }
        }
        if (params[key] && !filter.brands && filter.chipBrands.length === 0) {
          const findBrandInSeason:string = goodsTyre._brands?.find(
            (brands:string) => 
            createStringUrl(brands.toLocaleLowerCase()) === params[key]);
          if (findBrandInSeason) {
            filter.setBrands(findBrandInSeason);
            filter.setChipBrands(
              Array.from(new Set([...filter.chipBrands, findBrandInSeason]))
            );
          }
        }
        if (params[key]?.includes('w') && !filter.width && filter.chipWidth.length === 0 ) {
          const findWidth = goodsTyre._width?.find((width:string) => width === params[key]?.slice(1, params[key]?.length));
          if (findWidth) {
            filter.setWidth(findWidth);
            filter.setChipWidth(
              Array.from(new Set([...filter.chipWidth, findWidth]))
            );
          }
        }
        if (params[key]?.includes('h') && !filter.height && filter.chipHeight.length === 0) {
          const findHeight = goodsTyre._height?.find((height:string) => height === params[key]?.slice(1, params[key]?.length));
          if (findHeight) {
            filter.setHeight(findHeight);
            filter.setChipHeight(
              Array.from(
                new Set([...filter.chipHeight, findHeight]))
            );
          }
        }
        if (params[key]?.includes('r') && !filter.diameter && filter.chipDiameter.length === 0) {
          const findDiameter = goodsTyre._diameter?.find(
            (diameter:string) => 
            diameter === params[key]?.slice(1, params[key]?.length));
          if (findDiameter) {
            filter.setDiameter(findDiameter);
            filter.setChipDiameter(
              Array.from(
                new Set([...filter.chipDiameter, findDiameter]))
            );
          }
        }
        if (params[key]?.includes('li-') && !filter.load_index && filter.chipLoadIndex.length === 0) {
          const findLoadIndex = goodsTyre._load_index?.find(
            (load_index_with_desc:string) => 
            createStringUrl(load_index_with_desc.toLocaleLowerCase()) === params[key]?.slice(3, params[key]?.length));
          if (findLoadIndex) {
            filter.setLoadIndex(findLoadIndex);
            filter.setChipLoadIndex(
              Array.from(new Set([...filter.chipLoadIndex, findLoadIndex]))
            );
          }
        }
        if (params[key]?.includes('si-') && !filter.speed_index && filter.chipSpeedIndex.length === 0) {
          const findSpeedIndex = goodsTyre._speed_index?.find(
            (speed_index_with_desc:string) => 
            createStringUrl(speed_index_with_desc.toLocaleLowerCase()) === params[key]?.slice(3, params[key]?.length));
          if (findSpeedIndex) {
            filter.setSpeedIndex(findSpeedIndex);
            filter.setChipSpeedIndex(
              Array.from(new Set([...filter.chipSpeedIndex, findSpeedIndex]))
            );
          }
        }
        if (params[key]?.includes('xl-') && !filter.reinforced && filter.chipReinforced.length === 0) {
          const findReinforcedSeason = goodsTyre._reinforced?.find(
            (reinforced:string) => 
            createStringUrl(reinforced.toLocaleLowerCase()) === params[key]?.slice(3, params[key]?.length));
          if (findReinforcedSeason) {
            filter.setReinforced(findReinforcedSeason);
            filter.setChipReinforced(
              Array.from(new Set([...filter.chipReinforced, findReinforcedSeason]))
            );
          }
        }
        if (params[key]?.includes('om-') && !filter.homologation && filter.chipHomologation.length === 0) {
          const findOmSeason = goodsTyre._homologation?.find(
            (homologation:string) => 
            createStringUrl(homologation.toLocaleLowerCase()) === params[key]?.slice(3, params[key]?.length));
          if (findOmSeason) {
            filter.setHomologation(findOmSeason);
            filter.setChipHomologation(
              Array.from(new Set([...filter.chipHomologation, findOmSeason]))
            );
          }
        }
      }
    }
    loadMainFilterTyreTask();
    return () => {
        isMounted = true;
    };
  },
  [
    filter, 
    params, 
    goodsTyre, 
    filter.width, 
    filter.height, 
    filter.diameter, 
    filter.season, 
    filter.brands, 
    location.pathname, 
    langState
    //i18n.resolvedLanguage
  ]);

  useEffect(() =>{
    let isMounted = false;
    const loadPropsTyreTask = async() => {
      if(!isMounted && location.pathname.includes('tyres')) {
        console.time('GET_REQUEST_TYRE_PROPS')
        let tyreFilterGoods: any = await getTyresWithoutOffset(
          filter.price ?? '',
          filter.vehicle_type ?? '',
          filter.speed_index ?? '',
          filter.load_index ?? '',
          'ASC',
        );
        console.timeEnd('GET_REQUEST_TYRE_PROPS')
        let setVehicleTypeFilter: any[] | null  = [];
        let setSpeedIndexFilter: any[] | null  = [];
        let setLoadIndexFilter: any[] | null  = [];
        
        tyreFilterGoods.rows.map((item: any) => 
        { return (
            setVehicleTypeFilter?.push(langState === 'uk' ? item.vehicle_type.vehicle_type_ua : item.vehicle_type.vehicle_type),  
            //setVehicleTypeFilter?.push(item.vehicle_type.vehicle_type_ua),
            //setVehicleTypeFilter?.push(i18n.resolvedLanguage === 'uk' ? item.vehicle_type.vehicle_type_ua : item.vehicle_type.vehicle_type),
            setSpeedIndexFilter?.push(item.speed_index.speed_index_with_desc),
            setLoadIndexFilter?.push(item.load_index.load_index_with_desc)
          )
        });
        if (filter.vehicle_type) {
          goodsTyre?.setVehicleType(
            Array.from(new Set(
              [...goodsTyre._vehicle_type, ...setVehicleTypeFilter]
            ))
          )
        } else {
          // goodsTyre?.setVehicleType(
          //   Array.from(new Set([...setVehicleTypeFilter, 'вантажні шини']))
          // )
            goodsTyre?.setVehicleType(
            Array.from(new Set([...setVehicleTypeFilter, langState === 'uk' ? 'вантажні шини' : 'грузовые шины']))
          )
          // goodsTyre?.setVehicleType(
          //   Array.from(new Set([...setVehicleTypeFilter, i18n.resolvedLanguage === 'uk' ? 'вантажні шини' : 'грузовые шины']))
          // )
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
        setVehicleTypeFilter = null;
        setSpeedIndexFilter = null;
        setLoadIndexFilter = null;
      }
      for (let key in params) {
        if (params[key] && !filter.season && filter.chipSeason.length === 0 ) {
          const tyreCatSeason = tyreSeasonCat(params[key]);
          if (tyreCatSeason) {
            filter.setSeason(tyreCatSeason);
            filter.setChipSeason(
              Array.from(new Set([...filter.chipSeason, tyreCatSeason]))
            ); 
          }
        }
        if (params[key] && !filter.studded && filter.chipStudded.length === 0 ) {
          const tyreStudded = goodsTyre._studded?.find(
            (studded:string) => 
            createStringUrl(studded.toLocaleLowerCase()) === params[key]);
          if (tyreStudded) {
            filter.setStudded(tyreStudded);
            filter.setChipStudded(
              Array.from(new Set([...filter.chipStudded, tyreStudded]))
            ); 
          }
        }
        if (params[key] && !filter.vehicle_type && filter.chipVehicleType.length === 0) {
          const tyreCatType = tyreVehicleTypeCat(params[key]);
          if (tyreCatType) {
            filter.setVehicleType(tyreCatType);
            filter.setChipVehicleType(
              Array.from(new Set([...filter.chipVehicleType, tyreCatType]))
            );
          }
        }
        if (params[key] && !filter.brands && filter.chipBrands.length === 0) {
          const findBrandInSeason:string = goodsTyre._brands?.find(
            (brands:string) => 
            createStringUrl(brands.toLocaleLowerCase()) === params[key]);
          if (findBrandInSeason) {
            filter.setBrands(findBrandInSeason);
            filter.setChipBrands(
              Array.from(new Set([...filter.chipBrands, findBrandInSeason]))
            );
          }
        }
        if (params[key]?.includes('w') && !filter.width && filter.chipWidth.length === 0 ) {
          const findWidth = goodsTyre._width?.find((width:string) => width === params[key]?.slice(1, params[key]?.length));
          if (findWidth) {
            filter.setWidth(findWidth);
            filter.setChipWidth(
              Array.from(new Set([...filter.chipWidth, findWidth]))
            );
          }
        }
        if (params[key]?.includes('h') && !filter.height && filter.chipHeight.length === 0) {
          const findHeight = goodsTyre._height?.find((height:string) => height === params[key]?.slice(1, params[key]?.length));
          if (findHeight) {
            filter.setHeight(findHeight);
            filter.setChipHeight(
              Array.from(
                new Set([...filter.chipHeight, findHeight]))
            );
          }
        }
        if (params[key]?.includes('r') && !filter.diameter && filter.chipDiameter.length === 0) {
          const findDiameter = goodsTyre._diameter?.find(
            (diameter:string) => 
            diameter === params[key]?.slice(1, params[key]?.length));
          if (findDiameter) {
            filter.setDiameter(findDiameter);
            filter.setChipDiameter(
              Array.from(
                new Set([...filter.chipDiameter, findDiameter]))
            );
          }
        }
        if (params[key]?.includes('li-') && !filter.load_index && filter.chipLoadIndex.length === 0) {
          const findLoadIndex = goodsTyre._load_index?.find(
            (load_index_with_desc:string) => 
            createStringUrl(load_index_with_desc.toLocaleLowerCase()) === params[key]?.slice(3, params[key]?.length));
          if (findLoadIndex) {
            filter.setLoadIndex(findLoadIndex);
            filter.setChipLoadIndex(
              Array.from(new Set([...filter.chipLoadIndex, findLoadIndex]))
            );
          }
        }
        if (params[key]?.includes('si-') && !filter.speed_index && filter.chipSpeedIndex.length === 0) {
          const findSpeedIndex = goodsTyre._speed_index?.find(
            (speed_index_with_desc:string) => 
            createStringUrl(speed_index_with_desc.toLocaleLowerCase()) === params[key]?.slice(3, params[key]?.length));
          if (findSpeedIndex) {
            filter.setSpeedIndex(findSpeedIndex);
            filter.setChipSpeedIndex(
              Array.from(new Set([...filter.chipSpeedIndex, findSpeedIndex]))
            );
          }
        }
        if (params[key]?.includes('xl-') && !filter.reinforced && filter.chipReinforced.length === 0) {
          const findReinforcedSeason = goodsTyre._reinforced?.find(
            (reinforced:string) => 
            createStringUrl(reinforced.toLocaleLowerCase()) === params[key]?.slice(3, params[key]?.length));
          if (findReinforcedSeason) {
            filter.setReinforced(findReinforcedSeason);
            filter.setChipReinforced(
              Array.from(new Set([...filter.chipReinforced, findReinforcedSeason]))
            );
          }
        }
        if (params[key]?.includes('om-') && !filter.homologation && filter.chipHomologation.length === 0) {
          const findOmSeason = goodsTyre._homologation?.find(
            (homologation:string) => 
            createStringUrl(homologation.toLocaleLowerCase()) === params[key]?.slice(3, params[key]?.length));
          if (findOmSeason) {
            filter.setHomologation(findOmSeason);
            filter.setChipHomologation(
              Array.from(new Set([...filter.chipHomologation, findOmSeason]))
            );
          }
        }
      }
    }
    loadPropsTyreTask();
    return () => {
        isMounted = true;
    };
  },
  [
    filter, params, 
    goodsTyre, 
    filter.price, 
    filter.vehicle_type, 
    filter.speed_index, 
    filter.load_index, 
    location.pathname, 
    langState
    //i18n.resolvedLanguage
  ]);

  useEffect(() =>{
    let isMounted = false;
    const loadPropsTyreHeightTask = async() => {
      if(!isMounted && location.pathname.includes('tyres')) {
        console.time('GET_REQUEST_TYRE_PROPS')
        let tyreHeightFilterGoods: any = await getTyresWithoutOffsetProps(
          filter.studded ?? '',
          filter.run_flat ?? '',
          filter.homologation ?? '',
          filter.reinforced ?? '',
          'ASC',
        );
        console.timeEnd('GET_REQUEST_TYRE_PROPS')
        let setHomologationFilter: any[] | null  = [];
        let setReinforcedFilter: any[] | null  = [];
        let setRunFlatFilter: any[] | null  = [];
        let setStuddedFilter: any[] | null  = [];
          
        tyreHeightFilterGoods.rows.map((item: any) => 
        { return (
          setHomologationFilter?.push(item.homologation.homologation),
          setReinforcedFilter?.push(item.reinforce.reinforce),
          setRunFlatFilter?.push(item.run_flat.run_flat),
          setStuddedFilter?.push(item.studded.studded)
          )
        });
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
        setHomologationFilter = null;
        setReinforcedFilter = null;
        setRunFlatFilter = null;
        setStuddedFilter = null;
      }
    }
    loadPropsTyreHeightTask();
    return () => {
        isMounted = true;
    };
  },
  [ 
    filter,
    params,
    goodsTyre,
    filter.studded,
    filter.run_flat,
    filter.homologation,
    filter.reinforced,
    location.pathname,
  ]);

  useEffect(() => {
    let isMountedReview = false;
    const getTyresReviews = async () => {
      if(!isMountedReview && location.pathname.includes('tyres')) {
        let getReviewTyres: any = await getTyresReviewLimit(
          String(1),
          String(nextBtnReview)
        );
        if (getReviewTyres) {
          setReviewGoodsData(getReviewTyres);
        }
      }
    };
    getTyresReviews();
    return () => {
      isMountedReview = true;
    };
  },[location.pathname, nextBtnReview]);

  useEffect(() =>{
    let isMounted = false;
    const loadCatalogWheelTask = async() => {
      const taskLoad: any[] = [
        getWheelsWithCatOffset,
      ];
      let i:number = 0;
      while(taskLoad.length > i) {
        if (!isMounted && taskLoad[i] === getWheelsWithCatOffset && location.pathname.includes('wheels')) {
          console.time('GET_REQUEST_WHEELS_CATALOG');
          let wheelFilterGoods: any = await taskLoad[i](
            page.limit,
            page.offset,
            filter.width ?? '',
            filter.diameter ?? '',
            filter.bolt_count ?? '',
            filter.bolt_count_pcd ?? '',
            filter.brands ?? '',
            filter.price ?? '',
            filter.type ?? '',
            filter.color ?? '',
            filter.dia ?? '',
            filter.et ?? '',
            filter.pcd ?? '',
            filter.pcd2 ?? '',
            filter.sort,
          );
          console.timeEnd('GET_REQUEST_WHEELS_CATALOG');
          page.loadMore > 0 ? goodsWheel?.setWheels(
            [...goodsWheel._wheels, 
              ...wheelFilterGoods] 
            ) : goodsWheel?.setWheels(
              wheelFilterGoods);
        }
        const task = taskLoad.shift();
        task();
        await yieldToMain(); 
      }
    }
    loadCatalogWheelTask();
    return () => {
        isMounted = true;
    };
  },
  [
    filter, 
    params,
    goodsWheel,             
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
    page.limit, 
    page.loadMore, 
    page.offset,
    location.pathname
  ]);


  useEffect(() =>{
    let isMounted = false;
    const loadPropsWheelTask = async() => {
      const taskLoad: any[] = [
        getWheelsWithoutOffset,
      ];

      let i:number = 0;
      while(taskLoad.length > i) {
        if (!isMounted && taskLoad[i] === getWheelsWithoutOffset && location.pathname.includes('wheels')) {
          console.time('GET_REQUEST_WHEELS_PROPS');
          let wheelFilterGoods: any = await taskLoad[i](
            filter.width ?? '',
            filter.diameter ?? '',
            filter.bolt_count ?? '',
            filter.bolt_count_pcd ?? '',
            filter.brands ?? '',
            filter.price ?? '',
            filter.type ?? '',
            filter.color ?? '',
            filter.dia ?? '',
            filter.et ?? '',
            filter.pcd ?? '',
            filter.pcd2 ?? '',
            filter.sort,
          );
          console.timeEnd('GET_REQUEST_WHEELS_PROPS');
          let setWidthFilter:any[] | null  = [];
          let setDiameterFilter:any[] | null  = [];
          let setBrandFilter:any[] | null  = [];
          let setBoltCountFilter :any[] | null  = [];
          let setBoltCountPcdFilter :any[] | null  = [];
          let setColorFilter :any[] | null  = [];
          let setDiaFilter: any[] | null  = [];
          let setEtFilter :any[] | null  = [];
          let setPcdFilter :any[] | null  = [];
          let setPcd2Filter :any[] | null  = [];
          let setTypeFilter :any[] | null  = [];
          
          goodsWheel?.setTotalCount(wheelFilterGoods.rows.length);
          wheelFilterGoods.rows.map((item: any) => 
          { return (
            setWidthFilter?.push(item.width.width),
            setDiameterFilter?.push(item.diameter.diameter),
            setBrandFilter?.push(item.wheel_brand.brand),
            setBoltCountFilter?.push(item.bolt_count.bolt_count),
            setBoltCountPcdFilter?.push(item.bolt_count_pcd.bolt_count_pcd),
            setColorFilter?.push(item.color.color),
            setDiaFilter?.push(item.dia.dia),
            setEtFilter?.push(item.et.et),
            setPcdFilter?.push(item.pcd.pcd),
            setPcd2Filter?.push(item.pcd2.pcd2),
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
          setWidthFilter = null;
          setDiameterFilter = null;
          setBrandFilter = null;
          setBoltCountFilter = null;
          setBoltCountPcdFilter = null;
          setColorFilter = null;
          setDiaFilter = null;
          setEtFilter = null;
          setPcdFilter = null;
          setPcd2Filter = null;
          setTypeFilter = null;
        }
        const task = taskLoad.shift();
        task();
        await yieldToMain(); 
      }
    for (let key in params) {
      if (params[key] && !filter.type && filter.chipSeason.length === 0 ) {
        const typeWheelCat = typeWheelsCat(params[key]);
        if (typeWheelCat) {
          filter.setType(typeWheelCat);
          filter.setChipType(
            Array.from(new Set([...filter.chipSeason, typeWheelCat]))
          ); 
        }
      }
      if (params[key] && !filter.brands && filter.chipBrands.length === 0) {
        const findBrandsInType = goodsWheel._brands?.find(
          (brands:string) => 
          createStringUrl(brands.toLocaleLowerCase()) === params[key]);
        if (findBrandsInType) {
          filter.setBrands(findBrandsInType);
          filter.setChipBrands(
            Array.from(new Set([...filter.chipBrands, findBrandsInType]))
          );
        }
      }
      if (params[key]?.includes('w') && !filter.width && filter.chipWidth.length === 0 ) {
        const findWidthInType = goodsWheel._width?.find(
          (width:string) => width === params[key]?.slice(1, params[key]?.length)
        );
        if (findWidthInType) {
          filter.setWidth(findWidthInType);
          filter.setChipWidth(
            Array.from(new Set([...filter.chipWidth, findWidthInType]))
          );
        }
      }
      if (params[key]?.includes('r') && !filter.diameter && filter.chipDiameter.length === 0) {
        const findDiameterInType = goodsWheel._diameter?.find(
          (diameter:string) => 
          diameter === params[key]?.slice(1, params[key]?.length));
        if (findDiameterInType) {
          filter.setDiameter(findDiameterInType);
          filter.setChipDiameter(
            Array.from(new Set([...filter.chipDiameter, findDiameterInType]))
          );
        }
      }
      if (params[key] && !filter.bolt_count && filter.chipBoltCount.length === 0) {
        const findBoltInType = goodsWheel._bolt_count?.find(
          (bolt_countItem:string) => bolt_countItem === params[key]
        );
        if (findBoltInType) {
          filter.setBoltCount(findBoltInType);
          filter.setChipBoltCount(
            Array.from(new Set([...filter.chipBoltCount, findBoltInType]))
          );
        }
      }
      if (params[key]?.includes('pcd') && !filter.pcd && filter.chipPcd.length === 0) {
        const findPcdInType = goodsWheel._pcd?.find(
          (pcdItem:string) => 
          pcdItem === params[key]?.slice(3, params[key]?.length));
        if (findPcdInType) {
          filter.setPcd(findPcdInType);
          filter.setChipPcd(
            Array.from(new Set([...filter.chipPcd, findPcdInType]))
          );
        }
      }
      if (params[key]?.includes('et') && !filter.et && filter.chipEt.length === 0) {
        const findEtInType = goodsWheel._et?.find(
          (etItem:string) => 
          etItem === params[key]?.slice(2, params[key]?.length));
        if (findEtInType) {
          filter.setEt(findEtInType);
          filter.setChipEt(
            Array.from(new Set([...filter.chipEt, findEtInType]))
          );
        }
      }
      if (params[key]?.includes('dia') && !filter.dia && filter.chipDia.length === 0) {
        const findDiaInType = goodsWheel._dia?.find(
          (diaItem:string) => 
          diaItem.toLocaleLowerCase() === params[key]?.slice(3, params[key]?.length));
        if (findDiaInType) {
          filter.setDia(findDiaInType);
          filter.setChipDia(
            Array.from(new Set([...filter.chipDia, findDiaInType]))
          );
        }
      }
    }
    }
    loadPropsWheelTask();
    return () => {
        isMounted = true;
    };
  },
  [
    filter, 
    params,
    goodsWheel,             
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
    page.limit, 
    page.loadMore, 
    page.offset,
    location.pathname
  ]);

  useEffect(() => {
    let isMountedReview = false;
    const getWheelsReviews = async () => {
      if(!isMountedReview &&
        location.pathname.includes('wheels')
        ) {
        let getReviewWheels: any = await getWheelsReviewLimit(
          String(1),
          String(nextBtnReview)
        );
        if (getReviewWheels) {
          setReviewGoodsData(getReviewWheels);
        }
      }
    };
    getWheelsReviews();
    return () => {
      isMountedReview = true;
    };
  },[location.pathname, nextBtnReview]);

  const prevBtnReviewGoods = () => {
    if (prevBtnReview > 0) {
      setPrevBtnReview(oldPrevBtn => oldPrevBtn - 1);
      setNextBtnReview(oldNextBtn => oldNextBtn - 1);
    }
    if (prevBtnReview === 0) {
      setPrevBtnReview(0);
      setNextBtnReview(0);
    }
  };

  const nextBtnReviewGoods = () => {
    setNextBtnReview(oldNextBtn => oldNextBtn + 1);
    setPrevBtnReview(oldPrevBtn => oldPrevBtn + 1);
  };

  const filterClick = () => {
    setStateFilter(!stateFilter);
  }
  const closeFilter = () => {
    if(stateFilter) {
      setStateFilter(false);
    }
  };

  console.log('FILTER_SEASON: ', filter.season);
  console.log('LANG_STATE: ', langState);

  return (
    <div className='catalogTyres'
      onClick={closeFilter}
    >
      <div className='a'>
        {location.pathname.includes('tyres') ?
          <BreadCrumbs 
            route={['/','/tyres', `${filter.season && !filter.season?.includes(',') && !filter.brands ? createStringUrl(filter.season):''}`, `${filter.brands && !filter.brands.includes(',') ?  createStringUrl(filter.brands) : ''}`,`${filter.brands && !filter.brands.includes(',') && filter.season ? `${createStringUrl(filter.season)}/${createStringUrl(filter.brands)}`:''}`,`${params.season ?? null}${params.studded ?? null}${params.type ?? null}${params.brands ?? null}${params.width ?? null}${params.height ?? null}${params.diameter ?? null}${params.loadindex ?? null}${params.speedindex ?? null}${params.reinforced ?? null}${params.om ?? null}`]} 
            hrefTitle={
              [t('catalogPage.bread_crumbs_site'),t('catalogPage.bread_crumbs_tyre'), `${filter.season && !filter.season.includes(',') && !filter.brands ? `${t('catalogPage.bread_crumbs_tyre')} ${filter.season}` : ''}`, filter.brands && !filter.brands.includes(',') ? `${t('catalogPage.bread_crumbs_tyre')} ${filter.brands}` : '', filter.brands && !filter.brands.includes(',') && filter.season ? `${t('catalogPage.bread_crumbs_tyre')} ${filter.season} ${filter.brands}` : '', `${t('catalogPage.bread_crumbs_tyre')} ${filter.vehicle_type && !filter.vehicle_type.includes(',') ? filter.vehicle_type : ''} ${filter.season && !filter.season.includes(',') ? filter.season : ''} ${filter.studded && !filter.studded.includes(',') ? filter.studded : ''} ${filter.brands && !filter.brands.includes(',') ? filter.brands : ''} ${filter.width ? filter.width : ''} ${filter.height ? '/' + filter.height : ''} ${filter.diameter ? 'R' + filter.diameter : '' } ${filter.load_index && !filter.load_index.includes(',') ? filter.load_index : ''} ${filter.speed_index && !filter.speed_index.includes(',') ? filter.speed_index : ''} ${filter.reinforced && !filter.reinforced.includes(',') ? filter.reinforced : ''} ${filter.homologation && !filter.homologation.includes(',')  ? filter.homologation : ''}`
          ]}
          />
        : null  
        }
        {location.pathname.includes('wheels') ?
          <BreadCrumbs 
            route={['/','/wheels',`${params.type ?? null}`,`${filter.brands && !filter.brands.includes(',') ?  createStringUrl(filter.brands) : null}`,`${params.type ?? null}${params.brands ?? null}${params.width ?? null}${params.diameter ?? null}${params.boltcount ?? null}${params.pcd ?? null}${params.et ?? null}${params.dia ?? null}`]} 
            hrefTitle={
              [t('catalogPage.bread_crumbs_site'),t('catalogPage.bread_crumbs_wheel'), filter.type && !filter.type.includes(',') ? `${filter.type}` : '', filter.brands && !filter.brands.includes(',') ? `${filter.type} ${filter.brands}` : '', `Диски ${filter.type.includes(',') ? filter.type : ''} ${filter.brands && !filter.brands.includes(',') ? filter.brands : ''} ${filter.width ? 'W' + filter.width : ''} ${filter.diameter ? 'R' + filter.diameter : '' } ${filter.bolt_count && !filter.bolt_count.includes(',') ? filter.bolt_count : ''} ${filter.pcd && !filter.pcd.includes(',') ? 'PCD' + filter.pcd : ''} ${filter.et && !filter.et.includes(',') ? 'ET' + filter.et : ''} ${filter.dia && !filter.dia.includes(',') ? 'DIA' + filter.dia : ''}`
          ]}
          />
        : null  
        }
        </div>
        <div className='b'>
        {location.pathname.includes('tyres') ?
          <FilterCatalogTyres
            filterState={stateFilter} 
            setFilterAction={setStateFilter} 
          />
          : null
        }
        {location.pathname.includes('wheels') ?
          <FilterCatalogWheels
            filterState={stateFilter} 
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
          {location.pathname.includes('wheels') ?
            <CatalogWheels/>
            : null
          }
        </div>
        <div className='d'>
        {location.pathname.includes('tyres') ?
          <ReviewsMain 
            props={t('catalogPage.review_title_custm')} 
            marginText={-50}
            prevBtnAction={prevBtnReviewGoods} 
            nextBtnAction={nextBtnReviewGoods}    
            buttonPosition={{
              prevBtnLeft: goodsTyre._tyres.length !== 0 && reviewGoodsData?.length !== 0 ? -7 
              : reviewGoodsData?.length === 0 ? -7 
              : undefined, 
              prevTop: goodsTyre._tyres.length !== 0 && reviewGoodsData?.length !== 0 ? -140
              : reviewGoodsData?.length === 0 ? -40 
              : undefined, 
              nextBtnRight: goodsTyre._tyres.length !== 0 && reviewGoodsData?.length !== 0 ? -95 
              : undefined,  
              nextTop: goodsTyre._tyres.length !== 0 && reviewGoodsData?.length !== 0 ? -140 
              : undefined, 
            }}      
          >
            <div >
            {reviewGoodsData?.length !== 0 ? 
              reviewGoodsData?.map((item: any) =>
              <div key={item?.id_review_store + '_review'}>
              <ReviewsGoods 
                productFullName={item?.tyres?.full_name} 
                rating={[item?.rating]} 
                reviewEntity={item} 
                reviewExtend={false} 
                btnLeft={undefined} 
                btnRight={undefined}
              />
              </div>
              )
              : reviewGoodsData?.length === 0 ?
              <div className='mainAfterReviews' >
                <a className='mainLinkReview'
                  href='/review'>{t('catalogPage.review_goods_all')}
                </a>
              </div>
              : 
              <h4>{t('catalogPage.review_goods_no')}</h4>
            }
            </div>
          </ReviewsMain>
          : null
          }
          {location.pathname.includes('wheels') ?
          <ReviewsMain 
            props={'Відгуки кліентів'} 
            marginText={0}
            prevBtnAction={prevBtnReviewGoods} 
            nextBtnAction={nextBtnReviewGoods}    
            buttonPosition={{
              prevBtnLeft: goodsWheel._wheels.length !== 0 ? 450
              : reviewGoodsData?.length === 0 ? -7 
              : undefined,  
              prevTop: goodsWheel._wheels.length !== 0 ? 345 
              : reviewGoodsData?.length === 0 ? -75 
              : undefined,  
              nextBtnRight: goodsWheel._wheels.length !== 0 && reviewGoodsData?.length !== 0 ? 140 : undefined,  
              nextTop: goodsWheel._wheels.length !== 0 && reviewGoodsData?.length !== 0 ? 345 : undefined, 
            }}      
          >
            <div >
            {reviewGoodsData?.length !== 0 ? 
              reviewGoodsData?.map((item: any) =>
              <div key={item?.id_review_store + '_review'}>
              <ReviewsGoods 
                productFullName={item?.wheels?.full_name_color} 
                rating={[item?.rating]} 
                reviewEntity={item} 
                reviewExtend={false} 
                btnLeft={undefined} 
                btnRight={undefined}
              />
              </div>
              )
              : reviewGoodsData?.length === 0 ?
              <h4>{t('catalogPage.review_goods_no')}</h4>
              : 
              <div className='mainAfterReviews' >
                <a className='mainLinkReview'
                  href='/review'>{t('catalogPage.review_goods_all')}
                </a>
              </div>
            }
            </div>
          </ReviewsMain>
          : null
          }
        </div>
        <div className='e'>
        </div>  
    </div>
  );
});

export default CatalogTyresPage;