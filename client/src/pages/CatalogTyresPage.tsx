import React, { useContext, useEffect, useState } from 'react';
import '../css/CatalogTyresPage.css';
import CatalogTyres from '../components/catalogs/CatalogTyres';
import FilterCatalogTyres from '../components/filterCatalog/FilterCatalogTyres';
import ReviewsMain from '../components/reviews/ReviewsMain';
import ReviewsGoods from '../components/reviews/ReviewsGoods';
import BreadCrumbs from '../components/BreadCrumbs';
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import { generatePath, useHistory, useLocation, useParams } from 'react-router-dom';
import { yieldToMain } from '../restAPI/postTaskAdmin';
import { getTyresCountAll, getTyresWithoutOffset, getWheelsWithoutOffset} from '../restAPI/restGoodsApi';
import { Context } from '../context/Context';
import { observer } from 'mobx-react-lite';
import { tyreDiameterCat, tyreSeasonCat, tyreVehicleTypeCat } from '../services/tyresCatService';
import CatalogWheels from '../components/catalogs/CatalogWheels';
import FilterCatalogWheels from '../components/filterCatalog/FilterCatalogWheels';
import { CATALOG_TYRES_ROUTE, CATALOG_WHEELS_ROUTE } from '../utils/consts';
import { createStringUrl } from '../services/stringUrl';

const CatalogTyresPage = observer(({crumbsItem}: any) => {
  const {goodsTyre, goodsWheel, filter} = useContext<any | null>(Context);
  const {page} = useContext<any | null>(Context);
  const [paramUrl, setParamUrl] = useState(0);
  const params = useParams<any>();
  const location = useLocation();
  const history = useHistory();
  const [stateFilter, setStateFilter]=useState(false);
    
  const cyrillicToTranslit = new (CyrillicToTranslit as any)();
  const paramsCat = cyrillicToTranslit.transform(params.category,''
            ).toLowerCase();
  
  useEffect(() =>{
    let isMounted = false;
    const loadMaintask = async() => {
      const taskLoad: any[] = [
        getTyresWithoutOffset,  
        getTyresCountAll,
        //getWheelsWithoutOffset,
        
      ];

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
        const task = taskLoad.shift();
        task();
        await yieldToMain(); 
      }
      if (params.season && !filter.season && filter.chipSeason.length === 0 ) {
        const tyreCatSeason = tyreSeasonCat(params.season);
        if (tyreCatSeason) {
          filter.setSeason(tyreCatSeason);
          filter.setChipSeason(
            Array.from(new Set([...filter.chipSeason, tyreCatSeason]))
          ); 
        }
      }
      if (params.season && !filter.studded && filter.chipStudded.length === 0 ) {
        const tyreStudded = goodsTyre._studded?.find(
          (studded:string) => 
          createStringUrl(studded.toLocaleLowerCase()) === params.season);
        if (tyreStudded) {
          filter.setStudded(tyreStudded);
          filter.setChipStudded(
            Array.from(new Set([...filter.chipStudded, tyreStudded]))
          ); 
        }
      }
      if (params.studded && !filter.studded && filter.chipStudded.length === 0 ) {
        const tyreStudded = goodsTyre._studded?.find(
          (studded:string) => 
          createStringUrl(studded.toLocaleLowerCase()) === params.studded);
        if (tyreStudded) {
          filter.setStudded(tyreStudded);
          filter.setChipStudded(
            Array.from(new Set([...filter.chipStudded, tyreStudded]))
          ); 
        }
      }
      if (params.season && !filter.vehicle_type && filter.chipVehicleType.length === 0) {
        const tyreCatType = tyreVehicleTypeCat(params.season);
        if (tyreCatType) {
          filter.setVehicleType(tyreCatType);
          filter.setChipVehicleType(
            Array.from(new Set([...filter.chipVehicleType, tyreCatType]))
          );  
        }
      }
      if (params.studded && !filter.vehicle_type && filter.chipVehicleType.length === 0) {
        const tyreCatType = tyreVehicleTypeCat(params.studded);
        if (tyreCatType) {
          filter.setVehicleType(tyreCatType);
          filter.setChipVehicleType(
            Array.from(new Set([...filter.chipVehicleType, tyreCatType]))
          ); 
        }
      }
      if (params.type && !filter.vehicle_type && filter.chipVehicleType.length === 0) {
        const tyreCatType = tyreVehicleTypeCat(params.type);
        if (tyreCatType) {
          filter.setVehicleType(tyreCatType);
          filter.setChipVehicleType(
            Array.from(new Set([...filter.chipVehicleType, tyreCatType]))
          );     
        }
      }
      if (params.season && !filter.brands && filter.chipBrands.length === 0) {
        const findBrands = goodsTyre._brands?.find(
          (brands:string) => 
          createStringUrl(brands.toLocaleLowerCase()) === params.season);
        if (findBrands) {
          filter.setBrands(findBrands);
          filter.setChipBrands(
            Array.from(new Set([...filter.chipBrands, findBrands]))
          );
        }
      }
      if (params.studded && !filter.brands && filter.chipBrands.length === 0) {
        const findBrandsInStudded = goodsTyre._brands?.find(
          (brands:string) => 
          createStringUrl(brands.toLocaleLowerCase()) === params.studded);
        if (findBrandsInStudded) {
          filter.setBrands(findBrandsInStudded);
          filter.setChipBrands(
            Array.from(new Set([...filter.chipBrands, findBrandsInStudded]))
          );
        }
      }
      if (params.type && !filter.brands && filter.chipBrands.length === 0) {
        const findBrandsInType = goodsTyre._brands?.find(
          (brands:string) => 
          createStringUrl(brands.toLocaleLowerCase()) === params.type);
        if (findBrandsInType) {
          filter.setBrands(findBrandsInType);
          filter.setChipBrands(
            Array.from(new Set([...filter.chipBrands, findBrandsInType]))
          );
        }
      }
      if (params.brands && !filter.brands && filter.chipBrands.length === 0) {
        const findBrand = goodsTyre._brands?.find(
          (brands:string) => 
          createStringUrl(brands.toLocaleLowerCase()) === params.brands);
        if (findBrand) {
          filter.setBrands(findBrand);
          filter.setChipBrands(
            Array.from(new Set([...filter.chipBrands, findBrand]))
          );
        }
      }
      if (params.season?.includes('w') && !filter.width && filter.chipWidth.length === 0 ) {
        const findWidth = goodsTyre._width?.find((width:string) => width === params.season?.slice(1, params.season?.length));
        if (findWidth) {
          filter.setWidth(findWidth);
          filter.setChipWidth(
            Array.from(new Set([...filter.chipWidth, findWidth]))
          );
        }
      }
      if (params.studded?.includes('w') && !filter.width && filter.chipWidth.length === 0 ) {
        const findWidthInStudded = goodsTyre._width?.find((width:string) => width === params.studded?.slice(1, params.studded?.length));
        if (findWidthInStudded) {
          filter.setWidth(findWidthInStudded);
          filter.setChipWidth(
            Array.from(new Set([...filter.chipWidth, findWidthInStudded]))
          );
        }
      }
      if (params.type?.includes('w') && !filter.width && filter.chipWidth.length === 0 ) {
        const findWidthInType = goodsTyre._width?.find((width:string) => width === params.type?.slice(1, params.type?.length));
        if (findWidthInType) {
          filter.setWidth(findWidthInType);
          filter.setChipWidth(
            Array.from(new Set([...filter.chipWidth, findWidthInType]))
          );
        }
      }
      if (params.brands?.includes('w') && !filter.width && filter.chipWidth.length === 0 ) {
        const findWidthInBrand = goodsTyre._width?.find((width:string) => width === params.brands?.slice(1, params.brands?.length));
        if (findWidthInBrand) {
          filter.setWidth(findWidthInBrand);
          filter.setChipWidth(
            Array.from(new Set([...filter.chipWidth, findWidthInBrand]))
          );
        }
      }
      if (params.width?.includes('w') && !filter.width && filter.chipWidth.length === 0 ) {
        const findWidth = goodsTyre._width?.find((width:string) => width === params.width?.slice(1, params.width?.length));
        if (findWidth) {
          filter.setWidth(findWidth);
          filter.setChipWidth(
            Array.from(new Set([...filter.chipWidth, findWidth]))
          );
        }
      }
      if (params.season?.includes('h') && !filter.height && filter.chipHeight.length === 0) {
        const findHeight = goodsTyre._height?.find((height:string) => height === params.season?.slice(1, params.season?.length));
        if (findHeight) {
          filter.setHeight(findHeight);
          filter.setChipHeight(
            Array.from(
              new Set([...filter.chipHeight, findHeight]))
          );
        }
      }
      if (params.studded?.includes('h') && !filter.height && filter.chipHeight.length === 0) {
        const findHeightInStudded = goodsTyre._height?.find((height:string) => height === params.studded?.slice(1, params.studded?.length));
        if (findHeightInStudded) {
          filter.setHeight(findHeightInStudded);
          filter.setChipHeight(
            Array.from(new Set([...filter.chipHeight, findHeightInStudded]))
          );
        }
      }
      if (params.type?.includes('h') && !filter.height && filter.chipHeight.length === 0) {
        const findHeightInType = goodsTyre._height?.find((height:string) => height === params.type?.slice(1, params.type?.length));
        if (findHeightInType) {
          filter.setHeight(findHeightInType);
          filter.setChipHeight(
            Array.from(new Set([...filter.chipHeight, findHeightInType]))
          );
        }
      }
      if (params.brands?.includes('h') && !filter.height && filter.chipHeight.length === 0) {
        const findHeightInBrand = goodsTyre._height?.find((height:string) => height === params.brands?.slice(1, params.brands?.length));
        if (findHeightInBrand) {
          filter.setHeight(findHeightInBrand);
          filter.setChipHeight(
            Array.from(new Set([...filter.chipHeight, findHeightInBrand]))
          );
        }
      }
      if (params.width?.includes('h') && !filter.height && filter.chipHeight.length === 0) {
        const findHeightInBrand = goodsTyre._height?.find((height:string) => height === params.width?.slice(1, params.width?.length));
        if (findHeightInBrand) {
          filter.setHeight(findHeightInBrand);
          filter.setChipHeight(
            Array.from(new Set([...filter.chipHeight, findHeightInBrand]))
          );
        }
      }
      if (params.height?.includes('h') && !filter.height && filter.chipHeight.length === 0) {
        const findHeight = goodsTyre._height?.find((height:string) => height === params.height?.slice(1, params.height?.length));
        if (findHeight) {
          filter.setHeight(findHeight);
          filter.setChipHeight(
            Array.from(new Set([...filter.chipHeight, findHeight]))
          );
        }
      }
      if (params.season?.includes('r') && !filter.diameter && filter.chipDiameter.length === 0) {
        const findDiameter = goodsTyre._diameter?.find(
          (diameter:string) => 
          diameter === params.season?.slice(1, params.season?.length));
        if (findDiameter) {
          filter.setDiameter(findDiameter);
          filter.setChipDiameter(
            Array.from(
              new Set([...filter.chipDiameter, findDiameter]))
          );
        }
      }
      if (params.studded?.includes('r') && !filter.diameter && filter.chipDiameter.length === 0) {
        const findDiameterInType = goodsTyre._diameter?.find(
          (diameter:string) => 
          diameter === params.studded?.slice(1, params.studded?.length));
        if (findDiameterInType) {
          filter.setDiameter(findDiameterInType);
          filter.setChipDiameter(
            Array.from(new Set([...filter.chipDiameter, findDiameterInType]))
          );
        }
      }
      if (params.type?.includes('r') && !filter.diameter && filter.chipDiameter.length === 0) {
        const findDiameterInType = goodsTyre._diameter?.find(
          (diameter:string) => 
          diameter === params.type?.slice(1, params.type?.length));
        if (findDiameterInType) {
          filter.setDiameter(findDiameterInType);
          filter.setChipDiameter(
            Array.from(new Set([...filter.chipDiameter, findDiameterInType]))
          );
        }
      }
      if (params.brands?.includes('r') && !filter.diameter && filter.chipDiameter.length === 0) {
        const findDiameterInBrand = goodsTyre._diameter?.find(
          (diameter:string) => 
          diameter === params.brands?.slice(1, params.brands?.length));
        if (findDiameterInBrand) {
          filter.setDiameter(findDiameterInBrand);
          filter.setChipDiameter(
            Array.from(new Set([...filter.chipDiameter, findDiameterInBrand]))
          );
        }
      }
      if (params.width?.includes('r') && !filter.diameter && filter.chipDiameter.length === 0) {
        const findDiameterInBrand = goodsTyre._diameter?.find(
          (diameter:string) => 
          diameter === params.width?.slice(1, params.width?.length));
        if (findDiameterInBrand) {
          filter.setDiameter(findDiameterInBrand);
          filter.setChipDiameter(
            Array.from(new Set([...filter.chipDiameter, findDiameterInBrand]))
          );
        }
      }
      if (params.height?.includes('r') && !filter.diameter && filter.chipDiameter.length === 0) {
        const findDiameterInBrand = goodsTyre._diameter?.find(
          (diameter:string) => 
          diameter === params.height?.slice(1, params.height?.length));
        if (findDiameterInBrand) {
          filter.setDiameter(findDiameterInBrand);
          filter.setChipDiameter(
            Array.from(new Set([...filter.chipDiameter, findDiameterInBrand]))
          );
        }
      }
      if (params.diameter?.includes('r') && !filter.diameter && filter.chipDiameter.length === 0) {
        const findDiameter = goodsTyre._diameter?.find(
          (diameter:string) => 
          diameter === params.diameter?.slice(1, params.height?.length));
        if (findDiameter) {
          filter.setDiameter(findDiameter);
          filter.setChipDiameter(
            Array.from(new Set([...filter.chipDiameter, findDiameter]))
          );
        }
      }
      if (params.season?.includes('li-') && !filter.load_index && filter.chipLoadIndex.length === 0) {
        const findLoadIndex = goodsTyre._load_index?.find(
          (load_index_with_desc:string) => 
          createStringUrl(load_index_with_desc.toLocaleLowerCase()) === params.season?.slice(3, params.season?.length));
        if (findLoadIndex) {
          filter.setLoadIndex(findLoadIndex);
          filter.setChipLoadIndex(
            Array.from(new Set([...filter.chipLoadIndex, findLoadIndex]))
          );
        }
      }
      if (params.studded?.includes('li-') && !filter.load_index && filter.chipLoadIndex.length === 0) {
        const findBrandsInStudded = goodsTyre._load_index?.find(
          (load_index_with_desc:string) => 
          createStringUrl(load_index_with_desc.toLocaleLowerCase()) === params.studded?.slice(3, params.studded?.length));
        if (findBrandsInStudded) {
          filter.setLoadIndex(findBrandsInStudded);
          filter.setChipLoadIndex(
            Array.from(new Set([...filter.chipLoadIndex, findBrandsInStudded]))
          );
        }
      }
      if (params.type?.includes('li-') && !filter.load_index && filter.chipLoadIndex.length === 0) {
        const findBrandsInType = goodsTyre._load_index?.find(
          (load_index_with_desc:string) => 
          createStringUrl(load_index_with_desc.toLocaleLowerCase()) === params.type?.slice(3, params.type?.length));
        if (findBrandsInType) {
          filter.setLoadIndex(findBrandsInType);
          filter.setChipLoadIndex(
            Array.from(new Set([...filter.chipLoadIndex, findBrandsInType]))
          );
        }
      }
      if (params.brands?.includes('li-') && !filter.load_index && filter.chipLoadIndex.length === 0) {
        const findBrand = goodsTyre._load_index?.find(
          (load_index_with_desc:string) => 
          createStringUrl(load_index_with_desc.toLocaleLowerCase()) === params.brands?.slice(3, params.brands?.length));
        if (findBrand) {
          filter.setLoadIndex(findBrand);
          filter.setChipLoadIndex(
            Array.from(new Set([...filter.chipLoadIndex, findBrand]))
          );
        }
      }
      if (params.width?.includes('li-') && !filter.load_index && filter.chipLoadIndex.length === 0) {
        const findLoadIndexWidth = goodsTyre._load_index?.find(
          (load_index_with_desc:string) => 
          createStringUrl(load_index_with_desc.toLocaleLowerCase()) === params.width?.slice(3, params.width?.length));
        if (findLoadIndexWidth) {
          filter.setLoadIndex(findLoadIndexWidth);
          filter.setChipLoadIndex(
            Array.from(new Set([...filter.chipLoadIndex, findLoadIndexWidth]))
          );
        }
      }
      if (params.height?.includes('li-') && !filter.load_index && filter.chipLoadIndex.length === 0) {
        const findLoadIndexHeight = goodsTyre._load_index?.find(
          (load_index_with_desc:string) => 
          createStringUrl(load_index_with_desc.toLocaleLowerCase()) === params.height?.slice(3, params.height?.length));
        if (findLoadIndexHeight) {
          filter.setLoadIndex(findLoadIndexHeight);
          filter.setChipLoadIndex(
            Array.from(new Set([...filter.chipLoadIndex, findLoadIndexHeight]))
          );
        }
      }
      if (params.diameter?.includes('li-') && !filter.load_index && filter.chipLoadIndex.length === 0) {
        const findLoadIndexBrand = goodsTyre._load_index?.find(
          (load_index_with_desc:string) => 
          createStringUrl(load_index_with_desc.toLocaleLowerCase()) === params.diameter?.slice(3, params.diameter?.length));
        if (findLoadIndexBrand) {
          filter.setLoadIndex(findLoadIndexBrand);
          filter.setChipLoadIndex(
            Array.from(new Set([...filter.chipLoadIndex, findLoadIndexBrand]))
          );
        }
      }
      if (params.loadindex?.includes('li-') && !filter.load_index && filter.chipLoadIndex.length === 0) {
        const findLoadIndex = goodsTyre._load_index?.find(
          (load_index_with_desc:string) => 
          createStringUrl(load_index_with_desc.toLocaleLowerCase()) === params.loadindex?.slice(3, params.loadindex?.length));
        if (findLoadIndex) {
          filter.setLoadIndex(findLoadIndex);
          filter.setChipLoadIndex(
            Array.from(new Set([...filter.chipLoadIndex, findLoadIndex]))
          );
        }
      }
      if (params.season?.includes('si-') && !filter.speed_index && filter.chipSpeedIndex.length === 0) {
        const findSpeedIndex = goodsTyre._speed_index?.find(
          (speed_index_with_desc:string) => 
          createStringUrl(speed_index_with_desc.toLocaleLowerCase()) === params.season?.slice(3, params.season?.length));
        if (findSpeedIndex) {
          filter.setSpeedIndex(findSpeedIndex);
          filter.setChipSpeedIndex(
            Array.from(new Set([...filter.chipSpeedIndex, findSpeedIndex]))
          );
        }
      }
      if (params.studded?.includes('si-') && !filter.speed_index && filter.chipSpeedIndex.length === 0) {
        const findSpeedIndexStudded = goodsTyre._speed_index?.find(
          (speed_index_with_desc:string) => 
          createStringUrl(speed_index_with_desc.toLocaleLowerCase()) === params.studded?.slice(3, params.studded?.length));
        if (findSpeedIndexStudded) {
          filter.setSpeedIndex(findSpeedIndexStudded);
          filter.setChipSpeedIndex(
            Array.from(new Set([...filter.chipSpeedIndex, findSpeedIndexStudded]))
          );
        }
      }
      if (params.type?.includes('si-') && !filter.speed_index && filter.chipSpeedIndex.length === 0) {
        const findSpeedIndexInType = goodsTyre._speed_index?.find(
          (speed_index_with_desc:string) => 
          createStringUrl(speed_index_with_desc.toLocaleLowerCase()) === params.type?.slice(3, params.type?.length));
        if (findSpeedIndexInType) {
          filter.setSpeedIndex(findSpeedIndexInType);
          filter.setChipSpeedIndex(
            Array.from(new Set([...filter.chipSpeedIndex, findSpeedIndexInType]))
          );
        }
      }
      if (params.brands?.includes('si-') && !filter.speed_index && filter.chipSpeedIndex.length === 0) {
        const findSpeedIndexBrand = goodsTyre._speed_index?.find(
          (speed_index_with_desc:string) => 
          createStringUrl(speed_index_with_desc.toLocaleLowerCase()) === params.brands?.slice(3, params.brands?.length));
        if (findSpeedIndexBrand) {
          filter.setSpeedIndex(findSpeedIndexBrand);
          filter.setChipSpeedIndex(
            Array.from(new Set([...filter.chipSpeedIndex, findSpeedIndexBrand]))
          );
        }
      }
      if (params.width?.includes('si-') && !filter.speed_index && filter.chipSpeedIndex.length === 0) {
        const findSpeedIndexWidth = goodsTyre._speed_index?.find(
          (speed_index_with_desc:string) => 
          createStringUrl(speed_index_with_desc.toLocaleLowerCase()) === params.width?.slice(3, params.width?.length));
        if (findSpeedIndexWidth) {
          filter.setSpeedIndex(findSpeedIndexWidth);
          filter.setChipSpeedIndex(
            Array.from(new Set([...filter.chipSpeedIndex, findSpeedIndexWidth]))
          );
        }
      }
      if (params.height?.includes('si-') && !filter.speed_index && filter.chipSpeedIndex.length === 0) {
        const findSpeedIndexHeight = goodsTyre._speed_index?.find(
          (speed_index_with_desc:string) => 
          createStringUrl(speed_index_with_desc.toLocaleLowerCase()) === params.height?.slice(3, params.height?.length));
        if (findSpeedIndexHeight) {
          filter.setSpeedIndex(findSpeedIndexHeight);
          filter.setChipSpeedIndex(
            Array.from(new Set([...filter.chipSpeedIndex, findSpeedIndexHeight]))
          );
        }
      }
      if (params.diameter?.includes('si-') && !filter.speed_index && filter.chipSpeedIndex.length === 0) {
        const findSpeedIndexDiameter = goodsTyre._speed_index?.find(
          (speed_index_with_desc:string) => 
          createStringUrl(speed_index_with_desc.toLocaleLowerCase()) === params.diameter?.slice(3, params.diameter?.length));
        if (findSpeedIndexDiameter) {
          filter.setSpeedIndex(findSpeedIndexDiameter);
          filter.setChipSpeedIndex(
            Array.from(new Set([...filter.chipSpeedIndex, findSpeedIndexDiameter]))
          );
        }
      }
      if (params.loadindex?.includes('si-') && !filter.speed_index && filter.chipSpeedIndex.length === 0) {
        const findSpeedIndexLoad = goodsTyre._speed_index?.find(
          (speed_index_with_desc:string) => 
          createStringUrl(speed_index_with_desc.toLocaleLowerCase()) === params.loadindex?.slice(3, params.loadindex?.length));
        if (findSpeedIndexLoad) {
          filter.setSpeedIndex(findSpeedIndexLoad);
          filter.setChipSpeedIndex(
            Array.from(new Set([...filter.chipSpeedIndex, findSpeedIndexLoad]))
          );
        }
      }
      if (params.speedindex?.includes('si-') && !filter.speed_index && filter.chipSpeedIndex.length === 0) {
        const findSpeedIndex = goodsTyre._speed_index?.find(
          (speed_index_with_desc:string) => 
          createStringUrl(speed_index_with_desc.toLocaleLowerCase()) === params.speedindex?.slice(3, params.speedindex?.length));
        if (findSpeedIndex) {
          filter.setSpeedIndex(findSpeedIndex);
          filter.setChipSpeedIndex(
            Array.from(new Set([...filter.chipSpeedIndex, findSpeedIndex]))
          );
        }
      }
      if (params.season?.includes('xl-') && !filter.reinforced && filter.chipReinforced.length === 0) {
        const findReinforcedSeason = goodsTyre._reinforced?.find(
          (reinforced:string) => 
          createStringUrl(reinforced.toLocaleLowerCase()) === params.season?.slice(3, params.season?.length));
        if (findReinforcedSeason) {
          filter.setReinforced(findReinforcedSeason);
          filter.setChipReinforced(
            Array.from(new Set([...filter.chipReinforced, findReinforcedSeason]))
          );
        }
      }
      if (params.studded?.includes('xl-') && !filter.reinforced && filter.chipReinforced.length === 0) {
        const findReinforcedStudded = goodsTyre._reinforced?.find(
          (reinforced:string) => 
          createStringUrl(reinforced.toLocaleLowerCase()) === params.studded?.slice(3, params.studded?.length));
        if (findReinforcedStudded) {
          filter.setReinforced(findReinforcedStudded);
          filter.setChipReinforced(
            Array.from(new Set([...filter.chipReinforced, findReinforcedStudded]))
          );
        }
      }
      if (params.type?.includes('xl-') && !filter.reinforced && filter.chipReinforced.length === 0) {
        const findReinforcedInType = goodsTyre._reinforced?.find(
          (reinforced:string) => 
          createStringUrl(reinforced.toLocaleLowerCase()) === params.type?.slice(3, params.type?.length));
        if (findReinforcedInType) {
          filter.setReinforced(findReinforcedInType);
          filter.setChipReinforced(
            Array.from(new Set([...filter.chipReinforced, findReinforcedInType]))
          );
        }
      }
      if (params.brands?.includes('xl-') && !filter.reinforced && filter.chipReinforced.length === 0) {
        const findReinforcedBrand = goodsTyre._reinforced?.find(
          (reinforced:string) => 
          createStringUrl(reinforced.toLocaleLowerCase()) === params.brands?.slice(3, params.brands?.length));
        if (findReinforcedBrand) {
          filter.setReinforced(findReinforcedBrand);
          filter.setChipReinforced(
            Array.from(new Set([...filter.chipReinforced, findReinforcedBrand]))
          );
        }
      }
      if (params.width?.includes('xl-') && !filter.reinforced && filter.chipReinforced.length === 0) {
        const findReinforcedWidth = goodsTyre._reinforced?.find(
          (reinforced:string) => 
          createStringUrl(reinforced.toLocaleLowerCase()) === params.width?.slice(3, params.width?.length));
        if (findReinforcedWidth) {
          filter.setReinforced(findReinforcedWidth);
          filter.setChipReinforced(
            Array.from(new Set([...filter.chipReinforced, findReinforcedWidth]))
          );
        }
      }
      if (params.height?.includes('xl-') && !filter.reinforced && filter.chipReinforced.length === 0) {
        const findReinforcedHeight = goodsTyre._reinforced?.find(
          (reinforced:string) => 
          createStringUrl(reinforced.toLocaleLowerCase()) === params.height?.slice(3, params.height?.length));
        if (findReinforcedHeight) {
          filter.setReinforced(findReinforcedHeight);
          filter.setChipReinforced(
            Array.from(new Set([...filter.chipReinforced, findReinforcedHeight]))
          );
        }
      }
      if (params.diameter?.includes('xl-') && !filter.reinforced && filter.chipReinforced.length === 0) {
        const findReinforcedDiameter = goodsTyre._reinforced?.find(
          (reinforced:string) => 
          createStringUrl(reinforced.toLocaleLowerCase()) === params.diameter?.slice(3, params.diameter?.length));
        if (findReinforcedDiameter) {
          filter.setReinforced(findReinforcedDiameter);
          filter.setChipReinforced(
            Array.from(new Set([...filter.chipReinforced, findReinforcedDiameter]))
          );
        }
      }
      if (params.loadindex?.includes('xl-') && !filter.reinforced && filter.chipReinforced.length === 0) {
        const findReinforcedLoad = goodsTyre._reinforced?.find(
          (reinforced:string) => 
          createStringUrl(reinforced.toLocaleLowerCase()) === params.loadindex?.slice(3, params.loadindex?.length));
        if (findReinforcedLoad) {
          filter.setReinforced(findReinforcedLoad);
          filter.setChipReinforced(
            Array.from(new Set([...filter.chipReinforced, findReinforcedLoad]))
          );
        }
      }
      if (params.speedindex?.includes('xl') && !filter.reinforced && filter.chipReinforced.length === 0) {
        const findReinforcedSpeed = goodsTyre._reinforced?.find(
          (reinforced:string) => 
          createStringUrl(reinforced.toLocaleLowerCase()) === params.speedindex?.slice(3, params.speedindex?.length));
        if (findReinforcedSpeed) {
          filter.setReinforced(findReinforcedSpeed);
          filter.setChipReinforced(
            Array.from(new Set([...filter.chipReinforced, findReinforcedSpeed]))
          );
        }
      }
      if (params.reinforced?.includes('xl-') && !filter.reinforced && filter.chipReinforced.length === 0) {
        const findReinforced = goodsTyre._reinforced?.find(
          (reinforced:string) => 
          createStringUrl(reinforced.toLocaleLowerCase()) === params.reinforced?.slice(3, params.reinforced?.length));
        if (findReinforced) {
          filter.setReinforced(findReinforced);
          filter.setChipReinforced(
            Array.from(new Set([...filter.chipReinforced, findReinforced]))
          );
        }
      }
      if (params.season?.includes('om-') && !filter.homologation && filter.chipHomologation.length === 0) {
        const findOmSeason = goodsTyre._homologation?.find(
          (homologation:string) => 
          createStringUrl(homologation.toLocaleLowerCase()) === params.season?.slice(3, params.season?.length));
        if (findOmSeason) {
          filter.setHomologation(findOmSeason);
          filter.setChipHomologation(
            Array.from(new Set([...filter.chipHomologation, findOmSeason]))
          );
        }
      }
      if (params.studded?.includes('om-') && !filter.homologation && filter.chipHomologation.length === 0) {
        const findOmStudded = goodsTyre._homologation?.find(
          (homologation:string) => 
          createStringUrl(homologation.toLocaleLowerCase()) === params.studded?.slice(3, params.studded?.length));
        if (findOmStudded) {
          filter.setHomologation(findOmStudded);
          filter.setChipHomologation(
            Array.from(new Set([...filter.chipHomologation, findOmStudded]))
          );
        }
      }
      if (params.type?.includes('om-') && !filter.homologation && filter.chipHomologation.length === 0) {
        const findOmInType = goodsTyre._homologation?.find(
          (homologation:string) => 
          createStringUrl(homologation.toLocaleLowerCase()) === params.type?.slice(3, params.type?.length));
        if (findOmInType) {
          filter.setHomologation(findOmInType);
          filter.setChipHomologation(
            Array.from(new Set([...filter.chipHomologation, findOmInType]))
          );
        }
      }
      if (params.brands?.includes('om-') && !filter.homologation && filter.chipHomologation.length === 0) {
        const findOmBrand = goodsTyre._homologation?.find(
          (homologation:string) => 
          createStringUrl(homologation.toLocaleLowerCase()) === params.brands?.slice(3, params.brands?.length));
        if (findOmBrand) {
          filter.setHomologation(findOmBrand);
          filter.setChipHomologation(
            Array.from(new Set([...filter.chipHomologation, findOmBrand]))
          );
        }
      }
      if (params.width?.includes('om-') && !filter.homologation && filter.chipHomologation.length === 0) {
        const findOmWidth = goodsTyre._homologation?.find(
          (homologation:string) => 
          createStringUrl(homologation.toLocaleLowerCase()) === params.width?.slice(3, params.width?.length));
        if (findOmWidth) {
          filter.setHomologation(findOmWidth);
          filter.setChipHomologation(
            Array.from(new Set([...filter.chipHomologation, findOmWidth]))
          );
        }
      }
      if (params.height?.includes('om-') && !filter.homologation && filter.chipHomologation.length === 0) {
        const findOmHeight = goodsTyre._homologation?.find(
          (homologation:string) => 
          createStringUrl(homologation.toLocaleLowerCase()) === params.height?.slice(3, params.height?.length));
        if (findOmHeight) {
          filter.setHomologation(findOmHeight);
          filter.setChipHomologation(
            Array.from(new Set([...filter.chipHomologation, findOmHeight]))
          );
        }
      }
      if (params.diameter?.includes('om-') && !filter.homologation && filter.chipHomologation.length === 0) {
        const findOmDiameter = goodsTyre._homologation?.find(
          (homologation:string) => 
          createStringUrl(homologation.toLocaleLowerCase()) === params.diameter?.slice(3, params.diameter?.length));
        if (findOmDiameter) {
          filter.setHomologation(findOmDiameter);
          filter.setChipHomologation(
            Array.from(new Set([...filter.chipHomologation, findOmDiameter]))
          );
        }
      }
      if (params.loadindex?.includes('om-') && !filter.homologation && filter.chipHomologation.length === 0) {
        const findOmLoad = goodsTyre._homologation?.find(
          (homologation:string) => 
          createStringUrl(homologation.toLocaleLowerCase()) === params.loadindex?.slice(3, params.loadindex?.length));
        if (findOmLoad) {
          filter.setHomologation(findOmLoad);
          filter.setChipHomologation(
            Array.from(new Set([...filter.chipHomologation, findOmLoad]))
          );
        }
      }
      if (params.speedindex?.includes('om-') && !filter.homologation && filter.chipHomologation.length === 0) {
        const findOmSpeed = goodsTyre._homologation?.find(
          (homologation:string) => 
          createStringUrl(homologation.toLocaleLowerCase()) === params.speedindex?.slice(3, params.speedindex?.length));
        if (findOmSpeed) {
          filter.setHomologation(findOmSpeed);
          filter.setChipHomologation(
            Array.from(new Set([...filter.chipHomologation, findOmSpeed]))
          );
        }
      }
      if (params.reinforced?.includes('om-') && !filter.homologation && filter.chipHomologation.length === 0) {
        const findReinforcedOm = goodsTyre._homologation?.find(
          (homologation:string) => 
          createStringUrl(homologation.toLocaleLowerCase()) === params.reinforced?.slice(3, params.reinforced?.length));
        if (findReinforcedOm) {
          filter.setHomologation(findReinforcedOm);
          filter.setChipHomologation(
            Array.from(new Set([...filter.chipHomologation, findReinforcedOm]))
          );
        }
      }
      if (params.om?.includes('om-') && !filter.homologation && filter.chipHomologation.length === 0) {
        const findOm = goodsTyre._homologation?.find(
          (homologation:string) => 
          createStringUrl(homologation.toLocaleLowerCase()) === params.om?.slice(3, params.om?.length));
        if (findOm) {
          filter.setHomologation(findOm);
          filter.setChipHomologation(
            Array.from(new Set([...filter.chipHomologation, findOm]))
          );
        }
      }
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
    //goodsWheel
  ]);

  // useEffect(() => {
  //   let isMounted = false;
  //   const getTyreItemFromPath = async() => {
  //     if(!isMounted) {
  //       
  //       }
  //     }
  //   };
  //   getTyreItemFromPath();
  //   return () => {
  //     isMounted = true;
  //   };
  // },[
  //   filter,
  //   // goodsTyre._brands,
  //   // goodsTyre._diameter,
  //   // goodsTyre._height,
  //   // goodsTyre._width,
  //   goodsTyre,
  //   params.brands,
  //   params.diameter,
  //   params.height,
  //   params.season,
  //   params.type,
  //   params.width
  // ]);

  useEffect(() => {
    let isMounted = false;
    const createNewTyrePath = async() => {
      if(!isMounted) {
        if (location.pathname.includes('tyres')) {
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
        if (location.pathname.includes('wheels')) {
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

          const wheelCatalogPath: string | undefined = 
          `${CATALOG_WHEELS_ROUTE}${filter.season && !filter.season.includes(',') ? `/${toStringUrlSeason}` : '' }${filter.studded && !filter.studded.includes(',') ? `/${toStringUrlStudded}` : '' }${filter.vehicle_type && !filter.vehicle_type.includes(',') ? `/${toStringUrlTypeVehicle}` : ''}${filter.brands && !filter.brands.includes(',') ? `/${toStringUrlBrand}` : ''}${filter.width ? `/w${toStringUrlWidth}` : ''}${filter.height ? `/h${toStringUrlHeight}` : ''}${filter.diameter ? `/r${toStringUrlDiameter}` : ''}${filter.load_index && !filter.load_index.includes(',') ? `/li-${toStringUrlLoadIndex}` : '' }${filter.speed_index && !filter.speed_index.includes(',') ? `/si-${toStringUrlSpeedIndex}` : '' }${filter.reinforced && !filter.reinforced.includes(',') ? `/xl-${toStringUrlReinforced}` : '' }${filter.homologation && !filter.homologation.includes(',') ? `/om-${toStringUrlOm}` : '' }`;
        // const paramsWheel =
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
              wheelCatalogPath, 
            //  paramsTyre
            //)
          );
        }
      }
    };
    createNewTyrePath();
    return () => {
      isMounted = true;
    };
  },[
    history,
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
  ]);

  useEffect(() =>{
    let isMounted = false;
    const loadMaintask = async() => {
      const taskLoad: any[] = [
        //getTyresWithoutOffset,
        //getTyresCountAll,
        getWheelsWithoutOffset,
      ];
      let i:number = 0;
      while(taskLoad.length > i) {
        if (!isMounted && taskLoad[i] === getWheelsWithoutOffset) {
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

          goodsWheel?.setWheelsFilter(wheelFilterGoods);
          goodsWheel._wheels_filter.map((item: any) => 
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
          page.loadMore > 0 ? goodsWheel?.setWheels(
            [...goodsWheel._wheels, 
              ...wheelFilterGoods.splice(page.offset, page.limit)] 
            ) : goodsWheel?.setWheels(
              wheelFilterGoods.splice(page.offset, page.limit));

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
    loadMaintask();
    return () => {
        isMounted = true;
    };
  },
  [
    filter, 
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
    page.offset
  ]);

  const handleFilterTyreChange = (e: any) => {
    console.log(e.currentTarget.value);
  }  

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
  
  //console.log('FILTER_URL_GET: ', filterURLGet);
  console.log('PARAMS: ', params);
  console.log('PARAMS_WIDTH: ', params.width);
  console.log('PARAMS_HEIGHT: ', params.height);
  console.log('PARAMS_DIAMETER: ', params.diameter);
  console.log('PARAMS_BRANDS: ', params.brands);
  console.log('PARAMS_SEASON: ', params.season);
  console.log('PARAMS_TYPE: ', params.type);
  console.log('LOCATION: ', location.pathname);
  //console.log('SEASON: ', tyreSeasonCat(params.season));
  // console.log('CATALOG_CLOSE_FILTER: ', stateFilter);
  console.log('FILTER_WIDTH: ', filter.width);
  console.log('FILTER_CHIP_WIDTH: ', filter.chipWidth);
  console.log('FILTER_BRANDS: ', filter.brands);
  console.log('FILTER_CHIP_BRANDS: ', filter.chipBrands);
  console.log('FILTER_SEASON: ', filter.season);
  console.log('FILTER_CHIP_SEASON: ', filter.chipSeason);
  // console.log('FILTER_HEIGHT: ', filter.height);
  // console.log('FILTER_DIAMETER: ', filter.diameter,);
  // console.log('GET_TYRES:', goodsTyre._tyres);
  // console.log('TYRES_FILTER: ', goodsTyre._tyres_filter);
  //console.log('TYRES_FILTER_WIDTH: ', goodsTyre._width);
  // console.log('TYRES_FILTER_HEIGHT: ', goodsTyre._height);
  // console.log('TYRES_FILTER_DIAMETER: ', goodsTyre._diameter);
  // console.log('TYRES_FILTER_BRANDS: ', goodsTyre._brands);
    return (
      <div className='catalogTyres'
        onClick={closeFilter}
      >
        <div className='a'>
        {location.pathname.includes('tyres') ?
          <BreadCrumbs 
            route={['/','/tyres', `${params ?? null}`]} 
            hrefTitle={
              ['Головна','Шини',
            //`${(params.category) ?? null}`
          ]}
          />
        : null  
        }
        {location.pathname.includes('wheels') ?
          <BreadCrumbs 
            route={['/','/wheels', `${params ?? null}`]} 
            hrefTitle={
              ['Головна','Диски',
            //`${(params.category) ?? null}`
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
          <ReviewsMain props={'Відгуки клієнтів'} 
            prevBtnAction={() => console.log('REVIEW_PREV')} 
            nextBtnAction={() => console.log('REVIEW_NEXT')}          
          >
          {/* <ReviewsGoods reviewExtend={true} btnLeft={undefined} btnRight={undefined}/> */}
          </ReviewsMain>
        </div>
        <div className='e'>
          
        </div>  
      </div>
    );
});

export default CatalogTyresPage;