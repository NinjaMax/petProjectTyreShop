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
import { getTyresReviewLimit, getTyresWithoutOffset } from '../restAPI/restGoodsApi';
import MapDelivery from '../components/maps/MapDelivery';
import { getCityInRegionNovaPoshta, getWareHousesNovaPoshta } from '../restAPI/restNovaPoshtaAPI';
import {regionDelivery, regionNovaPoshata} from '../services/regionServiceDelivery';
import SpinnerCarRot from '../components/spinners/SpinnerCarRot';
import { getCityInRegionDelivery, getWareHousesDelivery } from '../restAPI/restDeliveryAPI';
import ButtonPrevNext from '../components/buttons/ButtonPrevNext';

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
  const {goodsTyre, filter} = useContext<any | null>(Context);
  const {page} = useContext<any | null>(Context);
  const params = useParams<any>();
  const location = useLocation();
  const history = useHistory();
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
  
  useEffect(() => {
    let isMounted = false;
    const loadMaintask = async() => {
      const taskLoad: any[] = [
        getTyresWithoutOffset,  
        //getTyresCountAll,
        getTyresReviewLimit,
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
        
          goodsTyre?.setTotalCount(tyreFilterGoods.rows.length);
          tyreFilterGoods.rows.map((item: any) => 
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
              ...tyreFilterGoods.rows.splice(page.offset, page.limit)] 
            ) : goodsTyre?.setTyres(
              tyreFilterGoods.rows.splice(page.offset, page.limit));

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
          setCityCenterRegion(getRegionItem[2]);
          const getRefRegionNP = regionNovaPoshata(getRegionItem[1]);
          setNovaPoshtaRegion(getRefRegionNP);
          const getRefRegionDelivery = regionDelivery(getRegionItem[1]);
          setDeliveryRegion(getRefRegionDelivery);
        }
      } 
      if (!isMounted && novaPoshtaRegion && cityRegion) {
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
          
          for (let index = 0; index < regionCityList.length; index++) {
            let getCityWareHouse = await getWareHousesNovaPoshta(
            {
              MainDescription: regionCityList[index].Description,
              DeliveryCity :''
            });
            
            if (getCityWareHouse.info.totalCount !== 0 && getCityWareHouse.data.length !== 0 &&
              getCityWareHouse.data[0].SettlementAreaDescription === region &&
              getCityWareHouse.data[0].SettlementRef === regionCityList[index].Ref
              ) {
              regionFilteredCityList.push(regionCityList[index]);
              let cityRef = regionCityList[index].Ref;
              let getCityDepart = getCityWareHouse.data.filter((item: any) => item.CityDescription === cityRegion 
                && item.SettlementAreaDescription === region && item.SettlementRef === cityRef
              );
              if (getCityDepart.length > 0) {
                cityDepartData.push(...getCityDepart);
              }
            }
            
          };
          const getCityMarkerData = regionFilteredCityList.find((item: any) => item.Description === cityRegion);
          setCityMarkerData(getCityMarkerData);
          setNovaPoshtaCityInRegion([...regionFilteredCityList]);
          setNovaPoshtaWareHouseList([...cityDepartData]);
          
          regionCityList = null;
          regionFilteredCityList = null;
          cityDepartData = null;       
        } catch (error) {
          console.log('NOVAPOSHTA_SET_REGION_ERROR: ', error);
        }
      }   
      if (!isMounted && deliveryRegion && cityRegion) {
        try {
          let getCountRegionCityD: any = await getCityInRegionDelivery(deliveryRegion);
          if (getCountRegionCityD.status === true) {
            let cityPresent = getCountRegionCityD.data.find((item: any) => item.name === cityRegion);
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
    }
    loadRegionData();
    return () => {
        isMounted = true;
    };
  },[cityRegion, deliveryRegion, novaPoshtaRegion, region]);

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

  //console.log('DELIVERY: ', deliveryWareHouseList);

  return (
    <div className='deliveryGoodsPage'
    onClick={closeFilter}
    >
      <div className='aDev'>
        <BreadCrumbs 
          route={['/','/delivery-pay', '/delivery']} 
          hrefTitle={['Інтернет-магазин SkyParts','Доставка оплата', `Доставка шин в ${cityRegion}`]}
        /> 
      </div>
      <div className='hDev'>
        <h2>Купити шини {cityRegion}</h2> 
        {cityRegion && cityRegion === cityCenterRegion ?
        <span 
          className='deliveryGoodsPageHtitle' 
          onClick={moveToDeliveriRegion}
        >
          Доставка шин в інші міста {region}
        </span> 
        : <span 
            className='deliveryGoodsPageHtitle' 
            onClick={moveToDeliveriRegion}
          >
          Доставка шин в інші областя України
          </span>
        }
      </div>
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
        <h3> Способи доставки шин в {cityRegion} </h3> 
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
        { tabDelivery === 'Делівері' ?
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
              className={ tabDelivery === 'Делівері' ?
                'deliveryGoodsDeliveryChooseBtn active' :
                'deliveryGoodsDeliveryChooseBtn'
              }
              onClick={chooseDelivery}
            >
              Делівері
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
                data-position={[Number(item.Latitude),Number(item.Longitude),item.Description,'тел: '+ item.Phone]} 
              >
                {item.Description}<br/> тел: {item.Phone}
              </li>
            </ul>  
          </div>
          ))
          : null
          }
          {deliveryWareHouseList && tabDelivery === 'Делівері' ? 
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
        <h3>Доставка шин в інші міста {region}</h3> 
        : <h3>Доставка шин в інші областя України</h3>
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
            createStringUrl(`${item.Description} ${region}`)}
            data-region={`${item.Description},${region},${cityRegion}`}
            onClick={addDeliveryLink}
            title={`Доставка шин дисків акб автохіміі в ${item.Description}`}
          >
            {item.Description}
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
            createStringUrl('Сімферопіль АРК')}
            data-region='Сімферопіль,АРК,Сімферопіль'
            onClick={addDeliveryLink}
            title='Доставка шин дисків акб автохіміі в АРК'
          >
            Шини в АРК
          </a>
        </li>
        <li>
          <a href={DELIVERY_GOODS_ROUTE + '/' + 
            createStringUrl('Вінниця Вінницька область')}
            data-region='Вінниця,Вінницька область,Вінниця'
            onClick={addDeliveryLink}
            title='Доставка шин дисків акб автохіміі в Вінницю'
          >
            Шини в Вінниці
          </a>
        </li>
        <li>
          <a href={DELIVERY_GOODS_ROUTE + '/' + 
            createStringUrl('Луцьк Волинська область')}
            data-region='Луцьк,Волинська область,Луцьк'
            onClick={addDeliveryLink}
            title='Доставка шин дисків акб автохіміі в Луцьку'
          >
            Шини в Луцьку
          </a>
        </li>
        <li>
          <a href={DELIVERY_GOODS_ROUTE + '/' + 
            createStringUrl('Дніпро Дніпропетровська область')}
            data-region='Дніпро,Дніпропетровська область,Дніпро'
            onClick={addDeliveryLink}
            title='Доставка шин дисків акб автохіміі в Дніпрі'
          >
            Шини в Дніпрі
          </a>
        </li>
        <li>
          <a href={DELIVERY_GOODS_ROUTE + '/' + 
            createStringUrl('Краматорськ Донецька область')}
            data-region='Краматорськ,Донецька область,Краматорськ'
            onClick={addDeliveryLink}
            title='Доставка шин дисків акб автохіміі в Краматорську'
          >
            Шини в Краматорську
          </a>
        </li>
        <li>
          <a href={DELIVERY_GOODS_ROUTE + '/' + 
            createStringUrl('Житомир Житомирська область')}
            data-region='Житомир,Житомирська область,Житомир'
            onClick={addDeliveryLink}
            title='Доставка шин дисків акб автохіміі в Житомирі'
          >
            Шини в Житомирі
          </a>
        </li>
        <li>
          <a href={DELIVERY_GOODS_ROUTE + '/' + 
            createStringUrl('Ужгород Закарпатська область')}
            data-region='Ужгород,Закарпатська область,Ужгород'
            onClick={addDeliveryLink}
            title='Доставка шин дисків акб автохіміі в Ужгороді'
          >
            Шини в Ужгороді
          </a>
        </li>
          <li>
            <a href={DELIVERY_GOODS_ROUTE + '/' + 
              createStringUrl('Запоріжжя Запорізька область')}
              data-region='Запоріжжя,Запорізька область,Запоріжжя'
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
              data-region='Івано-Франківськ,Івано-Франківська область,Івано-Франківськ'
              onClick={addDeliveryLink}
              title='Доставка шин дисків акб автохіміі в Івано-Франківську'
            >
              Шини в Івано-Франківську
            </a>
          </li>
          <li>
            <a href={DELIVERY_GOODS_ROUTE + '/' + 
              createStringUrl('Київ Київська область')}
              data-region='Київ,Київська область,Київ'
              onClick={addDeliveryLink}
              title='Доставка шин дисків акб автохіміі в Київі'
            >
              Шини в Київі
            </a>
          </li>
          <li>
            <a href={DELIVERY_GOODS_ROUTE + '/' + 
              createStringUrl('Кропивницький Кіровоградська область')}
              data-region='Кропивницький,Кіровоградська область,Кропивницький'
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
              data-region='Луганськ,Луганська область,Луганськ'
              //onClick={addDeliveryLink}
              title='Доставка шин дисків акб автохіміі в Луганська область'
            >
              Луганськ - тимчасово не доступна
            </a>
          </li>
          <li>
            <a href={DELIVERY_GOODS_ROUTE + '/' + 
              createStringUrl('Львів Львівська область')}
              data-region='Львів,Львівська область,Львів'
              onClick={addDeliveryLink}
              title='Доставка шин дисків акб автохіміі в Львові'
            >
              Шини в Львові
            </a>
          </li>
          <li>
            <a href={DELIVERY_GOODS_ROUTE + '/' + 
              createStringUrl('Миколаїв Миколаївська область')}
              data-region='Миколаїв,Миколаївська область,Миколаїв'
              onClick={addDeliveryLink}
              title='Доставка шин дисків акб автохіміі в Миколаїві'
            >
              Шини в Миколаїві
            </a>
          </li>
          <li>
            <a href={DELIVERY_GOODS_ROUTE + '/' + 
              createStringUrl('Одеса Одеська область')}
              data-region='Одеса,Одеська область,Одеса'
              onClick={addDeliveryLink}
              title='Доставка шин дисків акб автохіміі в Одесі'
            >
              Шини в Одесі
            </a>
          </li>
          <li>
            <a href={DELIVERY_GOODS_ROUTE + '/' + 
              createStringUrl('Полтава Полтавська область')}
              data-region='Полтава,Полтавська область,Полтава'
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
              data-region='Рівне,Рівненська область,Рівне'
              onClick={addDeliveryLink}
              title='Доставка шин дисків акб автохіміі в Рівне'
            >
              Шини в Рівне
            </a>
          </li>
          <li>
            <a href={DELIVERY_GOODS_ROUTE + '/' + 
              createStringUrl('Суми Сумська область')}
              data-region='Суми,Сумська область,Суми'
              onClick={addDeliveryLink}
              title='Доставка шин дисків акб автохіміі в Сумах'
            >
              Шини в Сумах
            </a>
          </li>
          <li>
            <a href={DELIVERY_GOODS_ROUTE + '/' + 
              createStringUrl('Тернопіль Тернопільська область')}
              data-region='Тернопіль,Тернопільська область,Тернопіль'
              onClick={addDeliveryLink}
              title='Доставка шин дисків акб автохіміі в Тернополі'
            >
              Шини а Тернополі
            </a>
          </li>
          <li>
            <a href={DELIVERY_GOODS_ROUTE + '/' + 
              createStringUrl('Харків Харківська область')}
              data-region='Харків,Харківська область,Харків'
              onClick={addDeliveryLink}
              title='Доставка шин дисків акб автохіміі в Харкові'
            >
              Шини в Харкові
            </a>
          </li>
          <li>
            <a href={DELIVERY_GOODS_ROUTE + '/' + 
              createStringUrl('Херсон Херсонська область')}
              data-region='Херсон,Херсонська область,Херсон'
              onClick={addDeliveryLink}
              title='Доставка шин дисків акб автохіміі в Херсоні'
            >
              Шини в Херсоні
            </a>
          </li>
          <li>
            <a href={DELIVERY_GOODS_ROUTE + '/' + 
              createStringUrl('Хмельницький Хмельницька область')}
              data-region='Хмельницький,Хмельницька область,Хмельницький'
              onClick={addDeliveryLink}
              title='Доставка шин дисків акб автохіміі в Хмельницькому'
            >
              Шини в Хмельницькому
            </a>
          </li>
          <li>
            <a href={DELIVERY_GOODS_ROUTE + '/' + 
              createStringUrl('Черкаси Черкаська область')}
              data-region='Черкаси,Черкаська область,Черкаси'
              onClick={addDeliveryLink}
              title='Доставка шин дисків акб автохіміі в Черкасах'
            >
              Шини в Черкасах
            </a>
          </li>
          <li>
            <a href={DELIVERY_GOODS_ROUTE + '/' + 
              createStringUrl('Чернівці Чернівецька область')}
              data-region='Чернівці,Чернівецька область,Чернівці'
              onClick={addDeliveryLink}
              title='Доставка шин дисків акб автохіміі в Чернівцях'
            >
              Шини в Чернівцях
            </a>
          </li>
          <li>
            <a href={DELIVERY_GOODS_ROUTE + '/' + 
              createStringUrl('Чернігів Чернігівська область')}
              data-region='Чернігів,Чернігівська область,Чернігів'
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
      </div>
      <div className='fDev'>
        <ReviewsMain 
          props={'Відгуки кліентів'} 
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