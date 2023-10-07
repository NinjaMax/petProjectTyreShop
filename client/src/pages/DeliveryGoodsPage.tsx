import React, { useContext, useEffect, useState } from 'react';
import '../css/Pages/DeliveryGoodsPage.css';
import BreadCrumbs from '../components/BreadCrumbs';
import FilterCatalogTyres from '../components/filterCatalog/FilterCatalogTyres';
import CatalogTyres from '../components/catalogs/CatalogTyres';
import ReviewsMain from '../components/reviews/ReviewsMain';
import ReviewsGoods from '../components/reviews/ReviewsGoods';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { Context } from '../context/Context';
import { createStringUrl } from '../services/stringUrl';
import { CATALOG_TYRES_ROUTE, DELIVERY_GOODS_ROUTE } from '../utils/consts';
import { yieldToMain } from '../restAPI/postTaskAdmin';
import { tyreSeasonCat, tyreVehicleTypeCat } from '../services/tyresCatService';
import { getTyresCountAll, getTyresReviewLimit, getTyresWithoutOffset } from '../restAPI/restGoodsApi';
import MapDelivery from '../components/maps/MapDelivery';
import { getCityInRegionNovaPoshta, getCityNovaPoshta, getWareHousesNovaPoshta } from '../restAPI/restNovaPoshtaAPI';
import {regionDelivery, regionNovaPoshata} from '../services/regionServiceDelivery';
import SpinnerCarRot from '../components/spinners/SpinnerCarRot';

type ICityMarkerData = {
  Area: string,
  AreaDescription: string,
  AreaDescriptionRu: string,
  AreaDescriptionTranslit: string,
  Delivery1: string,
  Delivery2: string,
  Delivery3: string,
  Delivery4: string,
  Delivery5: string,
  Delivery6: string,
  Delivery7: string,
  Description: string,
  DescriptionRu: string,
  DescriptionTranslit: string,
  Index1: string,
  Index2: string,
  IndexCOATSU1: string,
  Latitude: string,
  Longitude: string,
  Ref: string,
  Region: string,
  RegionsDescription: string,
  RegionsDescriptionRu: string,
  RegionsDescriptionTranslit: string,
  SettlementType: string,
  SettlementTypeDescription: string,
  SettlementTypeDescriptionRu: string,
  SettlementTypeDescriptionTranslit: string,
  SpecialCashCheck:number,
  Warehouse: string,
};


const DeliveryGoodsPage = () => {
  const {goodsTyre, goodsWheel, filter} = useContext<any | null>(Context);
  const {page} = useContext<any | null>(Context);
  const params = useParams<any>();
  const location = useLocation();
  const history = useHistory();
  const [reviewGoodsData, setReviewGoodsData] = useState<any[] | null>();
  const [prevBtnReview, setPrevBtnReview] = useState<number>(0);
  const [nextBtnReview, setNextBtnReview] = useState<number>(0);
  const [cityRegion, setCityRegion] = useState<string>();
  const [cityMarkerData, setCityMarkerData] = useState<ICityMarkerData>();
  const [novaPoshtaRegion, setNovaPoshtaRegion] = useState<string>();
  const [novaPoshtaCityInRegion, setNovaPoshtaCityInRegion] = useState<any[] | null>();
  const [novaPoshtaWareHouseList, setNovaPoshtaWareHouseList] = useState<any[] | null>();
  const [markerState, setMarkerState] = useState<string | null>();
  const [deliveryWareHouseList, setDeliveryWareHouseList] = useState<any[] | null>();
  const [deliveryDepart, setDeliveryDepart] = useState<any[] | null>();
  const [deliveryRegion, setDeliveryRegion] = useState<string | number>();
  const [stateFilter, setStateFilter]=useState<boolean>(false);
  const [region, setRegion] = useState<string>();
  
  useEffect(() => {
    let isMounted = false;
    const loadMaintask = async() => {
      const taskLoad: any[] = [
        getTyresWithoutOffset,  
        getTyresCountAll,
        getTyresReviewLimit,

        
      ];
      // if (localStorage.getItem('filterTyreUrl')) {
      //   const getMainFilterItem = localStorage.getItem('filterTyreUrl')?.split('/');
      //   if (getMainFilterItem![0]) {
      //     filter.setSeason(getMainFilterItem![0]);
      //     if (getMainFilterItem![0]?.includes(',')) {
      //       filter.setChipSeason(
      //         Array.from(new Set([...getMainFilterItem![0]?.split(',')]))
      //       ); 
      //     } else {
      //       filter.setChipSeason(
      //         Array.from(new Set([...filter.chipSeason, getMainFilterItem![0]]))
      //       ); 
      //     }
      //   }
      //   if (getMainFilterItem![1]) {
      //     filter.setBrands(getMainFilterItem![1]);
      //     if (getMainFilterItem![1]?.includes(',')) {
      //       filter.setChipBrands(
      //         Array.from(new Set([...getMainFilterItem![1]?.split(',')]))
      //       );
      //     } else {
      //       filter.setChipBrands(
      //         Array.from(new Set([...filter.chipBrands, getMainFilterItem![1]]))
      //       );
      //     }
      //   }
      //   if (getMainFilterItem![2]) {
      //     filter.setWidth(getMainFilterItem![2]);
      //     filter.setChipWidth(
      //       Array.from(new Set([...filter.chipWidth, getMainFilterItem![2]]))
      //     );
      //   }
      //   if (getMainFilterItem![3]) {
      //     filter.setHeight(getMainFilterItem![3]);
      //     filter.setChipHeight(
      //       Array.from(new Set([...filter.chipHeight, getMainFilterItem![3]]))
      //     );
      //   }
      //   if (getMainFilterItem![4]) {
      //     filter.setDiameter(getMainFilterItem![4]);
      //     filter.setChipDiameter(
      //       Array.from(new Set([...filter.chipDiameter, getMainFilterItem![4]]))
      //     );
      //   }
      //   localStorage.removeItem('filterTyreUrl');
      // }

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

          let setWidthFilter: any[] = [];
          let setHightFilter: any[] = [];
          let setDiameterFilter: any[] = [];
          let setBrandFilter: any[] = [];
          let setSeasonFilter: any[] = [];
          let setVehicleTypeFilter: any[] = [];
          let setSpeedIndexFilter: any[] = [];
          let setLoadIndexFilter: any[] = [];
          let setHomologationFilter: any[] = [];
          let setReinforcedFilter: any[] = [];
          let setRunFlatFilter: any[] = [];
          let setStuddedFilter: any[] = [];
        
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
          page.loadMore > 0  ? goodsTyre?.setTyres(
            [...goodsTyre._tyres, 
              ...tyreFilterGoods.splice(page.offset, page.limit)] 
            ) : goodsTyre?.setTyres(
              tyreFilterGoods.splice(page.offset, page.limit));

          if (filter.width) {
            goodsTyre?.setWidth(
              Array.from(new Set(
                [...goodsTyre._width, ...setWidthFilter]
              )).sort(
                (a: any, b: any) => a.localeCompare(b))
            );
            filter.setWidthSearch(goodsTyre._width);
          } 
          else {
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
          } 
          else {
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
            );
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
          goodsTyre?.setTotalCount(tyreTotalCount);
          //console.log('SET_TYRES_TOTALCOUNT: ', tyreTotalCount);
        }
        if(!isMounted && taskLoad[i] === getTyresReviewLimit 
          //location.pathname.includes('tyres')
          ) {
          let getReviewTyres: any = await taskLoad[i](
            1,
            nextBtnReview
          );
          if (getReviewTyres) {
            setReviewGoodsData(getReviewTyres);
          }
        }
        // if(!isMounted && taskLoad[i] === getTyresReviewLimit 
        //   //location.pathname.includes('tyres')
        //   ) {
        //   let getReviewTyres: any = await taskLoad[i](
        //     1,
        //     nextBtnReview
        //   );
        //   if (getReviewTyres) {
        //     setReviewGoodsData(getReviewTyres);
        //   }
        // }
        const task = taskLoad.shift();
        task();
        await yieldToMain(); 
      }
      // if (params.season && !filter.season && filter.chipSeason.length === 0 ) {
      //   const tyreCatSeason = tyreSeasonCat(params.season);
      //   if (tyreCatSeason) {
      //     filter.setSeason(tyreCatSeason);
      //     filter.setChipSeason(
      //       Array.from(new Set([...filter.chipSeason, tyreCatSeason]))
      //     ); 
      //   }
      // }
      // if (params.season && !filter.studded && filter.chipStudded.length === 0 ) {
      //   const tyreStudded = goodsTyre._studded?.find(
      //     (studded:string) => 
      //     createStringUrl(studded.toLocaleLowerCase()) === params.season);
      //   if (tyreStudded) {
      //     filter.setStudded(tyreStudded);
      //     filter.setChipStudded(
      //       Array.from(new Set([...filter.chipStudded, tyreStudded]))
      //     ); 
      //   }
      // }
      // if (params.studded && !filter.studded && filter.chipStudded.length === 0 ) {
      //   const tyreStudded = goodsTyre._studded?.find(
      //     (studded:string) => 
      //     createStringUrl(studded.toLocaleLowerCase()) === params.studded);
      //   if (tyreStudded) {
      //     filter.setStudded(tyreStudded);
      //     filter.setChipStudded(
      //       Array.from(new Set([...filter.chipStudded, tyreStudded]))
      //     ); 
      //   }
      // }
      // if (params.season && !filter.vehicle_type && filter.chipVehicleType.length === 0) {
      //   const tyreCatType = tyreVehicleTypeCat(params.season);
      //   if (tyreCatType) {
      //     filter.setVehicleType(tyreCatType);
      //     filter.setChipVehicleType(
      //       Array.from(new Set([...filter.chipVehicleType, tyreCatType]))
      //     );  
      //   }
      // }
      // if (params.studded && !filter.vehicle_type && filter.chipVehicleType.length === 0) {
      //   const tyreCatType = tyreVehicleTypeCat(params.studded);
      //   if (tyreCatType) {
      //     filter.setVehicleType(tyreCatType);
      //     filter.setChipVehicleType(
      //       Array.from(new Set([...filter.chipVehicleType, tyreCatType]))
      //     ); 
      //   }
      // }
      // if (params.type && !filter.vehicle_type && filter.chipVehicleType.length === 0) {
      //   const tyreCatType = tyreVehicleTypeCat(params.type);
      //   if (tyreCatType) {
      //     filter.setVehicleType(tyreCatType);
      //     filter.setChipVehicleType(
      //       Array.from(new Set([...filter.chipVehicleType, tyreCatType]))
      //     );     
      //   }
      // }
      // if (params.season && !filter.brands && filter.chipBrands.length === 0) {
      //   const findBrands = goodsTyre._brands?.find(
      //     (brands:string) => 
      //     createStringUrl(brands.toLocaleLowerCase()) === params.season);
      //   if (findBrands) {
      //     filter.setBrands(findBrands);
      //     filter.setChipBrands(
      //       Array.from(new Set([...filter.chipBrands, findBrands]))
      //     );
      //   }
      // }
      // if (params.studded && !filter.brands && filter.chipBrands.length === 0) {
      //   const findBrandsInStudded = goodsTyre._brands?.find(
      //     (brands:string) => 
      //     createStringUrl(brands.toLocaleLowerCase()) === params.studded);
      //   if (findBrandsInStudded) {
      //     filter.setBrands(findBrandsInStudded);
      //     filter.setChipBrands(
      //       Array.from(new Set([...filter.chipBrands, findBrandsInStudded]))
      //     );
      //   }
      // }
      // if (params.type && !filter.brands && filter.chipBrands.length === 0) {
      //   const findBrandsInType = goodsTyre._brands?.find(
      //     (brands:string) => 
      //     createStringUrl(brands.toLocaleLowerCase()) === params.type);
      //   if (findBrandsInType) {
      //     filter.setBrands(findBrandsInType);
      //     filter.setChipBrands(
      //       Array.from(new Set([...filter.chipBrands, findBrandsInType]))
      //     );
      //   }
      // }
      // if (params.brands && !filter.brands && filter.chipBrands.length === 0) {
      //   const findBrand = goodsTyre._brands?.find(
      //     (brands:string) => 
      //     createStringUrl(brands.toLocaleLowerCase()) === params.brands);
      //   if (findBrand) {
      //     filter.setBrands(findBrand);
      //     filter.setChipBrands(
      //       Array.from(new Set([...filter.chipBrands, findBrand]))
      //     );
      //   }
      // }
      // if (params.season?.includes('w') && !filter.width && filter.chipWidth.length === 0 ) {
      //   const findWidth = goodsTyre._width?.find((width:string) => width === params.season?.slice(1, params.season?.length));
      //   if (findWidth) {
      //     filter.setWidth(findWidth);
      //     filter.setChipWidth(
      //       Array.from(new Set([...filter.chipWidth, findWidth]))
      //     );
      //   }
      // }
      // if (params.studded?.includes('w') && !filter.width && filter.chipWidth.length === 0 ) {
      //   const findWidthInStudded = goodsTyre._width?.find((width:string) => width === params.studded?.slice(1, params.studded?.length));
      //   if (findWidthInStudded) {
      //     filter.setWidth(findWidthInStudded);
      //     filter.setChipWidth(
      //       Array.from(new Set([...filter.chipWidth, findWidthInStudded]))
      //     );
      //   }
      // }
      // if (params.type?.includes('w') && !filter.width && filter.chipWidth.length === 0 ) {
      //   const findWidthInType = goodsTyre._width?.find((width:string) => width === params.type?.slice(1, params.type?.length));
      //   if (findWidthInType) {
      //     filter.setWidth(findWidthInType);
      //     filter.setChipWidth(
      //       Array.from(new Set([...filter.chipWidth, findWidthInType]))
      //     );
      //   }
      // }
      // if (params.brands?.includes('w') && !filter.width && filter.chipWidth.length === 0 ) {
      //   const findWidthInBrand = goodsTyre._width?.find((width:string) => width === params.brands?.slice(1, params.brands?.length));
      //   if (findWidthInBrand) {
      //     filter.setWidth(findWidthInBrand);
      //     filter.setChipWidth(
      //       Array.from(new Set([...filter.chipWidth, findWidthInBrand]))
      //     );
      //   }
      // }
      // if (params.width?.includes('w') && !filter.width && filter.chipWidth.length === 0 ) {
      //   const findWidth = goodsTyre._width?.find((width:string) => width === params.width?.slice(1, params.width?.length));
      //   if (findWidth) {
      //     filter.setWidth(findWidth);
      //     filter.setChipWidth(
      //       Array.from(new Set([...filter.chipWidth, findWidth]))
      //     );
      //   }
      // }
      // if (params.season?.includes('h') && !filter.height && filter.chipHeight.length === 0) {
      //   const findHeight = goodsTyre._height?.find((height:string) => height === params.season?.slice(1, params.season?.length));
      //   if (findHeight) {
      //     filter.setHeight(findHeight);
      //     filter.setChipHeight(
      //       Array.from(
      //         new Set([...filter.chipHeight, findHeight]))
      //     );
      //   }
      // }
      // if (params.studded?.includes('h') && !filter.height && filter.chipHeight.length === 0) {
      //   const findHeightInStudded = goodsTyre._height?.find((height:string) => height === params.studded?.slice(1, params.studded?.length));
      //   if (findHeightInStudded) {
      //     filter.setHeight(findHeightInStudded);
      //     filter.setChipHeight(
      //       Array.from(new Set([...filter.chipHeight, findHeightInStudded]))
      //     );
      //   }
      // }
      // if (params.type?.includes('h') && !filter.height && filter.chipHeight.length === 0) {
      //   const findHeightInType = goodsTyre._height?.find((height:string) => height === params.type?.slice(1, params.type?.length));
      //   if (findHeightInType) {
      //     filter.setHeight(findHeightInType);
      //     filter.setChipHeight(
      //       Array.from(new Set([...filter.chipHeight, findHeightInType]))
      //     );
      //   }
      // }
      // if (params.brands?.includes('h') && !filter.height && filter.chipHeight.length === 0) {
      //   const findHeightInBrand = goodsTyre._height?.find((height:string) => height === params.brands?.slice(1, params.brands?.length));
      //   if (findHeightInBrand) {
      //     filter.setHeight(findHeightInBrand);
      //     filter.setChipHeight(
      //       Array.from(new Set([...filter.chipHeight, findHeightInBrand]))
      //     );
      //   }
      // }
      // if (params.width?.includes('h') && !filter.height && filter.chipHeight.length === 0) {
      //   const findHeightInBrand = goodsTyre._height?.find((height:string) => height === params.width?.slice(1, params.width?.length));
      //   if (findHeightInBrand) {
      //     filter.setHeight(findHeightInBrand);
      //     filter.setChipHeight(
      //       Array.from(new Set([...filter.chipHeight, findHeightInBrand]))
      //     );
      //   }
      // }
      // if (params.height?.includes('h') && !filter.height && filter.chipHeight.length === 0) {
      //   const findHeight = goodsTyre._height?.find((height:string) => height === params.height?.slice(1, params.height?.length));
      //   if (findHeight) {
      //     filter.setHeight(findHeight);
      //     filter.setChipHeight(
      //       Array.from(new Set([...filter.chipHeight, findHeight]))
      //     );
      //   }
      // }
      // if (params.season?.includes('r') && !filter.diameter && filter.chipDiameter.length === 0) {
      //   const findDiameter = goodsTyre._diameter?.find(
      //     (diameter:string) => 
      //     diameter === params.season?.slice(1, params.season?.length));
      //   if (findDiameter) {
      //     filter.setDiameter(findDiameter);
      //     filter.setChipDiameter(
      //       Array.from(
      //         new Set([...filter.chipDiameter, findDiameter]))
      //     );
      //   }
      // }
      // if (params.studded?.includes('r') && !filter.diameter && filter.chipDiameter.length === 0) {
      //   const findDiameterInType = goodsTyre._diameter?.find(
      //     (diameter:string) => 
      //     diameter === params.studded?.slice(1, params.studded?.length));
      //   if (findDiameterInType) {
      //     filter.setDiameter(findDiameterInType);
      //     filter.setChipDiameter(
      //       Array.from(new Set([...filter.chipDiameter, findDiameterInType]))
      //     );
      //   }
      // }
      // if (params.type?.includes('r') && !filter.diameter && filter.chipDiameter.length === 0) {
      //   const findDiameterInType = goodsTyre._diameter?.find(
      //     (diameter:string) => 
      //     diameter === params.type?.slice(1, params.type?.length));
      //   if (findDiameterInType) {
      //     filter.setDiameter(findDiameterInType);
      //     filter.setChipDiameter(
      //       Array.from(new Set([...filter.chipDiameter, findDiameterInType]))
      //     );
      //   }
      // }
      // if (params.brands?.includes('r') && !filter.diameter && filter.chipDiameter.length === 0) {
      //   const findDiameterInBrand = goodsTyre._diameter?.find(
      //     (diameter:string) => 
      //     diameter === params.brands?.slice(1, params.brands?.length));
      //   if (findDiameterInBrand) {
      //     filter.setDiameter(findDiameterInBrand);
      //     filter.setChipDiameter(
      //       Array.from(new Set([...filter.chipDiameter, findDiameterInBrand]))
      //     );
      //   }
      // }
      // if (params.width?.includes('r') && !filter.diameter && filter.chipDiameter.length === 0) {
      //   const findDiameterInBrand = goodsTyre._diameter?.find(
      //     (diameter:string) => 
      //     diameter === params.width?.slice(1, params.width?.length));
      //   if (findDiameterInBrand) {
      //     filter.setDiameter(findDiameterInBrand);
      //     filter.setChipDiameter(
      //       Array.from(new Set([...filter.chipDiameter, findDiameterInBrand]))
      //     );
      //   }
      // }
      // if (params.height?.includes('r') && !filter.diameter && filter.chipDiameter.length === 0) {
      //   const findDiameterInBrand = goodsTyre._diameter?.find(
      //     (diameter:string) => 
      //     diameter === params.height?.slice(1, params.height?.length));
      //   if (findDiameterInBrand) {
      //     filter.setDiameter(findDiameterInBrand);
      //     filter.setChipDiameter(
      //       Array.from(new Set([...filter.chipDiameter, findDiameterInBrand]))
      //     );
      //   }
      // }
      // if (params.diameter?.includes('r') && !filter.diameter && filter.chipDiameter.length === 0) {
      //   const findDiameter = goodsTyre._diameter?.find(
      //     (diameter:string) => 
      //     diameter === params.diameter?.slice(1, params.height?.length));
      //   if (findDiameter) {
      //     filter.setDiameter(findDiameter);
      //     filter.setChipDiameter(
      //       Array.from(new Set([...filter.chipDiameter, findDiameter]))
      //     );
      //   }
      // }
      // if (params.season?.includes('li-') && !filter.load_index && filter.chipLoadIndex.length === 0) {
      //   const findLoadIndex = goodsTyre._load_index?.find(
      //     (load_index_with_desc:string) => 
      //     createStringUrl(load_index_with_desc.toLocaleLowerCase()) === params.season?.slice(3, params.season?.length));
      //   if (findLoadIndex) {
      //     filter.setLoadIndex(findLoadIndex);
      //     filter.setChipLoadIndex(
      //       Array.from(new Set([...filter.chipLoadIndex, findLoadIndex]))
      //     );
      //   }
      // }
      // if (params.studded?.includes('li-') && !filter.load_index && filter.chipLoadIndex.length === 0) {
      //   const findBrandsInStudded = goodsTyre._load_index?.find(
      //     (load_index_with_desc:string) => 
      //     createStringUrl(load_index_with_desc.toLocaleLowerCase()) === params.studded?.slice(3, params.studded?.length));
      //   if (findBrandsInStudded) {
      //     filter.setLoadIndex(findBrandsInStudded);
      //     filter.setChipLoadIndex(
      //       Array.from(new Set([...filter.chipLoadIndex, findBrandsInStudded]))
      //     );
      //   }
      // }
      // if (params.type?.includes('li-') && !filter.load_index && filter.chipLoadIndex.length === 0) {
      //   const findBrandsInType = goodsTyre._load_index?.find(
      //     (load_index_with_desc:string) => 
      //     createStringUrl(load_index_with_desc.toLocaleLowerCase()) === params.type?.slice(3, params.type?.length));
      //   if (findBrandsInType) {
      //     filter.setLoadIndex(findBrandsInType);
      //     filter.setChipLoadIndex(
      //       Array.from(new Set([...filter.chipLoadIndex, findBrandsInType]))
      //     );
      //   }
      // }
      // if (params.brands?.includes('li-') && !filter.load_index && filter.chipLoadIndex.length === 0) {
      //   const findBrand = goodsTyre._load_index?.find(
      //     (load_index_with_desc:string) => 
      //     createStringUrl(load_index_with_desc.toLocaleLowerCase()) === params.brands?.slice(3, params.brands?.length));
      //   if (findBrand) {
      //     filter.setLoadIndex(findBrand);
      //     filter.setChipLoadIndex(
      //       Array.from(new Set([...filter.chipLoadIndex, findBrand]))
      //     );
      //   }
      // }
      // if (params.width?.includes('li-') && !filter.load_index && filter.chipLoadIndex.length === 0) {
      //   const findLoadIndexWidth = goodsTyre._load_index?.find(
      //     (load_index_with_desc:string) => 
      //     createStringUrl(load_index_with_desc.toLocaleLowerCase()) === params.width?.slice(3, params.width?.length));
      //   if (findLoadIndexWidth) {
      //     filter.setLoadIndex(findLoadIndexWidth);
      //     filter.setChipLoadIndex(
      //       Array.from(new Set([...filter.chipLoadIndex, findLoadIndexWidth]))
      //     );
      //   }
      // }
      // if (params.height?.includes('li-') && !filter.load_index && filter.chipLoadIndex.length === 0) {
      //   const findLoadIndexHeight = goodsTyre._load_index?.find(
      //     (load_index_with_desc:string) => 
      //     createStringUrl(load_index_with_desc.toLocaleLowerCase()) === params.height?.slice(3, params.height?.length));
      //   if (findLoadIndexHeight) {
      //     filter.setLoadIndex(findLoadIndexHeight);
      //     filter.setChipLoadIndex(
      //       Array.from(new Set([...filter.chipLoadIndex, findLoadIndexHeight]))
      //     );
      //   }
      // }
      // if (params.diameter?.includes('li-') && !filter.load_index && filter.chipLoadIndex.length === 0) {
      //   const findLoadIndexBrand = goodsTyre._load_index?.find(
      //     (load_index_with_desc:string) => 
      //     createStringUrl(load_index_with_desc.toLocaleLowerCase()) === params.diameter?.slice(3, params.diameter?.length));
      //   if (findLoadIndexBrand) {
      //     filter.setLoadIndex(findLoadIndexBrand);
      //     filter.setChipLoadIndex(
      //       Array.from(new Set([...filter.chipLoadIndex, findLoadIndexBrand]))
      //     );
      //   }
      // }
      // if (params.loadindex?.includes('li-') && !filter.load_index && filter.chipLoadIndex.length === 0) {
      //   const findLoadIndex = goodsTyre._load_index?.find(
      //     (load_index_with_desc:string) => 
      //     createStringUrl(load_index_with_desc.toLocaleLowerCase()) === params.loadindex?.slice(3, params.loadindex?.length));
      //   if (findLoadIndex) {
      //     filter.setLoadIndex(findLoadIndex);
      //     filter.setChipLoadIndex(
      //       Array.from(new Set([...filter.chipLoadIndex, findLoadIndex]))
      //     );
      //   }
      // }
      // if (params.season?.includes('si-') && !filter.speed_index && filter.chipSpeedIndex.length === 0) {
      //   const findSpeedIndex = goodsTyre._speed_index?.find(
      //     (speed_index_with_desc:string) => 
      //     createStringUrl(speed_index_with_desc.toLocaleLowerCase()) === params.season?.slice(3, params.season?.length));
      //   if (findSpeedIndex) {
      //     filter.setSpeedIndex(findSpeedIndex);
      //     filter.setChipSpeedIndex(
      //       Array.from(new Set([...filter.chipSpeedIndex, findSpeedIndex]))
      //     );
      //   }
      // }
      // if (params.studded?.includes('si-') && !filter.speed_index && filter.chipSpeedIndex.length === 0) {
      //   const findSpeedIndexStudded = goodsTyre._speed_index?.find(
      //     (speed_index_with_desc:string) => 
      //     createStringUrl(speed_index_with_desc.toLocaleLowerCase()) === params.studded?.slice(3, params.studded?.length));
      //   if (findSpeedIndexStudded) {
      //     filter.setSpeedIndex(findSpeedIndexStudded);
      //     filter.setChipSpeedIndex(
      //       Array.from(new Set([...filter.chipSpeedIndex, findSpeedIndexStudded]))
      //     );
      //   }
      // }
      // if (params.type?.includes('si-') && !filter.speed_index && filter.chipSpeedIndex.length === 0) {
      //   const findSpeedIndexInType = goodsTyre._speed_index?.find(
      //     (speed_index_with_desc:string) => 
      //     createStringUrl(speed_index_with_desc.toLocaleLowerCase()) === params.type?.slice(3, params.type?.length));
      //   if (findSpeedIndexInType) {
      //     filter.setSpeedIndex(findSpeedIndexInType);
      //     filter.setChipSpeedIndex(
      //       Array.from(new Set([...filter.chipSpeedIndex, findSpeedIndexInType]))
      //     );
      //   }
      // }
      // if (params.brands?.includes('si-') && !filter.speed_index && filter.chipSpeedIndex.length === 0) {
      //   const findSpeedIndexBrand = goodsTyre._speed_index?.find(
      //     (speed_index_with_desc:string) => 
      //     createStringUrl(speed_index_with_desc.toLocaleLowerCase()) === params.brands?.slice(3, params.brands?.length));
      //   if (findSpeedIndexBrand) {
      //     filter.setSpeedIndex(findSpeedIndexBrand);
      //     filter.setChipSpeedIndex(
      //       Array.from(new Set([...filter.chipSpeedIndex, findSpeedIndexBrand]))
      //     );
      //   }
      // }
      // if (params.width?.includes('si-') && !filter.speed_index && filter.chipSpeedIndex.length === 0) {
      //   const findSpeedIndexWidth = goodsTyre._speed_index?.find(
      //     (speed_index_with_desc:string) => 
      //     createStringUrl(speed_index_with_desc.toLocaleLowerCase()) === params.width?.slice(3, params.width?.length));
      //   if (findSpeedIndexWidth) {
      //     filter.setSpeedIndex(findSpeedIndexWidth);
      //     filter.setChipSpeedIndex(
      //       Array.from(new Set([...filter.chipSpeedIndex, findSpeedIndexWidth]))
      //     );
      //   }
      // }
      // if (params.height?.includes('si-') && !filter.speed_index && filter.chipSpeedIndex.length === 0) {
      //   const findSpeedIndexHeight = goodsTyre._speed_index?.find(
      //     (speed_index_with_desc:string) => 
      //     createStringUrl(speed_index_with_desc.toLocaleLowerCase()) === params.height?.slice(3, params.height?.length));
      //   if (findSpeedIndexHeight) {
      //     filter.setSpeedIndex(findSpeedIndexHeight);
      //     filter.setChipSpeedIndex(
      //       Array.from(new Set([...filter.chipSpeedIndex, findSpeedIndexHeight]))
      //     );
      //   }
      // }
      // if (params.diameter?.includes('si-') && !filter.speed_index && filter.chipSpeedIndex.length === 0) {
      //   const findSpeedIndexDiameter = goodsTyre._speed_index?.find(
      //     (speed_index_with_desc:string) => 
      //     createStringUrl(speed_index_with_desc.toLocaleLowerCase()) === params.diameter?.slice(3, params.diameter?.length));
      //   if (findSpeedIndexDiameter) {
      //     filter.setSpeedIndex(findSpeedIndexDiameter);
      //     filter.setChipSpeedIndex(
      //       Array.from(new Set([...filter.chipSpeedIndex, findSpeedIndexDiameter]))
      //     );
      //   }
      // }
      // if (params.loadindex?.includes('si-') && !filter.speed_index && filter.chipSpeedIndex.length === 0) {
      //   const findSpeedIndexLoad = goodsTyre._speed_index?.find(
      //     (speed_index_with_desc:string) => 
      //     createStringUrl(speed_index_with_desc.toLocaleLowerCase()) === params.loadindex?.slice(3, params.loadindex?.length));
      //   if (findSpeedIndexLoad) {
      //     filter.setSpeedIndex(findSpeedIndexLoad);
      //     filter.setChipSpeedIndex(
      //       Array.from(new Set([...filter.chipSpeedIndex, findSpeedIndexLoad]))
      //     );
      //   }
      // }
      // if (params.speedindex?.includes('si-') && !filter.speed_index && filter.chipSpeedIndex.length === 0) {
      //   const findSpeedIndex = goodsTyre._speed_index?.find(
      //     (speed_index_with_desc:string) => 
      //     createStringUrl(speed_index_with_desc.toLocaleLowerCase()) === params.speedindex?.slice(3, params.speedindex?.length));
      //   if (findSpeedIndex) {
      //     filter.setSpeedIndex(findSpeedIndex);
      //     filter.setChipSpeedIndex(
      //       Array.from(new Set([...filter.chipSpeedIndex, findSpeedIndex]))
      //     );
      //   }
      // }
      // if (params.season?.includes('xl-') && !filter.reinforced && filter.chipReinforced.length === 0) {
      //   const findReinforcedSeason = goodsTyre._reinforced?.find(
      //     (reinforced:string) => 
      //     createStringUrl(reinforced.toLocaleLowerCase()) === params.season?.slice(3, params.season?.length));
      //   if (findReinforcedSeason) {
      //     filter.setReinforced(findReinforcedSeason);
      //     filter.setChipReinforced(
      //       Array.from(new Set([...filter.chipReinforced, findReinforcedSeason]))
      //     );
      //   }
      // }
      // if (params.studded?.includes('xl-') && !filter.reinforced && filter.chipReinforced.length === 0) {
      //   const findReinforcedStudded = goodsTyre._reinforced?.find(
      //     (reinforced:string) => 
      //     createStringUrl(reinforced.toLocaleLowerCase()) === params.studded?.slice(3, params.studded?.length));
      //   if (findReinforcedStudded) {
      //     filter.setReinforced(findReinforcedStudded);
      //     filter.setChipReinforced(
      //       Array.from(new Set([...filter.chipReinforced, findReinforcedStudded]))
      //     );
      //   }
      // }
      // if (params.type?.includes('xl-') && !filter.reinforced && filter.chipReinforced.length === 0) {
      //   const findReinforcedInType = goodsTyre._reinforced?.find(
      //     (reinforced:string) => 
      //     createStringUrl(reinforced.toLocaleLowerCase()) === params.type?.slice(3, params.type?.length));
      //   if (findReinforcedInType) {
      //     filter.setReinforced(findReinforcedInType);
      //     filter.setChipReinforced(
      //       Array.from(new Set([...filter.chipReinforced, findReinforcedInType]))
      //     );
      //   }
      // }
      // if (params.brands?.includes('xl-') && !filter.reinforced && filter.chipReinforced.length === 0) {
      //   const findReinforcedBrand = goodsTyre._reinforced?.find(
      //     (reinforced:string) => 
      //     createStringUrl(reinforced.toLocaleLowerCase()) === params.brands?.slice(3, params.brands?.length));
      //   if (findReinforcedBrand) {
      //     filter.setReinforced(findReinforcedBrand);
      //     filter.setChipReinforced(
      //       Array.from(new Set([...filter.chipReinforced, findReinforcedBrand]))
      //     );
      //   }
      // }
      // if (params.width?.includes('xl-') && !filter.reinforced && filter.chipReinforced.length === 0) {
      //   const findReinforcedWidth = goodsTyre._reinforced?.find(
      //     (reinforced:string) => 
      //     createStringUrl(reinforced.toLocaleLowerCase()) === params.width?.slice(3, params.width?.length));
      //   if (findReinforcedWidth) {
      //     filter.setReinforced(findReinforcedWidth);
      //     filter.setChipReinforced(
      //       Array.from(new Set([...filter.chipReinforced, findReinforcedWidth]))
      //     );
      //   }
      // }
      // if (params.height?.includes('xl-') && !filter.reinforced && filter.chipReinforced.length === 0) {
      //   const findReinforcedHeight = goodsTyre._reinforced?.find(
      //     (reinforced:string) => 
      //     createStringUrl(reinforced.toLocaleLowerCase()) === params.height?.slice(3, params.height?.length));
      //   if (findReinforcedHeight) {
      //     filter.setReinforced(findReinforcedHeight);
      //     filter.setChipReinforced(
      //       Array.from(new Set([...filter.chipReinforced, findReinforcedHeight]))
      //     );
      //   }
      // }
      // if (params.diameter?.includes('xl-') && !filter.reinforced && filter.chipReinforced.length === 0) {
      //   const findReinforcedDiameter = goodsTyre._reinforced?.find(
      //     (reinforced:string) => 
      //     createStringUrl(reinforced.toLocaleLowerCase()) === params.diameter?.slice(3, params.diameter?.length));
      //   if (findReinforcedDiameter) {
      //     filter.setReinforced(findReinforcedDiameter);
      //     filter.setChipReinforced(
      //       Array.from(new Set([...filter.chipReinforced, findReinforcedDiameter]))
      //     );
      //   }
      // }
      // if (params.loadindex?.includes('xl-') && !filter.reinforced && filter.chipReinforced.length === 0) {
      //   const findReinforcedLoad = goodsTyre._reinforced?.find(
      //     (reinforced:string) => 
      //     createStringUrl(reinforced.toLocaleLowerCase()) === params.loadindex?.slice(3, params.loadindex?.length));
      //   if (findReinforcedLoad) {
      //     filter.setReinforced(findReinforcedLoad);
      //     filter.setChipReinforced(
      //       Array.from(new Set([...filter.chipReinforced, findReinforcedLoad]))
      //     );
      //   }
      // }
      // if (params.speedindex?.includes('xl-') && !filter.reinforced && filter.chipReinforced.length === 0) {
      //   const findReinforcedSpeed = goodsTyre._reinforced?.find(
      //     (reinforced:string) => 
      //     createStringUrl(reinforced.toLocaleLowerCase()) === params.speedindex?.slice(3, params.speedindex?.length));
      //   if (findReinforcedSpeed) {
      //     filter.setReinforced(findReinforcedSpeed);
      //     filter.setChipReinforced(
      //       Array.from(new Set([...filter.chipReinforced, findReinforcedSpeed]))
      //     );
      //   }
      // }
      // if (params.reinforced?.includes('xl-') && !filter.reinforced && filter.chipReinforced.length === 0) {
      //   const findReinforced = goodsTyre._reinforced?.find(
      //     (reinforced:string) => 
      //     createStringUrl(reinforced.toLocaleLowerCase()) === params.reinforced?.slice(3, params.reinforced?.length));
      //   if (findReinforced) {
      //     filter.setReinforced(findReinforced);
      //     filter.setChipReinforced(
      //       Array.from(new Set([...filter.chipReinforced, findReinforced]))
      //     );
      //   }
      // }
      // if (params.season?.includes('om-') && !filter.homologation && filter.chipHomologation.length === 0) {
      //   const findOmSeason = goodsTyre._homologation?.find(
      //     (homologation:string) => 
      //     createStringUrl(homologation.toLocaleLowerCase()) === params.season?.slice(3, params.season?.length));
      //   if (findOmSeason) {
      //     filter.setHomologation(findOmSeason);
      //     filter.setChipHomologation(
      //       Array.from(new Set([...filter.chipHomologation, findOmSeason]))
      //     );
      //   }
      // }
      // if (params.studded?.includes('om-') && !filter.homologation && filter.chipHomologation.length === 0) {
      //   const findOmStudded = goodsTyre._homologation?.find(
      //     (homologation:string) => 
      //     createStringUrl(homologation.toLocaleLowerCase()) === params.studded?.slice(3, params.studded?.length));
      //   if (findOmStudded) {
      //     filter.setHomologation(findOmStudded);
      //     filter.setChipHomologation(
      //       Array.from(new Set([...filter.chipHomologation, findOmStudded]))
      //     );
      //   }
      // }
      // if (params.type?.includes('om-') && !filter.homologation && filter.chipHomologation.length === 0) {
      //   const findOmInType = goodsTyre._homologation?.find(
      //     (homologation:string) => 
      //     createStringUrl(homologation.toLocaleLowerCase()) === params.type?.slice(3, params.type?.length));
      //   if (findOmInType) {
      //     filter.setHomologation(findOmInType);
      //     filter.setChipHomologation(
      //       Array.from(new Set([...filter.chipHomologation, findOmInType]))
      //     );
      //   }
      // }
      // if (params.brands?.includes('om-') && !filter.homologation && filter.chipHomologation.length === 0) {
      //   const findOmBrand = goodsTyre._homologation?.find(
      //     (homologation:string) => 
      //     createStringUrl(homologation.toLocaleLowerCase()) === params.brands?.slice(3, params.brands?.length));
      //   if (findOmBrand) {
      //     filter.setHomologation(findOmBrand);
      //     filter.setChipHomologation(
      //       Array.from(new Set([...filter.chipHomologation, findOmBrand]))
      //     );
      //   }
      // }
      // if (params.width?.includes('om-') && !filter.homologation && filter.chipHomologation.length === 0) {
      //   const findOmWidth = goodsTyre._homologation?.find(
      //     (homologation:string) => 
      //     createStringUrl(homologation.toLocaleLowerCase()) === params.width?.slice(3, params.width?.length));
      //   if (findOmWidth) {
      //     filter.setHomologation(findOmWidth);
      //     filter.setChipHomologation(
      //       Array.from(new Set([...filter.chipHomologation, findOmWidth]))
      //     );
      //   }
      // }
      // if (params.height?.includes('om-') && !filter.homologation && filter.chipHomologation.length === 0) {
      //   const findOmHeight = goodsTyre._homologation?.find(
      //     (homologation:string) => 
      //     createStringUrl(homologation.toLocaleLowerCase()) === params.height?.slice(3, params.height?.length));
      //   if (findOmHeight) {
      //     filter.setHomologation(findOmHeight);
      //     filter.setChipHomologation(
      //       Array.from(new Set([...filter.chipHomologation, findOmHeight]))
      //     );
      //   }
      // }
      // if (params.diameter?.includes('om-') && !filter.homologation && filter.chipHomologation.length === 0) {
      //   const findOmDiameter = goodsTyre._homologation?.find(
      //     (homologation:string) => 
      //     createStringUrl(homologation.toLocaleLowerCase()) === params.diameter?.slice(3, params.diameter?.length));
      //   if (findOmDiameter) {
      //     filter.setHomologation(findOmDiameter);
      //     filter.setChipHomologation(
      //       Array.from(new Set([...filter.chipHomologation, findOmDiameter]))
      //     );
      //   }
      // }
      // if (params.loadindex?.includes('om-') && !filter.homologation && filter.chipHomologation.length === 0) {
      //   const findOmLoad = goodsTyre._homologation?.find(
      //     (homologation:string) => 
      //     createStringUrl(homologation.toLocaleLowerCase()) === params.loadindex?.slice(3, params.loadindex?.length));
      //   if (findOmLoad) {
      //     filter.setHomologation(findOmLoad);
      //     filter.setChipHomologation(
      //       Array.from(new Set([...filter.chipHomologation, findOmLoad]))
      //     );
      //   }
      // }
      // if (params.speedindex?.includes('om-') && !filter.homologation && filter.chipHomologation.length === 0) {
      //   const findOmSpeed = goodsTyre._homologation?.find(
      //     (homologation:string) => 
      //     createStringUrl(homologation.toLocaleLowerCase()) === params.speedindex?.slice(3, params.speedindex?.length));
      //   if (findOmSpeed) {
      //     filter.setHomologation(findOmSpeed);
      //     filter.setChipHomologation(
      //       Array.from(new Set([...filter.chipHomologation, findOmSpeed]))
      //     );
      //   }
      // }
      // if (params.reinforced?.includes('om-') && !filter.homologation && filter.chipHomologation.length === 0) {
      //   const findReinforcedOm = goodsTyre._homologation?.find(
      //     (homologation:string) => 
      //     createStringUrl(homologation.toLocaleLowerCase()) === params.reinforced?.slice(3, params.reinforced?.length));
      //   if (findReinforcedOm) {
      //     filter.setHomologation(findReinforcedOm);
      //     filter.setChipHomologation(
      //       Array.from(new Set([...filter.chipHomologation, findReinforcedOm]))
      //     );
      //   }
      // }
      // if (params.om?.includes('om-') && !filter.homologation && filter.chipHomologation.length === 0) {
      //   const findOm = goodsTyre._homologation?.find(
      //     (homologation:string) => 
      //     createStringUrl(homologation.toLocaleLowerCase()) === params.om?.slice(3, params.om?.length));
      //   if (findOm) {
      //     filter.setHomologation(findOm);
      //     filter.setChipHomologation(
      //       Array.from(new Set([...filter.chipHomologation, findOm]))
      //     );
      //   }
      // }
    }
    loadMaintask();
    return () => {
        isMounted = true;
    };
  },
  [ 
    filter,
    params,
    goodsTyre,
    page.limit,
    page.loadMore,
    page.offset,
    filter.filterCount,
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
    nextBtnReview,
    location.pathname,
  ]);

  useEffect(() => {
    let isMounted = false;
    const loadRegionData = async() => {
      if(!isMounted) {
        const getRegionItem = localStorage.getItem('regionData')?.split(',');
        if (getRegionItem) {
          setCityRegion(getRegionItem[0]);
          setRegion(getRegionItem[1]);
          const getRefRegionNP = regionNovaPoshata(getRegionItem[1]);
          setNovaPoshtaRegion(getRefRegionNP);
          const getRefRegionDelivery = regionDelivery(getRegionItem[1]);
          setDeliveryRegion(getRefRegionDelivery);
          console.log('GET_REGION_REF_NP: ', getRefRegionNP)
        }
        
        console.log('GET_REGION_DATA: ', getRegionItem);
      } 
      if (!isMounted && novaPoshtaRegion && cityRegion) {
        let regionCityList: any[] | null = [];
        let regionFilteredCityList: any[] | null = [];
        let cityDepartData: any[] | null = [];
        //let departLatLong: any[] | null = [];
        let getCountRegionCity: any = await getCityInRegionNovaPoshta(novaPoshtaRegion, 1);
        console.log('NOVA_POSHTA_CITY_LIST: ', getCountRegionCity?.info.totalCount);
        const countPage = Math.ceil(getCountRegionCity?.info.totalCount / 150);
        console.log('COUNT_PAGE_LIST: ', countPage);
        if (countPage > 1) {
          for (let index = 1; index <= countPage; index++) {
           console.log('INDEX: ', index);
           let getRegionCity: any = await getCityInRegionNovaPoshta(novaPoshtaRegion, index);
           regionCityList.push(...getRegionCity.data);
          }
        } else {
          let getRegionCity: any = await getCityInRegionNovaPoshta(novaPoshtaRegion, 1);
          regionCityList.push(...getRegionCity.data);
        }
        console.log('REGION_CITY_LIST_NOVAPOSHTA: ', regionCityList);
        const getCityMArkerData = regionCityList.find((item: any) => item.Description === cityRegion);
          // let getCity = await getCityNovaPoshta('Балаклія Харківська область');
        setCityMarkerData(getCityMArkerData);
        console.log('CITY_MARKER_DATA: ', getCityMArkerData);
        for (let index = 0; index < regionCityList.length; index++) {

          let getCityWareHouse = await getWareHousesNovaPoshta(
          {
            MainDescription: regionCityList[index].Description,
            DeliveryCity :''
          });
          if (getCityWareHouse.info.totalCount !== 0) {
            regionFilteredCityList.push(regionCityList[index]);
            let getCityDepart = getCityWareHouse.data.filter((item: any) => item.CityDescription === cityRegion);
            if (getCityDepart.length > 0) {
              cityDepartData.push(...getCityDepart);
            }
          }
           
        };
        // cityDepartData.map((item: any) =>
        //   departLatLong?.push([+item.Latitude, +item.Longitude])
        // );
        
        setNovaPoshtaCityInRegion([...regionFilteredCityList]);
        setNovaPoshtaWareHouseList([...cityDepartData]);
        //setNovaPoshtaDepart(departLatLong);
        
        //console.log('CITY_WAREHOUSE: ', getCityWareHouse);
        regionCityList = null;
        regionFilteredCityList = null;
        cityDepartData = null;
        //departLatLong = null;
      }     
    }
    loadRegionData();
    return () => {
        isMounted = true;
    };
  },[cityRegion, novaPoshtaRegion]);

  console.log('REGION_FILTERED_CITY_LIST: ', novaPoshtaCityInRegion);
  console.log('CITY_DEPART_NOVAPOSHTA_DATA_LIST: ', novaPoshtaWareHouseList);
  //console.log('CITY_DEPART_NOVAPOSHTA_LOCATION: ',  novaPoshtaDepart);
  // useEffect(() => {
  //   let isMounted = false;
  //   const loadDeliveryTask = async() => {
  //     const taskDeliveryLoad: any[] = [
  //       //getCityNovaPoshta,
  //       getCityInRegionNovaPoshta,
  //       //getWareHousesNovaPoshta,
        
        
  //      ];
  //     const getRegionItem = localStorage.getItem('regionData')?.split(',');
  //       if (getRegionItem) {
  //         setCityRegion(getRegionItem[0]);
  //         const getRefRegionNP = regionNovaPoshata(getRegionItem[1]);
  //         setNovaPoshtaRegion(getRefRegionNP);
  //         const getRefRegionDelivery = regionDelivery(getRegionItem[1]);
  //         setDeliveryRegion(getRefRegionDelivery);
  //         console.log('GET_REGION_REF_NP: ', getRefRegionNP)
  //       }
        
  //       console.log('GET_REGION_DATA: ', getRegionItem);


  //     let i:number = 0;
  //     while(taskDeliveryLoad.length > i) {
  //       // if(!isMounted && taskDeliveryLoad[i] === getCityNovaPoshta) {
  //       //   let tyreTotalCount: any = await taskDeliveryLoad[i](

  //       //   );
  //       //   const getMainFilterItem = localStorage.getItem('regionData')?.split(',');
  //       //   //console.log('SET_TYRES_TOTALCOUNT: ', tyreTotalCount);
  //       // }
  //       if(!isMounted && taskDeliveryLoad[i] === getCityInRegionNovaPoshta
  //         //location.pathname.includes('tyres')
  //         ) {
  //         let getReviewTyres: any = await taskDeliveryLoad[i](novaPoshtaRegion, 1);
  //         console.log('NOVA_POSHTA_CITY_LIST: ', getReviewTyres);
          
  //         // if (getReviewTyres) {
  //         //   setReviewGoodsData(getReviewTyres);
  //         // }
  //       }
  //     }
  //   }
  //   loadDeliveryTask();
  //   return () => {
  //       isMounted = true;
  //   };
  // },
  // [novaPoshtaRegion]);


  useEffect(() => {
    let isMounted = false;
    const createNewTyrePath = async() => {
      if(!isMounted) {
        if (filter.season || filter.studded || filter.vehicle_type || filter.brands || filter.width || filter.height || filter.diameter || filter.load_index || filter.speed_index || filter.reinforced || filter.homologation) {
        //if (location.pathname.includes('tyres')) {
          const toStringUrlSeason: string | undefined = createStringUrl(
            filter.season 
          );
          const toStringUrlStudded: string | undefined = createStringUrl(
            filter.studded 
          );
          const toStringUrlBrand: string | undefined = createStringUrl( 
            filter.brands
          );
          const toStringUrlTypeVehicle: string | undefined = createStringUrl( 
            filter.vehicle_type
          );
          const toStringUrlWidth: string | undefined = createStringUrl(
            filter.width
          );
          const toStringUrlHeight: string | undefined = createStringUrl(
            filter.height
          );
          const toStringUrlDiameter: string | undefined = createStringUrl(
            filter.diameter 
          );
          const toStringUrlLoadIndex: string | undefined = createStringUrl(
            filter.load_index
          );
          const toStringUrlSpeedIndex: string | undefined = createStringUrl(
            filter.speed_index
          );
          const toStringUrlReinforced: string | undefined = createStringUrl(
            filter.reinforced
          );
          const toStringUrlOm: string | undefined = createStringUrl(
            filter.homologation,
          );

          const tyreCatalogPath: string | undefined = 
          `${CATALOG_TYRES_ROUTE}${filter.season && !filter.season.includes(',') ? `/${toStringUrlSeason}` : '' }${filter.studded && !filter.studded.includes(',') ? `/${toStringUrlStudded}` : '' }${filter.vehicle_type && !filter.vehicle_type.includes(',') ? `/${toStringUrlTypeVehicle}` : ''}${filter.brands && !filter.brands.includes(',') ? `/${toStringUrlBrand}` : ''}${filter.width ? `/w${toStringUrlWidth}` : ''}${filter.height ? `/h${toStringUrlHeight}` : ''}${filter.diameter ? `/r${toStringUrlDiameter}` : ''}${filter.load_index && !filter.load_index.includes(',') ? `/li-${toStringUrlLoadIndex}` : '' }${filter.speed_index && !filter.speed_index.includes(',') ? `/si-${toStringUrlSpeedIndex}` : '' }${filter.reinforced && !filter.reinforced.includes(',') ? `/xl-${toStringUrlReinforced}` : '' }${filter.homologation && !filter.homologation.includes(',') ? `/om-${toStringUrlOm}` : '' }`;
          //history.push(
          // `${CATALOG_TYRES_ROUTE}${filter.season && !filter.season.includes(',') ? `/${toStringUrlSeason}` : '' }${filter.vehicle_type ? `/:${toStringUrTypeVehicle}` : ''}${filter.brands && !filter.brands.includes(',') ? `/${toStringUrBrand}` : ''}${filter.width ? `/w${toStringUrlWidth}` : ''}${filter.height ? `/h${toStringUrlHeight}` : ''}${filter.diameter ? `/r${toStringUrlDiameter}` : ''}`
          //);
          
        // const paramsTyre =
        // {
        //   season: toStringUrlSeason,
        //   studded: toStringUrStunded,
        //   type: toStringUrlTypeVehicle,
        //   brands: toStringUrlBrand,
        //   width: 'w' + toStringUrlWidth,
        //   height: 'h' + toStringUrlHeight,
        //   diameter: 'r' + toStringUrlDiameter,
        //   loadindex: 'li' + toStringUrlLoadIndex,
        //   speedindex: 'si' + toStringUrlSpeedIndex,
        //   reinforced: 'xl' + toStringUrlReinforced,
        //   om: 'om' + toStringUrlOm
        // };

        
          history.push(
          //generatePath(
            tyreCatalogPath, 
          //  paramsTyre
          //)
          );
      }
        // if (location.pathname.includes('wheels')) {
        //   const toStringUrlTypeWheel: string | undefined = createStringUrl(
        //     filter.type 
        //   );
        //   const toStringUrlBrand: string | undefined = createStringUrl( 
        //     filter.brands
        //   );
        //   const toStringUrlWidth: string | undefined = createStringUrl(
        //     filter.width
        //   );
        //   const toStringUrlDiameter: string | undefined = createStringUrl(
        //     filter.diameter 
        //   );
        //   const toStringUrlBoltCount: string | undefined = createStringUrl(
        //     filter.bolt_count
        //   );
        //   const toStringUrlPcd: string | undefined = createStringUrl(
        //     filter.pcd
        //   );
        //   const toStringUrEt: string | undefined = createStringUrl(
        //     filter.et
        //   );
        //   const toStringUrlDia: string | undefined = createStringUrl(
        //     filter.dia,
        //   );

        //   const wheelCatalogPath: string | undefined = 
        //   `${CATALOG_WHEELS_ROUTE}${filter.type && !filter.type.includes(',') ? `/${toStringUrlTypeWheel}` : '' }${filter.brands && !filter.brands.includes(',') ? `/${toStringUrlBrand}` : ''}${filter.width ? `/w${toStringUrlWidth}` : ''}${filter.diameter ? `/r${toStringUrlDiameter}` : ''}${filter.bolt_count && !filter.bolt_count.includes(',') ? `/${toStringUrlBoltCount}` : '' }${filter.pcd && !filter.pcd.includes(',') ? `/pcd${toStringUrlPcd}` : '' }${filter.et && !filter.et.includes(',') ? `/et${toStringUrEt}` : '' }${filter.dia && !filter.dia.includes(',') ? `/dia${toStringUrlDia}` : '' }`;
        // const paramsWheel =
        // {
        //   type: toStringUrlTypeWheel,
        //   brands: toStringUrlBrand,
        //   width: 'w' + toStringUrlWidth,
        //   diameter: 'r' + toStringUrlDiameter,
        //   boltcount: toStringUrlBoltCount
        //   pcd: 'pcd' + toStringUrlPcd,
        //   et: 'et' + toStringUrEt,
        //   dia: 'dia' + toStringUrlDia,
        //   
        //   
        // };
          //history.push(
            //generatePath(
            //  wheelCatalogPath, 
            //  paramsTyre
            //)
          //);
        //}
      }
    };
    createNewTyrePath();
    return () => {
      isMounted = true;
    };
  },[
    history, 
    filter,
    filter.brands, 
    filter.diameter, 
    filter.height, 
    filter.season, 
    filter.vehicle_type, 
    filter.width, 
    filter.studded, 
    filter.load_index, 
    filter.speed_index, 
    filter.reinforced, 
    filter.homologation, 
    location.pathname, 
    filter.type, 
    filter.bolt_count, 
    // filter.pcd, 
    // filter.et, 
    // filter.dia
  ]);

  const addDeliveryLink = (e: any) => {
    localStorage.setItem('regionData', e.currentTarget.getAttribute('data-region'));
  };

  const filterClick = () => {
    setStateFilter(!stateFilter);
    // console.log(e.target);
  }
  const closeFilter = () => {
    if(stateFilter) {
      setStateFilter(false);
      //console.log('FILTER_CLOSED');
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
    setMarkerState(e.target.getAttribute('data-position'));
    console.log('MARKER_CLICK: ', e.target.getAttribute('data-position'));
  };


  return (
    <div className='deliveryGoodsPage'
    onClick={closeFilter}
    >
      <div className='a'>
        <BreadCrumbs 
          route={['/','/delivery-pay', '/delivery']} 
          hrefTitle={['Інтернет-магазин SkyParts','Доставка оплата', `Доставка шин в ${cityRegion}`]}
        /> 
      </div>
      <div className='b'>
        <FilterCatalogTyres
          filterState={stateFilter} 
          setFilterAction={setStateFilter} 
        />
      </div>
      <div className='c'>
        <CatalogTyres/>
      </div>
      <div className='g'>
        <h3> Способи доставки шин в {cityRegion} </h3> 
      </div>
      {cityMarkerData && novaPoshtaWareHouseList ?
      <div className='d'>
          <div className='deliveryGoodsMap'>
          <MapDelivery 
            centerPosition={[Number(cityMarkerData?.Latitude), Number(cityMarkerData?.Longitude)]}
            markerPosition={novaPoshtaWareHouseList}
            popupInfo={markerState}
          />
          </div> 
        <div className='deliveryGoodsList'>
          <br/>
          <div className='deliveryGoodsDeliveryChoose'>
            <span>Нова Пошта</span>
            <span>Делівері</span> 
          </div>
          <div className='deliveryGoodsDepartDataList'>
          {novaPoshtaWareHouseList ? novaPoshtaWareHouseList.map((item: any) => (
          <div 
            className='deliveryGoodsDepartData'
            key={item.SiteKey + '-Depart'}
          >
            <ul>
              <li 
                onClick={markerClick} 
                data-position={[Number(item.Latitude),Number(item.Longitude),item.Description,'тел: '+ item.Phone]} 
              >
                {item.Description}<br/> тел: {item.Phone}
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
      <div className='e'>
      {cityRegion && novaPoshtaCityInRegion?
        <h3>Доставка шин в інші міста {region}</h3> 
        : <h3>Доставка шин в інші областя України</h3>
      }
      <div className='deliveryGoodsCityInRegion'>
      {region && novaPoshtaCityInRegion ? 
      novaPoshtaCityInRegion?.filter(
        entity => entity.Description !== cityRegion)
      .map((item) =>
      <div key={item.SiteKey}>
        <ul>
          <li>
          <a
            href={DELIVERY_GOODS_ROUTE + '/' + 
            createStringUrl(`${item.Description} ${region}`)}
            data-region={`${item.Description},${region}`}
            onClick={addDeliveryLink}
            title={`Доставка шин дисків акб автохіміі в ${item.Description}`}
          >
            {item.Description}
          </a>
          </li>
        </ul>
      </div>
      )
      
      : <SpinnerCarRot/>
      }
      </div>
      {region && !novaPoshtaCityInRegion ? 
      <div>
        <ul>
        <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl('Сімферопіль АРК')}
                data-region='Сімферопіль,АРК'
                onClick={addDeliveryLink}
                title='Доставка шин дисків акб автохіміі в АРК'
              >
                АРК
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl('Вінниця Вінницька область')}
                data-region='Вінниця,Вінницька область'
                onClick={addDeliveryLink}
                title='Доставка шин дисків акб автохіміі в Вінницю'
              >
                Шини в Вінниці
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl('Луцьк Волинська область')}
                data-region='Луцьк,Волинська область'
                onClick={addDeliveryLink}
                title='Доставка шин дисків акб автохіміі в Луцьку'
              >
                Шини в Луцьку
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl('Дніпро Дніпропетровська область')}
                data-region='Дніпро,Дніпропетровська область'
                onClick={addDeliveryLink}
                title='Доставка шин дисків акб автохіміі в Дніпрі'
              >
                Шини в Дніпрі
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl('Краматорськ Донецька область')}
                data-region='Краматорськ,Донецька область'
                onClick={addDeliveryLink}
                title='Доставка шин дисків акб автохіміі в Краматорську'
              >
                Шини в Краматорську
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl('Житомир Житомирська область')}
                data-region='Житомир,Житомирська область'
                onClick={addDeliveryLink}
                title='Доставка шин дисків акб автохіміі в Житомирі'
              >
                Шини в Житомирі
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl('Ужгород Закарпатська область')}
                data-region='Ужгород,Закарпатська область'
                onClick={addDeliveryLink}
                title='Доставка шин дисків акб автохіміі в Ужгороді'
              >
                Шини в Ужгороді
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl('Запоріжжя Запорізька область')}
                data-region='Запоріжжя,Запорізька область'
                onClick={addDeliveryLink}
                title='Доставка шин дисків акб автохіміі в Запоріжжі'
              >
                Шини в Запоріжжі
              </a>
            </li>
          </ul>
          <ul className='deliveryPageRegionListUl'>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl('Івано-Франківськ Івано-Франківська область')}
                data-region='Івано-Франківськ,Івано-Франківська область'
                onClick={addDeliveryLink}
                title='Доставка шин дисків акб автохіміі в Івано-Франківську'
              >
                Шини в Івано-Франківську
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl('Київ Київська область')}
                data-region='Київ,Київська область'
                onClick={addDeliveryLink}
                title='Доставка шин дисків акб автохіміі в Київі'
              >
                Шини в Київі
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl('Кропивницький Кіровоградська область')}
                data-region='Кропивницький,Кіровоградська область'
                onClick={addDeliveryLink}
                title='Доставка шин дисків акб автохіміі в Кропивницькому'
              >
                Шини в Кропивницькомі
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE 
                //createStringUrl('Луганськ Луганська область')
                }
                data-region='Луганськ,Луганська область'
                //onClick={addDeliveryLink}
                title='Доставка шин дисків акб автохіміі в Луганська область'
              >
                Луганськ - тимчасово не доступна
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl('Львів Львівська область')}
                data-region='Львів,Львівська область'
                onClick={addDeliveryLink}
                title='Доставка шин дисків акб автохіміі в Львові'
              >
                Шини в Львові
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl('Миколаїв Миколаївська область')}
                data-region='Миколаїв,Миколаївська область'
                onClick={addDeliveryLink}
                title='Доставка шин дисків акб автохіміі в Миколаїві'
              >
                Шини в Миколаїві
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl('Одеса Одеська область')}
                data-region='Одеса,Одеська область'
                onClick={addDeliveryLink}
                title='Доставка шин дисків акб автохіміі в Одесі'
              >
                Шини в Одесі
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl('Полтава Полтавська область')}
                data-region='Полтава,Полтавська область'
                onClick={addDeliveryLink}
                title='Доставка шин дисків акб автохіміі в Полтаві'
              >
                Шини в Полтаві
              </a>
            </li>
          </ul>
          <ul className='deliveryPageRegionListUl'>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl('Рівне Рівненська область')}
                data-region='Рівне,Рівненська область'
                onClick={addDeliveryLink}
                title='Доставка шин дисків акб автохіміі в Рівне'
              >
                Шини в Рівне
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl('Суми Сумська область')}
                data-region='Суми,Сумська область'
                onClick={addDeliveryLink}
                title='Доставка шин дисків акб автохіміі в Сумах'
              >
                Шини в Сумах
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl('Тернопіль Тернопільська область')}
                data-region='Тернопіль,Тернопільська область'
                onClick={addDeliveryLink}
                title='Доставка шин дисків акб автохіміі в Тернополі'
              >
                Шини а Тернополі
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl('Харків Харківська область')}
                data-region='Харків,Харківська область'
                onClick={addDeliveryLink}
                title='Доставка шин дисків акб автохіміі в Харкові'
              >
                Шини в Харкові
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl('Херсон Херсонська область')}
                data-region='Херсон,Херсонська область'
                onClick={addDeliveryLink}
                title='Доставка шин дисків акб автохіміі в Херсоні'
              >
                Шини в Херсоні
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl('Хмельницький Хмельницька область')}
                data-region='Хмельницький,Хмельницька область'
                onClick={addDeliveryLink}
                title='Доставка шин дисків акб автохіміі в Хмельницькому'
              >
                Шини в Хмельницькому
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl('Черкаси Черкаська область')}
                data-region='Черкаси,Черкаська область'
                onClick={addDeliveryLink}
                title='Доставка шин дисків акб автохіміі в Черкасах'
              >
                Шини в Черкасах
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl('Чернівці, Чернівецька область')}
                data-region='Чернівці,Чернівецька область'
                onClick={addDeliveryLink}
                title='Доставка шин дисків акб автохіміі в Чернівцях'
              >
                Шини в Чернівцях
              </a>
            </li>
            <li>
              <a href={DELIVERY_GOODS_ROUTE + '/' + 
                createStringUrl('Чернігів, Чернігівська область')}
                data-region='Чернігів,Чернігівська область'
                onClick={addDeliveryLink}
                title='Доставка шин дисків акб автохіміі в Чернігові'
              >
                Шини в Чернігові
              </a>
            </li>
        </ul>
      </div>
      
      : null
      }
      </div>
      <div className='f'>
      <ReviewsMain 
        props={'Відгуки кліентів'} 
        prevBtnAction={prevBtnReviewGoods} 
        nextBtnAction={nextBtnReviewGoods}    
        buttonPosition={{
          prevBtnLeft: 450, 
          prevTop: 395, 
          nextBtnRight: 140,  
          nextTop: 395, 
        }}      
      >
        <div >
        {reviewGoodsData?.length !== 0 ? 
          reviewGoodsData?.map((item: any) =>
          <div key={item.id_review_store + '_review'}>
            <ReviewsGoods 
              productFullName={item.tyres.full_name} 
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
                href='/review'>Дивитися всі відгуки про магазин
              </a>
            </div>
          }
        </div>
      </ReviewsMain>
      </div>
    </div>
  )
}

export default DeliveryGoodsPage;