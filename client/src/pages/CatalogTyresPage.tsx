import React, { useContext, useEffect, useState } from 'react';
import '../css/CatalogTyresPage.css';
import CatalogTyres from '../components/catalogs/CatalogTyres';
import FilterCatalogTyres from '../components/filterCatalog/FilterCatalogTyres';
import ReviewsMain from '../components/reviews/ReviewsMain';
import ReviewsGoods from '../components/reviews/ReviewsGoods';
import BreadCrumbs from '../components/BreadCrumbs';
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import { generatePath, useLocation, useParams } from 'react-router-dom';
import { yieldToMain } from '../restAPI/postTaskAdmin';
import { getTyresCountAll, getTyresWithoutOffset, getWheelsWithoutOffset} from '../restAPI/restGoodsApi';
import { Context } from '../context/Context';
import { observer } from 'mobx-react-lite';
import { tyreDiameterCat, tyreSeasonCat, tyreVehicleTypeCat } from '../services/tyresCatService';
import CatalogWheels from '../components/catalogs/CatalogWheels';
import FilterCatalogWheels from '../components/filterCatalog/FilterCatalogWheels';

const CatalogTyresPage = observer(({crumbsItem}: any) => {
  const {goodsTyre, goodsWheel, filter} = useContext<any | null>(Context);
  const {page} = useContext<any | null>(Context);
  const [paramUrl, setParamUrl] = useState(0);
  const [stateFilter, setStateFilter]=useState(false);
  const params = useParams<any>();
  const location = useLocation();
    
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
      // // const tyreCatType = tyreVehicleTypeCat(params.category);
      // // console.log('CAT_VEHICLE_TYPE: ', tyreCatType);
      // // const tyreCatSeason = tyreSeasonCat(params.season);
      // // console.log('CAT_SEASON: ', tyreCatSeason);
      // // const tyreCatDiameter = tyreDiameterCat(params.diameter);
      // // console.log('CAT_DIAM: ', tyreCatDiameter);
      // // if (tyreCatType) {
      // //   filter.setVehicleType(tyreCatType);
      // // }
      // // if (tyreCatSeason) {
      // //   filter.setSeason(tyreCatSeason);
      // // }
      // // if (tyreCatDiameter) {
      // //   filter.setDiameter(tyreCatDiameter);
      // // }
      // if (params.season?.includes('w')) {
      //   const findWidth = goodsTyre._width?.find((width:string) => width === params.season?.includes('w-'));
      //   if (findWidth) {
      //     filter.setWidth(findWidth);
      //   }
      //   console.log('_WIDTH: ', goodsTyre._width);
      //   console.log('SET_FILTER_WIDTH: ', findWidth);
      //   console.log('GET_FILTER_WIDTH: ', params.season?.slice(1, params.season?.length));
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
          // generatePath(`/${location.pathname}/:season(season)/:brands`, {
          //   season: filter.season,
          //   brands: filter.brands
          // })
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
            //filter.setFilterCount(filter.filterCount + 1);
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
            // filter.setFilterCount(filter.filterCount + 1);
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
          // const tyreCatType = tyreVehicleTypeCat(params.category);
          // console.log('CAT_VEHICLE_TYPE: ', tyreCatType);
          // const tyreCatSeason = tyreSeasonCat(params.season);
          // console.log('CAT_SEASON: ', tyreCatSeason);
          // const tyreCatDiameter = tyreDiameterCat(params.diameter);
          // console.log('CAT_DIAM: ', tyreCatDiameter);
          // if (tyreCatType) {
          //   filter.setVehicleType(tyreCatType);
          // }
          // if (tyreCatSeason) {
          //   filter.setSeason(tyreCatSeason);
          // }
          // if (tyreCatDiameter) {
          //   filter.setDiameter(tyreCatDiameter);
          // }


          
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

        if (params.season) {
          const tyreCatSeason = tyreSeasonCat(params.season);
          // const findSeason = goodsTyre._season?.find((season:string) => season === params.season);
          // if (findSeason) {
          //   filter.setSeason(findSeason);
          // }
          if (tyreCatSeason) {
            filter.setSeason(tyreCatSeason);
          }
        }
        if (params.season) {
          const tyreCatType = tyreVehicleTypeCat(params.typeVehicle);
          // const findSeason = goodsTyre._vehicle_type?.find((vehicleType:string) => vehicleType === params.season);
          // if (findSeason) {
          //   filter.setVehicleType(findSeason);
          // }
          if (tyreCatType) {
            filter.setVehicleType(tyreCatType);
          }
        }
        if (params.typeVehicle) {
          const tyreCatType = tyreVehicleTypeCat(params.typeVehicle);
          // const findVehicleInType = goodsTyre._vehicle_type?.find((vehicleType:string) => vehicleType.toLocaleLowerCase() === params.typeVehicle);
          // if (findVehicleInType) {
          //   filter.setVehicleType(findVehicleInType);
          // }
          if (tyreCatType) {
            filter.setVehicleType(tyreCatType);
          }
        }
        if (params.season) {
          const findBrands = goodsTyre._brands?.find((brands:string) => brands.toLocaleLowerCase() === params.season);
          if (findBrands) {
            filter.setBrands(findBrands);
          }
        }
        if (params.typeVehicle) {
          const findBrandsInType = goodsTyre._brands?.find((brands:string) => brands.toLocaleLowerCase() === params.typeVehicle);
          if (findBrandsInType) {
            filter.setBrands(findBrandsInType);
          }
        }
        if (params.brands) {
          const findBrand = goodsTyre._brands?.find((brands:string) => brands.toLocaleLowerCase() === params.brands);
          if (findBrand) {
            filter.setBrands(findBrand);
          }
        }
        if (params.season?.includes('w')) {
          const findWidth = goodsTyre._width?.find((width:string) => width === params.season?.slice(1, params.season?.length));
          if (findWidth) {
            filter.setWidth(findWidth);
          }
        }
        if (params.typeVehicle?.includes('w')) {
          const findWidthInType = goodsTyre._width?.find((width:string) => width === params.typeVehicle?.slice(1, params.typeVehicle?.length));
          if (findWidthInType) {
            filter.setWidth(findWidthInType);
          }
        }
        if (params.brands?.includes('w')) {
          const findWidthInBrand = goodsTyre._width?.find((width:string) => width === params.brands?.slice(1, params.brands?.length));
          if (findWidthInBrand) {
            filter.setWidth(findWidthInBrand);
          }
        }
        if (params.width?.includes('w')) {
          const findWidth = goodsTyre._width?.find((width:string) => width === params.width?.slice(1, params.width?.length));
          if (findWidth) {
            filter.setWidth(findWidth);
          }
        }
        if (params.season?.includes('h')) {
          const findHeight = goodsTyre._height?.find((height:string) => height === params.season?.slice(1, params.season?.length));
          if (findHeight) {
            filter.setHeight(findHeight);
          }
        }
        if (params.typeVehicle?.includes('h')) {
          const findHeightInType = goodsTyre._height?.find((height:string) => height === params.typeVehicle?.slice(1, params.typeVehicle?.length));
          if (findHeightInType) {
            filter.setHeight(findHeightInType);
          }
        }
        if (params.brands?.includes('h')) {
          const findHeightInBrand = goodsTyre._height?.find((height:string) => height === params.brands?.slice(1, params.brands?.length));
          if (findHeightInBrand) {
            filter.setHeight(findHeightInBrand);
          }
        }
        if (params.width?.includes('h')) {
          const findHeightInBrand = goodsTyre._height?.find((height:string) => height === params.width?.slice(1, params.width?.length));
          if (findHeightInBrand) {
            filter.setHeight(findHeightInBrand);
          }
        }
        if (params.height?.includes('h')) {
          const findHeight = goodsTyre._height?.find((height:string) => height === params.height?.slice(1, params.height?.length));
          if (findHeight) {
            filter.setHeight(findHeight);
          }
        }
        if (params.season?.includes('r')) {
          const findDiameter = goodsTyre._diameter?.find((diameter:string) => diameter === params.season?.slice(1, params.season?.length));
          if (findDiameter) {
            filter.setDiameter(findDiameter);
          }
        }
        if (params.typeVehicle?.includes('r')) {
          const findDiameterInType = goodsTyre._diameter?.find((diameter:string) => diameter === params.typeVehicle?.slice(1, params.typeVehicle?.length));
          if (findDiameterInType) {
            filter.setDiameter(findDiameterInType);
          }
        }
        if (params.brands?.includes('r')) {
          const findDiameterInBrand = goodsTyre._diameter?.find((diameter:string) => diameter === params.brands?.slice(1, params.brands?.length));
          if (findDiameterInBrand) {
            filter.setDiameter(findDiameterInBrand);
          }
        }
        if (params.width?.includes('r')) {
          const findDiameterInBrand = goodsTyre._diameter?.find((diameter:string) => diameter === params.width?.slice(1, params.width?.length));
          if (findDiameterInBrand) {
            filter.setDiameter(findDiameterInBrand);
          }
        }
        if (params.height?.includes('r')) {
          const findDiameterInBrand = goodsTyre._diameter?.find((diameter:string) => diameter === params.height?.slice(1, params.height?.length));
          if (findDiameterInBrand) {
            filter.setDiameter(findDiameterInBrand);
          }
        }
        if (params.diameter?.includes('r')) {
          const findDiameter = goodsTyre._diameter?.find((diameter:string) => diameter === params.diameter?.slice(1, params.height?.length));
          if (findDiameter) {
            filter.setDiameter(findDiameter);
          }
        }
        // if(!isMounted && taskLoad[i] === getWheelsWithoutOffset) {
        //   let wheelFilterGoods: any = await taskLoad[i](
        //     filter.width,
        //     filter.diameter,
        //     filter.bolt_count,
        //     filter.bolt_count_pcd,
        //     filter.brands,
        //     filter.price,
        //     filter.type,
        //     filter.color,
        //     filter.dia,
        //     filter.et,
        //     filter.pcd,
        //     filter.pcd2,
        //     filter.sort,
        //   );
        //   let setWidthFilter:any[] = [];
        //   //let setHightFilter:any[] = [];
        //   let setDiameterFilter:any[] = [];
        //   let setBrandFilter:any[] = [];
        //   let setBoltCountFilter :any[] = [];
        //   let setBoltCountPcdFilter :any[] = [];
        //   let setColorFilter :any[] = [];
        //   let setDiaFilter: any[] = [];
        //   let setEtFilter :any[] = [];
        //   let setPcdFilter :any[] = [];
        //   let setPcd2Filter :any[] = [];
        //   let setTypeFilter :any[] = [];

        //   //console.log('TYRE_FILTER_GET: ', tyreFilterGoods);
        //   page.loadMore > 0 ? goodsWheel?.setWheels(
        //   [...goodsWheel._wheels, 
        //     ...wheelFilterGoods.splice(page.offset, page.limit)] 
        //   ) : goodsWheel?.setWheels(
        //     wheelFilterGoods.splice(page.offset, page.limit));

        //     goodsWheel?.setWheelsFilter(wheelFilterGoods);
        //     goodsWheel._wheels_filter.map((item: any) => 
        //   { return (
        //     setWidthFilter.push(item.width.width),
        //     //setHightFilter.push(item.height.height),
        //     setDiameterFilter.push(item.diameter.diameter),
        //     setBrandFilter.push(item.wheel_brand.brand),
        //     setBoltCountFilter.push(item.bolt_count.bolt_count),
        //     setBoltCountPcdFilter.push(item.bolt_count_pcd.bolt_count_pcd),
        //     setColorFilter.push(item.color.color),
        //     setDiaFilter.push(item.dia.dia),
        //     setEtFilter.push(item.et.et),
        //     setPcdFilter.push(item.pcd.pcd),
        //     setPcd2Filter.push(item.pcd2.pcd2),
        //     setTypeFilter.push(item.type.type)
        //     )
        //   })
        //   if (filter.width) {
        //     goodsWheel?.setWidth(
        //       Array.from(new Set(
        //         [...goodsWheel._width, ...setWidthFilter]
        //       )).sort(
        //         (a: any, b: any) => a.localeCompare(b))
        //     );
        //     filter.setWidthSearch(goodsWheel._width);
        //   } else {
        //     goodsWheel?.setWidth(
        //       Array.from(new Set(setWidthFilter)).sort(
        //       (a: any, b: any) => a.localeCompare(b))
        //     );
        //     filter.setWidthSearch(goodsWheel._width);
        //   }
        //   if (filter.diameter) {
        //     goodsWheel?.setDiameter(
        //       Array.from(new Set(
        //         [...goodsWheel._diameter, ...setDiameterFilter]
        //       )).sort(
        //         (a: any, b: any) => a.localeCompare(b))
        //     );
        //     filter.setDiameterSearch(goodsWheel._diameter);
        //   } else {
        //     goodsWheel?.setDiameter(
        //       Array.from(new Set(setDiameterFilter)).sort(
        //         (a: any, b: any) => a.localeCompare(b))
        //     );
        //     filter.setDiameterSearch(goodsWheel._diameter);
        //   }
        //   if (filter.brands) {
        //     goodsWheel?.setBrands(
        //       Array.from(new Set(
        //         [...goodsWheel._brands, ...setBrandFilter]
        //       )).sort(
        //         (a: any, b: any) => a.localeCompare(b))
        //     );
        //     filter.setBrandSearch(goodsWheel._brands);
        //   } else {
        //     goodsWheel?.setBrands(
        //       Array.from(new Set(setBrandFilter)).sort(
        //         (a, b) => a.localeCompare(b))
        //     );
        //     filter.setBrandSearch(goodsWheel._brands);   
        //   }
        //   if (filter.bolt_count) {
        //     goodsWheel?.setBoltCount(
        //       Array.from(new Set(
        //         [...goodsWheel._bolt_count, ...setBoltCountFilter]
        //       ))
        //     )
        //   } else {
        //     goodsWheel?.setBoltCount(
        //       Array.from(new Set(setBoltCountFilter))
        //     )
        //   }
        //   if (filter.bolt_count_pcd) {
        //     goodsWheel?.setBoltCountPcd(
        //       Array.from(new Set(
        //         [...goodsWheel._bolt_count_pcd, ...setBoltCountPcdFilter]
        //       ))
        //     )
        //   } else {
        //     goodsWheel?.setBoltCountPcd(
        //       Array.from(new Set(setBoltCountPcdFilter))
        //     )
        //   }
        //   if (filter.color) {
        //     goodsWheel?.setColor(
        //       Array.from(new Set(
        //         [...goodsWheel._color, ...setColorFilter]
        //       ))
        //     )
        //   } else {
        //     goodsWheel?.setColor(
        //       Array.from(new Set(setColorFilter))
        //     )
        //   }
        //   if (filter.dia) {
        //     goodsWheel?.setDia(
        //       Array.from(new Set(
        //         [...goodsWheel._dia, ...setDiaFilter]
        //       )).sort(
        //         (a: any, b: any) => a.localeCompare(b))
        //     )
        //   } else {
        //     goodsWheel?.setDia(
        //       Array.from(new Set(setDiaFilter)).sort(
        //         (a: any, b: any) => a.localeCompare(b))
        //     )
        //   }
        //   if (filter.et) {
        //     goodsWheel?.setEt(
        //       Array.from(new Set(
        //         [...goodsWheel._et, ...setEtFilter]
        //       )).sort(
        //         (a: any, b: any) => a.localeCompare(b))
        //     )
        //   } else {
        //     goodsWheel?.setEt(
        //       Array.from(new Set(setEtFilter)).sort(
        //         (a: any, b: any) => a.localeCompare(b))
        //     )
        //   }
        //   if (filter.pcd) {
        //     goodsWheel?.setPcd(
        //       Array.from(new Set(
        //         [...goodsWheel._pcd, ...setPcdFilter]
        //       ))
        //     )
        //   } else {
        //     goodsWheel?.setPcd(
        //       Array.from(new Set(setPcdFilter))
        //     )
        //   }
        //   if (filter.pcd2) {
        //     goodsWheel?.setPcd2(
        //       Array.from(new Set(
        //         [...goodsWheel._pcd2, ...setPcd2Filter]
        //       ))
        //     )
        //   } else {
        //     goodsWheel?.setPcd2(
        //       Array.from(new Set(setPcd2Filter))
        //     )
        //   }
        //   if (filter.type) {
        //     goodsWheel?.setType(
        //       Array.from(new Set(
        //         [...goodsWheel._type, ...setTypeFilter]
        //       ))
        //     )
        //   } else {
        //     goodsWheel?.setType(
        //       Array.from(new Set(setTypeFilter))
        //     )
        //   }
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

  useEffect(() =>{
    let isMounted = false;
    const loadMaintask = async() => {
      const taskLoad: any[] = [
        //getTyresWithoutOffset,
        //getTyresCountAll,
        getWheelsWithoutOffset,
      ];
      // const tyreCatType = tyreVehicleTypeCat(params.category);
      // console.log('CAT_TYPE: ', tyreCatType);
      // const tyreCatSeason = tyreSeasonCat(params.category);
      // console.log('CAT_SEASON: ', tyreCatSeason);
      // const tyreCatDiameter = tyreDiameterCat(params.category);
      // console.log('CAT_DIAM: ', tyreCatDiameter);
      // if (tyreCatType) {
      //   filter.setVehicleType(tyreCatType);
      // }
      // if (tyreCatSeason) {
      //   filter.setSeason(tyreCatSeason);
      // }
      // if (tyreCatDiameter) {
      //   filter.setDiameter(tyreCatDiameter);
      // }
      let i:number = 0;
      while(taskLoad.length > i) {
        // if(!isMounted && taskLoad[i] === getTyresWithoutOffset) {
        //   let tyreFilterGoods: any = await taskLoad[i](
        //     filter.width,
        //     filter.height,
        //     filter.diameter,
        //     filter.season,
        //     filter.brands,
        //     filter.price,
        //     filter.vehicle_type,
        //     filter.speed_index,
        //     filter.load_index,
        //     filter.studded,
        //     filter.run_flat,
        //     filter.homologation,
        //     filter.reinforced,
        //     filter.sort,
        //   );
        //   let setWidthFilter:any[] = [];
        //   let setHightFilter:any[] = [];
        //   let setDiameterFilter:any[] = [];
        //   let setBrandFilter:any[] = [];
        //   let setSeasonFilter :any[] = [];
        //   let setVehicleTypeFilter :any[] = [];
        //   let setSpeedIndexFilter :any[] = [];
        //   let setLoadIndexFilter: any[] = [];
        //   let setHomologationFilter :any[] = [];
        //   let setReinforcedFilter :any[] = [];
        //   let setRunFlatFilter :any[] = [];
        //   let setStuddedFilter :any[] = [];

        //   //console.log('TYRE_FILTER_GET: ', tyreFilterGoods);
        //   page.loadMore > 0 ? goodsTyre?.setTyres(
        //   [...goodsTyre._tyres, 
        //     ...tyreFilterGoods.splice(page.offset, page.limit)] 
        //   ) : goodsTyre?.setTyres(
        //     tyreFilterGoods.splice(page.offset, page.limit));

        //   goodsTyre?.setTyresFilter(tyreFilterGoods);
        //   goodsTyre._tyres_filter.map((item: any) => 
        //   { return (
        //     setWidthFilter.push(item.width.width),
        //     setHightFilter.push(item.height.height),
        //     setDiameterFilter.push(item.diameter.diameter),
        //     setBrandFilter.push(item.tyre_brand.brand),
        //     setSeasonFilter.push(item.season.season_ua),
        //     setVehicleTypeFilter.push(item.vehicle_type.vehicle_type_ua),
        //     setSpeedIndexFilter.push(item.speed_index.speed_index_with_desc),
        //     setLoadIndexFilter.push(item.load_index.load_index_with_desc),
        //     setHomologationFilter.push(item.homologation.homologation),
        //     setReinforcedFilter.push(item.reinforce.reinforce),
        //     setRunFlatFilter.push(item.run_flat.run_flat),
        //     setStuddedFilter.push(item.studded.studded)
        //     )
        //   })
        //   if (filter.width) {
        //     goodsTyre?.setWidth(
        //       Array.from(new Set(
        //         [...goodsTyre._width, ...setWidthFilter]
        //       )).sort(
        //         (a: any, b: any) => a.localeCompare(b))
        //     );
        //     filter.setWidthSearch(goodsTyre._width);
        //   } else {
        //     goodsTyre?.setWidth(
        //       Array.from(new Set(setWidthFilter)).sort(
        //       (a: any, b: any) => a.localeCompare(b))
        //     );
        //     filter.setWidthSearch(goodsTyre._width);
        //   }
        //   if (filter.height) {
        //     goodsTyre?.setHeight(
        //       Array.from(new Set(
        //         [...goodsTyre._height, ...setHightFilter]
        //       )).sort(
        //         (a: any, b: any) => a.localeCompare(b))
        //     );
        //     filter.setHeightSearch(goodsTyre._height);
        //   } else {
        //     goodsTyre?.setHeight(
        //       Array.from(new Set(setHightFilter)).sort(
        //         (a: any, b: any) => a.localeCompare(b))
        //     );
        //     filter.setHeightSearch(goodsTyre._height);
        //   }
        //   if (filter.diameter) {
        //     goodsTyre?.setDiameter(
        //       Array.from(new Set(
        //         [...goodsTyre._diameter, ...setDiameterFilter]
        //       )).sort(
        //         (a: any, b: any) => a.localeCompare(b))
        //     );
        //     filter.setDiameterSearch(goodsTyre._diameter);
        //   } else {
        //     console.log('DIAMETER: ', goodsTyre._diameter);
        //     console.log('DIAMETER_NO_FILTER: ', setDiameterFilter);
        //     goodsTyre?.setDiameter(
        //       Array.from(new Set(setDiameterFilter)).sort(
        //         (a: any, b: any) => a.localeCompare(b))
        //     );
        //     filter.setDiameterSearch(goodsTyre._diameter);
        //   }
        //   if (filter.brands) {
        //     goodsTyre?.setBrands(
        //       Array.from(new Set(
        //         [...goodsTyre._brands, ...setBrandFilter]
        //       )).sort(
        //         (a: any, b: any) => a.localeCompare(b))
        //     );
        //     filter.setBrandSearch(goodsTyre._brands);
        //   } else {
        //     goodsTyre?.setBrands(
        //       Array.from(new Set(setBrandFilter)).sort(
        //         (a, b) => a.localeCompare(b))
        //     );
        //     filter.setBrandSearch(goodsTyre._brands);   
        //   }
        //   if (filter.season) {
        //     goodsTyre?.setSeason(
        //       Array.from(new Set(
        //         [...goodsTyre._season, ...setSeasonFilter]
        //       ))
        //     )
        //   } else {
        //     goodsTyre?.setSeason(
        //       Array.from(new Set(setSeasonFilter))
        //     )
        //   }
        //   if (filter.vehicle_type) {
        //     goodsTyre?.setVehicleType(
        //       Array.from(new Set(
        //         [...goodsTyre._vehicle_type, ...setVehicleTypeFilter]
        //       ))
        //     )
        //   } else {
        //     goodsTyre?.setVehicleType(
        //       Array.from(new Set(setVehicleTypeFilter))
        //     )
        //   }
        //   if (filter.studded) {
        //     goodsTyre?.setStudded(
        //       Array.from(new Set(
        //         [...goodsTyre._studded, ...setStuddedFilter]
        //       ))
        //     )
        //   } else {
        //     goodsTyre?.setStudded(
        //       Array.from(new Set(setStuddedFilter))
        //     )
        //   }
        //   if (filter.speed_index) {
        //     goodsTyre?.setSpeedIndex(
        //       Array.from(new Set(
        //         [...goodsTyre._speed_index, ...setSpeedIndexFilter]
        //       )).sort(
        //         (a: any, b: any) => a.localeCompare(b))
        //     )
        //   } else {
        //     goodsTyre?.setSpeedIndex(
        //       Array.from(new Set(setSpeedIndexFilter)).sort(
        //         (a: any, b: any) => a.localeCompare(b))
        //     )
        //   }
        //   if (filter.load_index) {
        //     goodsTyre?.setLoadIndex(
        //       Array.from(new Set(
        //         [...goodsTyre._load_index, ...setLoadIndexFilter]
        //       )).sort(
        //         (a: any, b: any) => a.localeCompare(b))
        //     )
        //   } else {
        //     goodsTyre?.setLoadIndex(
        //       Array.from(new Set(setLoadIndexFilter)).sort(
        //         (a: any, b: any) => a.localeCompare(b))
        //     )
        //   }
        //   if (filter.homologation) {
        //     goodsTyre?.setHomologation(
        //       Array.from(new Set(
        //         [...goodsTyre._homologation, ...setHomologationFilter]
        //       ))
        //     )
        //   } else {
        //     goodsTyre?.setHomologation(
        //       Array.from(new Set(setHomologationFilter))
        //     )
        //   }
        //   if (filter.run_flat) {
        //     goodsTyre?.setRunFlat(
        //       Array.from(new Set(
        //         [...goodsTyre._run_flat, ...setRunFlatFilter]
        //       ))
        //     )
        //   } else {
        //     goodsTyre?.setRunFlat(
        //       Array.from(new Set(setRunFlatFilter))
        //     )
        //   }
        //   if (filter.reinforced) {
        //     goodsTyre?.setReinforced(
        //       Array.from(new Set(
        //         [...goodsTyre._reinforced, ...setReinforcedFilter]
        //       ))
        //     )
        //   } else {
        //     goodsTyre?.setReinforced(
        //       Array.from(new Set(setReinforcedFilter))
        //     )
        //   }
        // }
        // if(!isMounted && taskLoad[i] === getTyresCountAll) {
        //   let tyreTotalCount: any = await taskLoad[i](
        //     filter.width,
        //     filter.height,
        //     filter.diameter,
        //     filter.season,
        //     filter.brands,
        //     filter.price,
        //     filter.vehicle_type,
        //     filter.speed_index,
        //     filter.load_index,
        //     filter.studded,
        //     filter.run_flat,
        //     filter.homologation,
        //     filter.reinforced,
        //   );
        //   goodsTyre?.setTotalCount(tyreTotalCount);
        //   //console.log('SET_TYRES_TOTALCOUNT: ', tyreTotalCount);
        // }
        if(!isMounted && taskLoad[i] === getWheelsWithoutOffset) {
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

  // generatePath(`/${location.pathname}/:season/:brands`, {
  //   season: filter.season || false,
  //   brands: filter.brands || false
  // })  
  //generatePath();
  const filterURLGet = localStorage.getItem('filterUrl');
  
  console.log('FILTER_URL_GET: ', filterURLGet);
  console.log('PARAMS: ', params);
  console.log('PARAMS_WIDTH: ', params.width);
  console.log('PARAMS_HEIGHT: ', params.height);
  console.log('PARAMS_DIAMETER: ', params.diameter);
  console.log('PARAMS_BRANDS: ', params.brands);
  console.log('PARAMS_SEASON: ', params.season);
  console.log('PARAMS_CATEGORY: ', params.category);
  console.log('LOCATION: ', location.pathname);
  // console.log('CATALOG_CLOSE_FILTER: ', stateFilter);
  // console.log('FILTER_WIDTH: ', filter.width);
  // console.log('FILTER_HEIGHT: ', filter.height);
  // console.log('FILTER_DIAMETER: ', filter.diameter,);
  // console.log('GET_TYRES:', goodsTyre._tyres);
  // console.log('TYRES_FILTER: ', goodsTyre._tyres_filter);
  // console.log('TYRES_FILTER_WIDTH: ', goodsTyre._width);
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