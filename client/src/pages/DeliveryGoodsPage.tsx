import React, { Suspense, lazy, useContext, useEffect, useState } from 'react';
import '../css/Pages/DeliveryGoodsPage.css';
import { useLocation, useParams } from 'react-router-dom';
import { Context } from '../context/Context';
import { createStringUrl } from '../services/stringUrl';
import { DELIVERY_GOODS_ROUTE } from '../utils/consts';
import { getTyresOffsetMain, getTyresReviewLimit, getTyresWithCatOffset, getTyresWithoutOffset, getTyresWithoutOffsetProps } from '../restAPI/restGoodsApi';
import { getCityInRegionNovaPoshta, getWareHousesNovaPoshta } from '../restAPI/restNovaPoshtaAPI';
import {regionDataRu, regionDataUa, regionDelivery, regionNovaPoshata} from '../services/regionServiceDelivery';
import SpinnerCarRot from '../components/spinners/SpinnerCarRot';
import { getCityInRegionDelivery, getWareHousesDelivery } from '../restAPI/restDeliveryAPI';
import { tyreSeasonCat, tyreVehicleTypeCat } from '../services/tyresCatService';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { ICityMarkerData } from './types/CityMarket.type';

const BreadCrumbs = lazy(() => import('../components/BreadCrumbs'));
const FilterCatalogTyres = lazy(() => import('../components/filterCatalog/FilterCatalogTyres'));
const CatalogTyres = lazy(() => import('../components/catalogs/CatalogTyres'));
const ReviewsMain = lazy(() => import('../components/reviews/ReviewsMain'));
const ReviewsGoods = lazy(() => import('../components/reviews/ReviewsGoods'));
const MapDelivery = lazy(() => import('../components/maps/MapDelivery'));

const DeliveryGoodsPage = () => {
  const {goodsTyre, filter} = useContext<any | null>(Context);
  const {page} = useContext<any | null>(Context);
  const params = useParams<any>();
  const location = useLocation();
  const [reviewGoodsData, setReviewGoodsData] = useState<any[] | null>();
  const [prevBtnReview, setPrevBtnReview] = useState<number>(0);
  const [nextBtnReview, setNextBtnReview] = useState<number>(0);
  const [cityRegion, setCityRegion] = useState<string>();
  const [cityCenterRegion, setCityCenterRegion] = useState<string>();
  const [cityMarkerData, setCityMarkerData] = useState<ICityMarkerData>();
  const [novaPoshtaRegion, setNovaPoshtaRegion] = useState<string>();
  const [novaPoshtaCityInRegion, setNovaPoshtaCityInRegion] = useState<any[] | null>();
  const [novaPoshtaWareHouseList, setNovaPoshtaWareHouseList] = useState<any[] | null>();
  const [markerState, setMarkerState] = useState<string | null>();
  const [deliveryWareHouseList, setDeliveryWareHouseList] = useState<any[] | null>();
  const [chooseDepart, setChooseDepart] = useState<string| null>();
  const [deliveryRegion, setDeliveryRegion] = useState<string | number>();
  const [stateFilter, setStateFilter]=useState<boolean>(false);
  const [region, setRegion] = useState<string>();
  const [tabDelivery, setTabDelivery] = useState<string>('Нова Пошта');
  const [langState, setLangState] = useState<string>('ua');
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
    let isMounted = false;
    const loadUrl = async() => {
      const getRegionItem = localStorage.getItem('regionData')?.split(',');
      const getUrlArr = params.region.split('-');
      if (!isMounted && !getRegionItem) {
        const getRegionUaData = regionDataUa(getUrlArr[1]);
        const getRegionRuData = regionDataRu(getUrlArr[1]);
        if (getRegionUaData && langState === 'uk') {
          localStorage.setItem('regionData', getRegionUaData);
        }
        if (getRegionRuData && langState === 'ru') {
          localStorage.setItem('regionData', getRegionRuData);
        }
      }
    };
    loadUrl();
    return () => {
        isMounted = true;
    };
  },[langState, params.region]);

  useEffect(() =>{
    let isMounted = false;
    const loadCatalogTyre = async() => {
      if (!isMounted) {
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
        goodsTyre?.setTotalCount(tyreFilterGoodsId.count);
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
    page.limit, 
    page.loadMore, 
    page.offset
  ]);

  useEffect(() =>{
    let isMounted = false;
    const loadMainFilterTyreTask = async () => {
      if(!isMounted) {
        let tyreFilterGoods: any = await getTyresOffsetMain(
            filter.width,
            filter.height,
            filter.diameter,
            filter.season,
            filter.brands,
            'ASC',
          );
          let setSeasonFilter :any[] | null = [];
          
          tyreFilterGoods?.rows?.season?.map((item: any) =>
          { return (
            setSeasonFilter?.push(langState === 'uk' ? item?.season_ua : item?.season)
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
            createStringUrl(studded?.toLocaleLowerCase()) === params[key]);
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
            createStringUrl(brands?.toLocaleLowerCase()) === params[key]);
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
            createStringUrl(load_index_with_desc?.toLocaleLowerCase()) === params[key]?.slice(3, params[key]?.length));
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
            createStringUrl(speed_index_with_desc?.toLocaleLowerCase()) === params[key]?.slice(3, params[key]?.length));
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
            createStringUrl(reinforced?.toLocaleLowerCase()) === params[key]?.slice(3, params[key]?.length));
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
            createStringUrl(homologation?.toLocaleLowerCase()) === params[key]?.slice(3, params[key]?.length));
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
    langState
  ]);

  useEffect(() =>{
    let isMounted = false;
    const loadPropsTyreTask = async() => {
        if(!isMounted) {
          let tyreFilterGoods: any = await getTyresWithoutOffset(
            filter.price ?? '',
            filter.vehicle_type ?? '',
            filter.speed_index ?? '',
            filter.load_index ?? '',
            'ASC',
          );
          let setVehicleTypeFilter: any[] | null  = [];
        
          tyreFilterGoods?.rows?.type?.map((item: any) => 
          { return (
            setVehicleTypeFilter?.push(langState === 'uk' ? item?.vehicle_type_ua : item?.vehicle_type)
            )
          });
          if (filter.vehicle_type) {
            goodsTyre?.setVehicleType(
              Array.from(new Set(
                [...goodsTyre._vehicle_type, ...setVehicleTypeFilter]
              ))
            )
          } else {
              goodsTyre?.setVehicleType(
              Array.from(new Set([...setVehicleTypeFilter, langState === 'uk' ? 'вантажні шини' : 'грузовые шины']))
            )
          }
          if (filter.speed_index) {
            goodsTyre?.setSpeedIndex(
              Array.from(new Set(
                [...goodsTyre._speed_index, ...tyreFilterGoods?.rows?.speed_index]
              )).sort(
                (a: any, b: any) => a?.localeCompare(b))
            )
          } else {
            goodsTyre?.setSpeedIndex(
              Array.from(new Set(tyreFilterGoods?.rows?.speed_index)).sort(
                (a: any, b: any) => a?.localeCompare(b))
            )
          }
          if (filter.load_index) {
            goodsTyre?.setLoadIndex(
              Array.from(new Set(
                [...goodsTyre._load_index, ...tyreFilterGoods?.rows?.load_index]
              )).sort(
                (a: any, b: any) => a?.localeCompare(b))
            )
          } else {
            goodsTyre?.setLoadIndex(
              Array.from(new Set(tyreFilterGoods?.rows?.load_index)).sort(
                (a: any, b: any) => a?.localeCompare(b))
            )
          }
          setVehicleTypeFilter = null;
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
              createStringUrl(studded?.toLocaleLowerCase()) === params[key]);
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
              createStringUrl(brands?.toLocaleLowerCase()) === params[key]);
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
              createStringUrl(load_index_with_desc?.toLocaleLowerCase()) === params[key]?.slice(3, params[key]?.length));
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
              createStringUrl(speed_index_with_desc?.toLocaleLowerCase()) === params[key]?.slice(3, params[key]?.length));
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
              createStringUrl(reinforced?.toLocaleLowerCase()) === params[key]?.slice(3, params[key]?.length));
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
              createStringUrl(homologation?.toLocaleLowerCase()) === params[key]?.slice(3, params[key]?.length));
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
    filter,
    params,
    goodsTyre,
    filter.price,
    filter.vehicle_type,
    filter.speed_index,
    filter.load_index,
    langState
  ]);

  useEffect(() =>{
    let isMounted = false;
    const loadPropsTyreHeightTask = async() => {
        if(!isMounted) {
          let tyreHeightFilterGoods: any = await getTyresWithoutOffsetProps(
            filter.studded ?? '',
            filter.run_flat ?? '',
            filter.homologation ?? '',
            filter.reinforced ?? '',
            'ASC',
          );
          if (filter.studded) {
            goodsTyre?.setStudded(
             Array.from(new Set(
               [...goodsTyre._studded, ...tyreHeightFilterGoods?.rows?.studded]
             ))
           )
         } else {
           goodsTyre?.setStudded(
             Array.from(new Set(tyreHeightFilterGoods?.rows?.studded))
           )
         }
         if (filter.homologation) {
           goodsTyre?.setHomologation(
             Array.from(new Set(
               [...goodsTyre._homologation, ...tyreHeightFilterGoods?.rows?.homologation]
             ))
           )
         } else {
           goodsTyre?.setHomologation(
             Array.from(new Set(tyreHeightFilterGoods?.rows?.homologation))
           )
         }
         if (filter.run_flat) {
           goodsTyre?.setRunFlat(
             Array.from(new Set(
               [...goodsTyre._run_flat, ...tyreHeightFilterGoods?.rows?.run_flat]
             ))
           )
         } else {
           goodsTyre?.setRunFlat(
             Array.from(new Set(tyreHeightFilterGoods?.rows?.run_flat))
           )
         }
         if (filter.reinforced) {
           goodsTyre?.setReinforced(
             Array.from(new Set(
               [...goodsTyre._reinforced, ...tyreHeightFilterGoods?.rows?.reinforce]
             ))
           )
        } else {
          goodsTyre?.setReinforced(
            Array.from(new Set(tyreHeightFilterGoods?.rows?.reinforce))
          )
        }
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
  ]);

  useEffect(() => {
    let isMounted = false;
    const getUrlArr = params.region.split('-');
    const transformRegion: string | undefined = regionDataUa(getUrlArr[1]);
    const regionData: string[] | undefined = transformRegion?.split(',')
    const loadRegionData = async() => {
      if(!isMounted) {
        const getRegionItem = localStorage.getItem('regionData')?.split(',');
        if (getRegionItem) {
          setRegion(getRegionItem[1]);
          const getRefRegionNP = regionNovaPoshata(getRegionItem[1]);
          setNovaPoshtaRegion(getRefRegionNP);
          const getRefRegionDelivery = regionDelivery(getRegionItem[1]);
          setDeliveryRegion(getRefRegionDelivery);
        }
      } 
      if (!isMounted && novaPoshtaRegion && regionData) {
        try {
          let regionCityList: any[] | null = [];
          let regionFilteredCityList: any[] | null = [];
          let cityDepartData: any[] | null = [];

          let getCountRegionCity: any = await getCityInRegionNovaPoshta(novaPoshtaRegion, 1);
          const countPage = Math.ceil(getCountRegionCity?.info.totalCount / 150);
          
          if (countPage > 1) {
            for (let index = 1; index <= countPage; index++) {
              let getRegionCity: any = await getCityInRegionNovaPoshta(novaPoshtaRegion, index);
              regionCityList.push(...getRegionCity.data);
            }
          } else {
            let getRegionCity: any = await getCityInRegionNovaPoshta(novaPoshtaRegion, 1);
            regionCityList.push(...getRegionCity.data);
          }
          if (langState === 'uk') {
            for (let index = 0; index < regionCityList.length; index++) {
              let getCityWareHouse = await getWareHousesNovaPoshta(
              {
                MainDescription: regionCityList[index].Description,
                DeliveryCity :''
              });
              if (getCityWareHouse.info.totalCount !== 0 && getCityWareHouse.data.length !== 0 &&
                getCityWareHouse.data[0].SettlementAreaDescription === regionData![1] &&
                getCityWareHouse.data[0].SettlementRef === regionCityList[index].Ref
              ) {
                regionFilteredCityList.push(regionCityList[index]);
                let cityRef = regionCityList[index].Ref;
                let getCityDepart = getCityWareHouse.data.filter((item: any) => createStringUrl(item.CityDescription.toLowerCase()) === getUrlArr[0] 
                  && item.SettlementAreaDescription === regionData![1] && item.SettlementRef === cityRef
                );
                if (getCityDepart.length > 0) {
                  cityDepartData.push(...getCityDepart);
                }
              }
            };
            const getCityMarkerData = regionFilteredCityList.find((item: any) => createStringUrl(item.Description.toLowerCase()) === getUrlArr[0]);
            setCityRegion(getCityMarkerData.Description);
            setCityCenterRegion(getCityMarkerData.Description);
            setCityMarkerData(getCityMarkerData);
            setNovaPoshtaCityInRegion([...regionFilteredCityList]);
            setNovaPoshtaWareHouseList([...cityDepartData]);
          }
          if (langState === 'ru') {
            for (let index = 0; index < regionCityList.length; index++) {
              let getCityWareHouse = await getWareHousesNovaPoshta(
              {
                MainDescription: regionCityList[index].DescriptionRu,
                DeliveryCity :''
              });
              if (getCityWareHouse.info.totalCount !== 0 && getCityWareHouse.data.length !== 0 &&
                getCityWareHouse.data[0].SettlementAreaDescription === regionData![1] &&
                getCityWareHouse.data[0].SettlementRef === regionCityList[index].Ref
              ) {
                regionFilteredCityList.push(regionCityList[index]);
                let cityRef = regionCityList[index].Ref;
                let getCityDepart = getCityWareHouse.data.filter((item: any) => createStringUrl(item.CityDescriptionRu.toLowerCase()) === getUrlArr[0] 
                  && item.SettlementAreaDescription === regionData![1] && item.SettlementRef === cityRef
                );
                if (getCityDepart.length > 0) {
                  cityDepartData.push(...getCityDepart);
                }
              }
            };
            const getCityMarkerData = regionFilteredCityList.find((item: any) => createStringUrl(item.DescriptionRu.toLowerCase()) === getUrlArr[0]);
            setCityRegion(getCityMarkerData.DescriptionRu);
            setCityCenterRegion(getCityMarkerData.DescriptionRu);
            setCityMarkerData(getCityMarkerData);
            setNovaPoshtaCityInRegion([...regionFilteredCityList]);
            setNovaPoshtaWareHouseList([...cityDepartData]);
          }
          regionCityList = null;
          regionFilteredCityList = null;
          cityDepartData = null;       
        } catch (error) {
          console.log('NOVAPOSHTA_SET_REGION_ERROR: ', error);
        }
      }   
      if (!isMounted && deliveryRegion && regionData) {
        try {
          let getCountRegionCityD: any = await getCityInRegionDelivery(deliveryRegion);
          if (getCountRegionCityD.status === true) {
            let cityPresent = getCountRegionCityD.data.find((item: any) => item.name === regionData![0]);
            if (cityPresent) {
              let getCityWareHouseDel = await getWareHousesDelivery(
                cityPresent.id
              );
              setDeliveryWareHouseList(getCityWareHouseDel.data);
            }
          };        
        } catch (error) {
          console.log('DELIVERY_SET_REGION_ERROR: ', error);
        }
      } 
      localStorage.removeItem('regionData'); 
    }
    loadRegionData();
    return () => {
        isMounted = true;
    };
  },[
    cityCenterRegion, 
    cityRegion, 
    deliveryRegion, 
    novaPoshtaRegion, 
    params.region, 
    region,
    langState
  ]);

  useEffect(() => {
    let isMounted = false;
    const getTyresReview = async() => {
      if(!isMounted) {
        let getReviewTyres: any = await getTyresReviewLimit(
          String(1),
          String(nextBtnReview)
        );
        if (getReviewTyres) {
          setReviewGoodsData(getReviewTyres);
        }
      }
    };
    getTyresReview();
    return () => {
      isMounted = true;
    };
  },[nextBtnReview]);


  const addDeliveryLink = (e: any) => {
    localStorage.setItem('regionData', e.currentTarget.getAttribute('data-region'));
  };

  const closeFilter = () => {
    if(stateFilter) {
      setStateFilter(false);
    }
  };

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

  const markerClick = (e: any) => {
    setMarkerState(null);
    setMarkerState(e.target.getAttribute('data-position'));
    setChooseDepart(e.target.getAttribute('data-choose'));
  };

  const moveToDeliveriRegion = () => {
    document.documentElement.scrollTo({
      top: 2800,
      left: 0,
      behavior: "smooth",
    });
  };

  const chooseDelivery = (e: any) => {
    setMarkerState(null);
    setTabDelivery(e.target.textContent);
  };
  
  return (
    <div className='deliveryGoodsPage'
    onClick={closeFilter}
    >
      <Suspense fallback={<SpinnerCarRot/>}>
      <div className='aDev'>
        <BreadCrumbs 
          route={[i18n.resolvedLanguage === 'uk' ? '/' : '/ru','/delivery-pay', '/delivery']} 
          hrefTitle={['Інтернет-магазин SkyParts','Доставка оплата', `Доставка шин в ${cityRegion ?? ''}`]}
        /> 
      </div>
      <div className='hDev'>
        <h2>{t('deliveryPage.buy_tyres')} {cityRegion ?? ''}</h2> 
        {cityRegion && cityRegion === cityCenterRegion ?
        <span 
          className='deliveryGoodsPageHtitle' 
          onClick={moveToDeliveriRegion}
        >
          {t('deliveryPage.delivery_to_another_cities')} {region}
        </span> 
        : <span 
            className='deliveryGoodsPageHtitle' 
            onClick={moveToDeliveriRegion}
          >
          {t('deliveryPage.delivery_to_another_regions')}
          </span>
        }
      </div>
      { cityRegion ?
        <Helmet>
            <title>{t('deliveryMetaData.delivery_title', {city: cityRegion, region: region})}</title>
            <meta
                name="description"
                content={t('deliveryMetaData.delivery_description', {city: cityRegion, region: region})}
            />
            <meta
                name="keywords"
                content={t('deliveryMetaData.delivery_keywords', {city: cityRegion, region: region})}
            />
            <link rel="canonical" href={process.env.REACT_APP_CORS! + location.pathname}/>
            <link rel="alternate" hrefLang='ru' href={process.env.REACT_APP_CORS + '/ru' + location.pathname}/>
            <link rel="alternate" hrefLang='uk' href={process.env.REACT_APP_CORS! + location.pathname}/>
        </Helmet>
        : null
        }
      <div className='bDev'>
        <FilterCatalogTyres
          filterState={stateFilter} 
          setFilterAction={setStateFilter} 
        />
      </div>
      <div className='cDev'>
        <CatalogTyres/>
      </div>
      <div className='gDev'>
        <h3>{t('deliveryPage.methods_delivery')} {cityRegion} </h3> 
      </div>
      {cityMarkerData && novaPoshtaWareHouseList ?
      <div className='dDev'>
        { tabDelivery === 'Нова Пошта' ?
          <div className='deliveryGoodsMap'>
          <MapDelivery 
            centerPosition={[Number(cityMarkerData?.Latitude), Number(cityMarkerData?.Longitude)]}
            markerPositionNP={novaPoshtaWareHouseList}
            markerPositionDel={null}
            popupInfo={markerState}
          />
          </div> : null
        }
        { tabDelivery === 'Delivery' ?
          <div className='deliveryGoodsMap'>
          <MapDelivery 
            centerPosition={[Number(cityMarkerData?.Latitude), Number(cityMarkerData?.Longitude)]}
            markerPositionNP={null}
            markerPositionDel={deliveryWareHouseList}
            popupInfo={markerState}
          />
          </div> : null
        }
        <div className='deliveryGoodsList'>
          <br/>
          <div className='deliveryGoodsDeliveryChoose'>
            {novaPoshtaWareHouseList ?
            <span 
              className={ tabDelivery === 'Нова Пошта' ?
              'deliveryGoodsDeliveryChooseBtn active' :
                'deliveryGoodsDeliveryChooseBtn'
              }
              onClick={chooseDelivery}
            >
              Нова Пошта
            </span>
            : null
            }
            {deliveryWareHouseList ?
            <span 
              className={ tabDelivery === 'Delivery' ?
                'deliveryGoodsDeliveryChooseBtn active' :
                'deliveryGoodsDeliveryChooseBtn'
              }
              onClick={chooseDelivery}
            >
              Delivery
            </span>
            : null 
            }
          </div>
          <div className='deliveryGoodsDepartDataList'>
          {novaPoshtaWareHouseList && tabDelivery === 'Нова Пошта' ? 
          novaPoshtaWareHouseList.map((item: any) => (
          <div 
            className='deliveryGoodsDepartData'
            key={item.SiteKey + '-Depart'}
          >
            <ul>
              <li
                className={
                  chooseDepart === item.SiteKey ?
                  'deliveryGoodsListDepartment active' :
                  'deliveryGoodsListDepartment'
                }
                onClick={markerClick}
                data-choose={item.SiteKey} 
                data-position={[Number(item.Latitude),Number(item.Longitude),langState === 'uk' ? item.Description : item.DescriptionRu,'тел: '+ item.Phone]} 
              >
                {langState === 'uk' ? item.Description : item.DescriptionRu}<br/> тел: {item.Phone}
              </li>
            </ul>  
          </div>
          ))
          : null
          }
          {deliveryWareHouseList && tabDelivery === 'Delivery' ? 
          deliveryWareHouseList.map((item: any) => (
          <div 
            className='deliveryGoodsDepartData'
            key={item.id}
          >
            <ul>
              <li
                className={
                  chooseDepart === item.id ?
                  'deliveryGoodsListDepartment active' :
                  'deliveryGoodsListDepartment'
                }
                onClick={markerClick} 
                data-choose={item.id} 
                data-position={[Number(item.latitudeCorrect),Number(item.longitudeCorrect),item.name + ' ' + item.address,'тел: 0800-509-609']} 
              >
                {item.name + ' ' + item.address}<br/> тел: 0800-509-609
              </li>
            </ul>  
          </div>
          ))
          : null
          }
          </div>
        </div>
      </div>
        : <SpinnerCarRot/>
      }
      <div className='eDev'>
      {cityRegion && cityRegion === cityCenterRegion ?
        <h3>{t('deliveryPage.delivery_to_another_cities')} {region}</h3> 
        : <h3>{t('deliveryPage.delivery_to_another_regions')}</h3>
      }
      <div className='deliveryGoodsCityInRegion'>
      {region && cityRegion === cityCenterRegion ? 
      novaPoshtaCityInRegion?.filter(
        entity => entity.Description !== cityRegion)
      .map((item) =>
      <div key={item.Ref}>
        <ul>
          <li>
          <a 
            href={DELIVERY_GOODS_ROUTE + '/' + 
            createStringUrl(`${langState === 'uk' ? item.Description : item.DescriptionRu} ${region}`)}
            data-region={`${langState === 'uk' ? item.Description : item.DescriptionRu},${region},${cityRegion}`}
            onClick={addDeliveryLink}
            title={`Доставка шин дисків акб автохіміі в ${langState === 'uk' ? item.Description : item.DescriptionRu}`}
          >
            {langState === 'uk' ? item.Description : item.DescriptionRu}
          </a>
          </li>
        </ul>
      </div>
      )
      : null
      }
      {region && cityRegion !== cityCenterRegion ? 
      <div className='deliveryGoodsCityInRegionList'>
        <ul>
        <li>
          <a href={DELIVERY_GOODS_ROUTE + '/' + 
            createStringUrl(t('deliveryPage.vinnica_string'))}
            data-region={t('deliveryPage.vinnica_region')}
            onClick={addDeliveryLink}
            title={t('deliveryPage.vinnica_title')}
          >
            {t('deliveryPage.tyre')} в {t('deliveryPage.cremea_obl')}
          </a>
        </li>
        <li>
          <a href={DELIVERY_GOODS_ROUTE + '/' + 
            createStringUrl(t('deliveryPage.vinnica_string'))}
            data-region={t('deliveryPage.vinnica_region')}
            onClick={addDeliveryLink}
            title={t('deliveryPage.vinnica_title')}
          >
           {t('deliveryPage.tyre')} в {t('deliveryPage.vinnicka_obl')}
          </a>
        </li>
        <li>
          <a href={DELIVERY_GOODS_ROUTE + '/' + 
            createStringUrl(t('deliveryPage.volinska_string'))}
            data-region={t('deliveryPage.volinska_region')}
            onClick={addDeliveryLink}
            title={t('deliveryPage.volinska_title')}
          >
            {t('deliveryPage.tyre')} в {t('deliveryPage.volinska_obl')}
          </a>
        </li>
        <li>
          <a href={DELIVERY_GOODS_ROUTE + '/' + 
            createStringUrl(t('deliveryPage.dniprovska_string'))}
            data-region={t('deliveryPage.dniprovska_region')}
            onClick={addDeliveryLink}
            title={t('deliveryPage.dniprovska_title')}
          >
            {t('deliveryPage.tyre')} в {t('deliveryPage.dniprovska_obl')}
          </a>
        </li>
        <li>
          <a href={DELIVERY_GOODS_ROUTE + '/' + 
            createStringUrl(t('deliveryPage.donecka_string'))}
            data-region={t('deliveryPage.donecka_region')}
            onClick={addDeliveryLink}
            title={t('deliveryPage.donecka_title')}
          >
            {t('deliveryPage.tyre')} в {t('deliveryPage.donecka_obl')}
          </a>
        </li>
        <li>
          <a href={DELIVERY_GOODS_ROUTE + '/' + 
            createStringUrl(t('deliveryPage.gitomirska_string'))}
            data-region={t('deliveryPage.gitomirska_region')}
            onClick={addDeliveryLink}
            title={t('deliveryPage.gitomirska_title')}
          >
            {t('deliveryPage.tyre')} в {t('deliveryPage.gitomirska_obl')}
          </a>
        </li>
        <li>
          <a href={DELIVERY_GOODS_ROUTE + '/' + 
            createStringUrl(t('deliveryPage.zakarpat_string'))}
            data-region={t('deliveryPage.zakarpat_region')}
            onClick={addDeliveryLink}
            title={t('deliveryPage.zakarpat_title')}
          >
            {t('deliveryPage.tyre')} в {t('deliveryPage.zakarpat_obl')}
          </a>
        </li>
          <li>
            <a href={DELIVERY_GOODS_ROUTE + '/' + 
              createStringUrl(t('deliveryPage.zaporogs_string'))}
              data-region={t('deliveryPage.zaporogs_region')}
              onClick={addDeliveryLink}
              title={t('deliveryPage.zaporogs_title')}
            >
              {t('deliveryPage.tyre')} в {t('deliveryPage.zaporogs_obl')}
            </a>
          </li>
        </ul>
        <ul className='deliveryPageRegionListUl'>
          <li>
            <a href={DELIVERY_GOODS_ROUTE + '/' + 
              createStringUrl(t('deliveryPage.ivanofr_string'))}
              data-region={t('deliveryPage.ivanofr_region')}
              onClick={addDeliveryLink}
              title={t('deliveryPage.ivanofr_title')}
            >
              {t('deliveryPage.tyre')} в {t('deliveryPage.ivanofr_obl')}
            </a>
          </li>
          <li>
            <a href={DELIVERY_GOODS_ROUTE + '/' + 
              createStringUrl(t('deliveryPage.kiivska_string'))}
              data-region={t('deliveryPage.kiivska_region')}
              onClick={addDeliveryLink}
              title={t('deliveryPage.kiivska_title')}
            >
              {t('deliveryPage.tyre')} в {t('deliveryPage.kiivska_obl')}
            </a>
          </li>
          <li>
            <a href={DELIVERY_GOODS_ROUTE + '/' + 
              createStringUrl(t('deliveryPage.kirovogr_string'))}
              data-region={t('deliveryPage.kirovogr_region')}
              onClick={addDeliveryLink}
              title={t('deliveryPage.kirovogr_title')}
            >
              {t('deliveryPage.tyre')} в {t('deliveryPage.kirovogr_obl')}
            </a>
          </li>
          <li>
            <a href={DELIVERY_GOODS_ROUTE 
              //createStringUrl('Луганськ Луганська область')
              }
              data-region='Луганськ,Луганська область,Луганськ'
              //onClick={addDeliveryLink}
              title='Доставка шин дисків акб автохіміі в Луганська область'
            >
              Луганськ - тимчасово не доступна
            </a>
          </li>
          <li>
            <a href={DELIVERY_GOODS_ROUTE + '/' + 
              createStringUrl(t('deliveryPage.lvivska_string'))}
              data-region={t('deliveryPage.lvivska_region')}
              onClick={addDeliveryLink}
              title={t('deliveryPage.lvivska_title')}
            >
              {t('deliveryPage.tyre')} в {t('deliveryPage.lvivska_obl')}
            </a>
          </li>
          <li>
            <a href={DELIVERY_GOODS_ROUTE + '/' + 
              createStringUrl(t('deliveryPage.mikolaivska_string'))}
              data-region={t('deliveryPage.mikolaivska_region')}
              onClick={addDeliveryLink}
              title={t('deliveryPage.mikolaivska_title')}
            >
              {t('deliveryPage.tyre')} в {t('deliveryPage.mikolaivska_obl')}
            </a>
          </li>
          <li>
            <a href={DELIVERY_GOODS_ROUTE + '/' + 
              createStringUrl(t('deliveryPage.odeska_string'))}
              data-region={t('deliveryPage.odeska_region')}
              onClick={addDeliveryLink}
              title={t('deliveryPage.odeska_title')}
            >
              {t('deliveryPage.tyre')} в {t('deliveryPage.odeska_obl')}
            </a>
          </li>
          <li>
            <a href={DELIVERY_GOODS_ROUTE + '/' + 
              createStringUrl(t('deliveryPage.poltavska_string'))}
              data-region={t('deliveryPage.poltavska_region')}
              onClick={addDeliveryLink}
              title={t('deliveryPage.poltavska_title')}
            >
              {t('deliveryPage.tyre')} в {t('deliveryPage.poltavska_obl')}
            </a>
          </li>
        </ul>
        <ul className='deliveryPageRegionListUl'>
          <li>
            <a href={DELIVERY_GOODS_ROUTE + '/' + 
              createStringUrl(t('deliveryPage.rivenska_string'))}
              data-region={t('deliveryPage.rivenska_region')}
              onClick={addDeliveryLink}
              title={t('deliveryPage.rivenska_title')}
            >
              {t('deliveryPage.tyre')} в {t('deliveryPage.rivenska_obl')}
            </a>
          </li>
          <li>
            <a href={DELIVERY_GOODS_ROUTE + '/' + 
              createStringUrl(t('deliveryPage.sumska_string'))}
              data-region={t('deliveryPage.sumska_region')}
              onClick={addDeliveryLink}
              title={t('deliveryPage.sumska_title')}
            >
              {t('deliveryPage.tyre')} в {t('deliveryPage.sumska_obl')}
            </a>
          </li>
          <li>
            <a href={DELIVERY_GOODS_ROUTE + '/' + 
              createStringUrl(t('deliveryPage.ternopilska_string'))}
              data-region={t('deliveryPage.ternopilska_region')}
              onClick={addDeliveryLink}
              title={t('deliveryPage.ternopilska_title')}
            >
              {t('deliveryPage.tyre')} в {t('deliveryPage.ternopilska_obl')}
            </a>
          </li>
          <li>
            <a href={DELIVERY_GOODS_ROUTE + '/' + 
              createStringUrl(t('deliveryPage.kharkiv_string'))}
              data-region={t('deliveryPage.kharkiv_region')}
              onClick={addDeliveryLink}
              title={t('deliveryPage.kharkiv_title')}
            >
              {t('deliveryPage.tyre')} в {t('deliveryPage.kharkiv_obl')}
            </a>
          </li>
          <li>
            <a href={DELIVERY_GOODS_ROUTE + '/' + 
              createStringUrl(t('deliveryPage.kherson_string'))}
              data-region={t('deliveryPage.kherson_region')}
              onClick={addDeliveryLink}
              title={t('deliveryPage.kherson_title')}
            >
              {t('deliveryPage.tyre')} в {t('deliveryPage.kherson_obl')}
            </a>
          </li>
          <li>
            <a href={DELIVERY_GOODS_ROUTE + '/' + 
              createStringUrl(t('deliveryPage.khmeln_string'))}
              data-region={t('deliveryPage.khmeln_region')}
              onClick={addDeliveryLink}
              title={t('deliveryPage.khmeln_title')}
            >
              {t('deliveryPage.tyre')} в {t('deliveryPage.khmeln_obl')}
            </a>
          </li>
          <li>
            <a href={DELIVERY_GOODS_ROUTE + '/' + 
              createStringUrl(t('deliveryPage.cherkas_string'))}
              data-region={t('deliveryPage.cherkas_region')}
              onClick={addDeliveryLink}
              title={t('deliveryPage.cherkas_title')}
            >
              {t('deliveryPage.tyre')} в {t('deliveryPage.cherkas_obl')}
            </a>
          </li>
          <li>
            <a href={DELIVERY_GOODS_ROUTE + '/' + 
              createStringUrl(t('deliveryPage.chernivec_string'))}
              data-region={t('deliveryPage.chernivec_region')}
              onClick={addDeliveryLink}
              title={t('deliveryPage.chernivec_title')}
            >
              {t('deliveryPage.tyre')} в {t('deliveryPage.chernivec_obl')}
            </a>
          </li>
          <li>
            <a href={DELIVERY_GOODS_ROUTE + '/' + 
              createStringUrl(t('deliveryPage.chernigiv_string'))}
              data-region={t('deliveryPage.chernigiv_region')}
              onClick={addDeliveryLink}
              title={t('deliveryPage.chernigiv_title')}
            >
              {t('deliveryPage.tyre')} в {t('deliveryPage.chernigiv_obl')}
            </a>
          </li>
        </ul>
      </div>
      : null
      }
      </div>
      </div>
      <div className='fDev'>
        <ReviewsMain 
          props={t('deliveryPage.review_customers')} 
          prevBtnAction={prevBtnReviewGoods} 
          nextBtnAction={nextBtnReviewGoods}    
          buttonPosition={{
            prevBtnLeft: reviewGoodsData?.length !== 0 ? -7 : undefined, 
            prevTop: reviewGoodsData?.length !== 0 ? -110 : undefined, 
            nextBtnRight: reviewGoodsData?.length !== 0 ? -95 : undefined,  
            nextTop: reviewGoodsData?.length !== 0 ? -110 : undefined, 
          }}      
        >
          <div >
          {reviewGoodsData?.length !== 0 ? 
            reviewGoodsData?.map((item: any) =>
            <div key={item.id_review_store + '_review'}>
              <ReviewsGoods 
                productFullName={item?.tyres?.full_name} 
                rating={[item.rating]} 
                reviewEntity={item} 
                reviewExtend={false} 
                btnLeft={undefined} 
                btnRight={undefined}
              />
            </div>
            )
            : 
            <div className='mainAfterReviews' >
              <a className='mainLinkReview'
                href='/review'>{t('deliveryPage.look_at_all_review')}
              </a>
            </div>
          }
          </div>
        </ReviewsMain>
      </div>
      </Suspense>
    </div>
  )
}

export default DeliveryGoodsPage;