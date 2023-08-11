import React, { useContext, useEffect, useState } from 'react';
import '../css/Pages/Compare.css';
import { clearCompare, getCompare, getTyresById, getTyresModelRatingAvg } from '../restAPI/restGoodsApi';
import TyresCardList from '../components/cards/TyresCardList';
import { Context } from '../context/Context';
import { yieldToMain } from '../restAPI/postTaskAdmin';
import TyreCardSmall from '../components/cards/TyreCardSmall';
import ReviewsGoodsExtend from '../components/reviews/ReviewsGoodsExtend';
import { IRatingAvg } from './types/RatingModelAvg.type';

const Compare = () => {
    const {page} = useContext<any | null>(Context);
    const [getFavoriteList, setGetFavoriteList] = useState<any[]>([]);
    const [tyreSearchMod, setTyreSearchMod] = useState<[] | null>(null);
    const [wheelSearchMod, setWheelSearchMod] = useState<[] | null>(null);
    const [oilSearchMod, setOilSearchMod] = useState<[] | null>(null);
    const [batterySearchMod, setBatterySearchMod] = useState<[] | null>(null);
    const [compareTyres, setCompareTyres] = useState<any[] | null>([]);
    const [tabSearchMod, setTabSearchMod] = useState<string>('Шини');
    const [tabSearchModWheel, setTabSearchModWheel] = useState<[]>([]);
    const [tabSearchModOil, setTabSearchModOil] = useState<[]>([]);
    const [tabSearchModBattery, setTabSearchModBattery] = useState<[]>([]);
    const [ratingModelAvg, setRatingModelAvg] = useState<IRatingAvg[] | null>([]);

    useEffect(() => {
        let isMounted = false;
        const getFavoriteCompare = async () => {
            const taskCompare: any[] = [
                getCompare,
            ];
          let i:number = 0;
          while(taskCompare.length > i) {
            if (!isMounted && taskCompare[i] === getCompare) {
              let curFavorites: any = await taskCompare[i]();
              page.setFavoritesCount(curFavorites);
                if(Array.isArray(curFavorites)){
                    curFavorites.forEach(async (element: string) => {      
                    let newTyresFavorite: any = await getTyresById(element);
                    let compareRatingModel = await getTyresModelRatingAvg(newTyresFavorite.id_model);
                    newTyresFavorite.ratingAvg = compareRatingModel[0];
                    setCompareTyres(oldCompare => [...oldCompare!, newTyresFavorite]);
                    
                    //setRatingModelAvg(oldCompareRating => [...oldCompareRating!, compareRatingModel]);
                    });
                }
            }
            const task = taskCompare.shift();
            task();
            await yieldToMain();
          }
        }
        getFavoriteCompare();
        return () => {isMounted = true}
    },[page])

    const searchTabModChange = (e: any) => {
        if (e.target.title === 'Шини') {
            setTabSearchMod('Шини');
        }
        if (e.target.title === 'Диски') {
            setTabSearchMod('Диски');
        }
        if (e.target.title === 'Акб') {
            setTabSearchMod('Акб');
        }
        if (e.target.title === 'Масло') {
            setTabSearchMod('Масло');
        }
    }

    const clearFavoritesGoods = async () => {
        try {
           await clearCompare(); 
           setCompareTyres(null);
        } catch (error) {
            console.log(error);
        }
    }

    console.log('COMPARE_TYRES: ', compareTyres);

  return (
    <div id="myOverlay" className="overlayCompareActive">
            {    
                compareTyres?.length !== 0 || 
                tabSearchModWheel?.length !== 0 || 
                tabSearchModOil?.length !== 0 || 
                tabSearchModBattery?.length !== 0 ?
                <div className='outputCompareData'>
                    <div className='outputDataCompareItemsTitle'>
                        <div>Порівняти товари:</div>
                    </div>
                    <div className='outputDataCompareItemsLines'>
                        {compareTyres?.length !== 0 ? 
                        <div className='outputDataCompareItems'>
                        <span 
                            title='Шини'
                            className={tabSearchMod === 'Шини' ? 
                            'activatedCompareTitle':
                            'titleCompareSearch' }
                            onClick={searchTabModChange}
                        >Шини 
                            <span className='countCompareSearch'>
                                {compareTyres?.length}
                            </span>
                        </span>
                        </div>
                        : null
                        }
                        {tabSearchModWheel?.length !== 0 ?
                        <div className='outputDataCompareItems'>
                        <span 
                            title='Диски'
                            className={tabSearchMod === 'Диски' ? 
                            'activatedCompareTitle' :
                             'titleCompareSearch' }
                            onClick={searchTabModChange}
                        >Диски 
                            <span className='countCompareSearch'>
                            {10020}
                            </span>
                        </span>
                        </div>
                        : null
                        }
                        {tabSearchModBattery?.length !== 0 ?
                        <div className='outputDataCompareItems'>
                        <span 
                            title='Акб'
                            className={tabSearchMod === 'Акб' ?  
                            'activatedCompareTitle' : 
                            'titleCompareSearch' }
                            onClick={searchTabModChange}
                        >Акб 
                            <span className='countCompareSearch'>
                                {20}
                            </span>
                        </span>
                        </div>
                        : null
                        }
                        {tabSearchModOil?.length !== 0 ?
                        <div className='outputDataCompareItems'>
                        <span 
                            title='Масло'
                            className={tabSearchMod === 'Масло' ? 
                            'activatedCompareTitle':
                            'titleCompareSearch' }
                            onClick={searchTabModChange}
                        >Масло 
                            <span className='countCompareSearch'>
                                {20}
                            </span>
                        </span>
                        </div>
                        : null
                        }
                        <div className='titleCompareClear'
                            onClick={clearFavoritesGoods}
                        >
                            Очистити порівняння
                        </div>
                    </div>
                    <p/>
                    <div className='outputDataCompareContainer'>
                        <span className='outputDataCompareContainerText'>Характеристики для порівняння</span>
                        <span className='outputDataCompareContainerList'>Список товарів для порівняння</span>
                        <span className='outputDataCompareContainerRating'>Рейтинг товарів для порівняння</span>
                        <div className='outputDataCompareTable'>
                        {compareTyres && tabSearchMod === 'Шини' ?
                            <div className='propertiesTyresCompare'>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>Ширина: 
                                        <span className="tooltiTextCompareTyres">Ширина профиля шины</span>
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>Висота профіля: 
                                        <span className="tooltiTextCompareTyres">Высота профиля шины</span>
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>Діаметр: 
                                        <span className="tooltiTextCompareTyres">Посадочный диаметр шины</span>                        
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>Бренд: 
                                        <span className="tooltiTextCompareTyres">Производитель шины</span>
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>Модель: 
                                        <span className="tooltiTextCompareTyres">Модель бренда</span>
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>Сезон: 
                                        <span className="tooltiTextCompareTyres">Сезон применения шины</span>
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>Рік виробництва: 
                                        <span className="tooltiTextCompareTyres">Год производства шины</span>
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>Країна виробник: 
                                        <span className="tooltiTextCompareTyres">Страна производства шины</span>
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>Тип транспортного засобу:
                                        <span className="tooltiTextCompareTyres">Тип применения-назначения шин </span>
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>Индекс навантаження: 
                                        <span className="tooltiTextCompareTyres">Максимальная нагрузка шины</span>
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>Индекс швидкості:
                                        <span className="tooltiTextCompareTyres">Максимальная скорость</span>
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>Шип / не шип: 
                                        <span className="tooltiTextCompareTyres">Шипованная или не шипованная шина</span>
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>Повне наіменування: 
                                        <span className="tooltiTextCompareTyres">Повна назва товару</span>
                                    </span>
                                </div>
                        </div>
                        : null
                        }
                        </div>
                        <div className='outputDataCompareItemsBox'>
                            {compareTyres && tabSearchMod === 'Шини' ? 
                            compareTyres?.map((goods:any) => (                    
                                <div 
                                    className='outputDataCompareItemsList' 
                                    key={goods.id}>
                                <TyreCardSmall
                                    key={goods.id}
                                    product={goods}
                                />
                                <p/>
                                <div className='outputDataCompareItemsBoxRating'>
                                    <ReviewsGoodsExtend ratingItem={goods.ratingAvg}/>
                                    <a href='/'>{goods.reviews?.length + 
                                    `${goods.reviews?.length === 1 ? ' відгук': ' відгуків'}`}</a>    
                                </div>
                                <div className='dataCompareItemsPropsTyre'>
                                    <span>{goods.width.width ?? ''}</span>
                                    <span>{goods.height.height ?? ''}</span>
                                    <span>{goods.diameter.diameter ?? ''}</span>
                                    <span>{goods.tyre_brand.brand ?? ''}</span>
                                    <span>{goods.tyre_model.model ?? ''}</span>
                                    <span>{goods.season.season_ua ?? ''}</span>
                                    <span>{goods.year.manufacture_year ?? ''}</span>
                                    <span>{goods.country.country_manufacturer_ua ?? ''}</span>
                                    <span>{goods.vehicle_type.vehicle_type_ua ?? ''}</span>
                                    <span>{goods.load_index.load_index_with_desc ?? ''}</span>
                                    <span>{goods.speed_index.speed_index_with_desc ?? ''}</span>
                                    <span>{goods.studded.studded ?? ''}</span>
                                    <span>{goods.full_name ?? ''}</span>
                                </div>
                                </div>
                                ))
                                : null
                            }
                            {tabSearchModWheel && tabSearchMod === 'Диски' ? 
                                tabSearchModWheel.map((goods: any) => (                    
                                <div className='outputDataCompareItemsList'
                                    key={goods.id}
                                >
                                    <TyresCardList
                                        key={goods.id}
                                        goods={goods}
                                        forOrder={false} 
                                    />
                                </div>
                                ))
                                : null
                            }
                            {tabSearchModBattery && tabSearchMod === 'Акб' ? 
                                tabSearchModBattery.map((goods: any) => (                    
                                <div className='outputDataCompareItemsList'
                                    key={goods.id}
                                >
                                    <TyresCardList
                                        key={goods.id}
                                        goods={goods}
                                        forOrder={false} 
                                    />
                                </div>
                                ))
                                : null
                            }
                            {tabSearchModOil && tabSearchMod === 'Масло' ? 
                                tabSearchModOil.map((goods: any) => (                    
                                <div className='outputDataCompareItemsList'
                                    key={goods.id}
                                >
                                    <TyresCardList
                                        key={goods.id}
                                        goods={goods}
                                        forOrder={false} 
                                    />
                                </div>
                                ))
                                : null
                            } 
                        </div>
                    </div>
                </div>
            : <div className='noCompareGoods'>НЕ ДОДАНО ПОРІВНЯННЯ ТОВАРІВ.</div>
            }
        </div>
    )
}

export default Compare;