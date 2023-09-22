import React, { useContext, useEffect, useState } from 'react';
import '../css/Pages/Compare.css';
import { addGoodsToBasket, clearCompare, createBasket, getBasketById, getCompare, getTyresById, getTyresModelRatingAvg, getWheelsById, getWheelsModelRatingAvg } from '../restAPI/restGoodsApi';
import TyresCardList from '../components/cards/CardList';
import { Context } from '../context/Context';
import { yieldToMain } from '../restAPI/postTaskAdmin';
import CardSmall from '../components/cards/CardSmall';
import ReviewsGoodsExtend from '../components/reviews/ReviewsGoodsExtend';
import { IRatingAvg } from './types/RatingModelAvg.type';
import Modal from '../components/modal/Modal';
import CheckOrder from '../components/modal/CheckOrder';
import { ICheckOrderItem } from '../components/catalogs/types/CheckOrder.type';
import { observer } from 'mobx-react-lite';



const Compare = observer(() => {
    const {page, customer} = useContext<any | null>(Context);
    const [active, setActive] = useState(false);
    //const [getFavoriteList, setGetFavoriteList] = useState<any[]>([]);
    //const [tyreSearchMod, setTyreSearchMod] = useState<[] | null>(null);
    //const [wheelSearchMod, setWheelSearchMod] = useState<[] | null>(null);
    //const [oilSearchMod, setOilSearchMod] = useState<[] | null>(null);
    //const [batterySearchMod, setBatterySearchMod] = useState<[] | null>(null);
    const [compareTyres, setCompareTyres] = useState<any[] | null>([]);
    const [compareWheels, setCompareWheel] = useState<any[] | null>([]);
    const [tabSearchMod, setTabSearchMod] = useState<string>('Шини');
    //const [tabSearchModWheel, setTabSearchModWheel] = useState<[]>([]);
    const [tabSearchModOil, setTabSearchModOil] = useState<[]>([]);
    const [tabSearchModBattery, setTabSearchModBattery] = useState<[]>([]);
    const [ratingModelAvg, setRatingModelAvg] = useState<IRatingAvg[] | null>([]);
    const [checkOrderItem, setCheckOrderItem] = useState<ICheckOrderItem[] | null>([]);

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
                    let newTyresCompare: any = await getTyresById(element);
                    console.log("TYRES_COMPARE: ", newTyresCompare);
                    if(newTyresCompare) {
                        let compareRatingModel = await getTyresModelRatingAvg(newTyresCompare.id_model);
                        
                        console.log("COMPARE_RATING: ", compareRatingModel);
                        newTyresCompare.ratingAvg = compareRatingModel[0];
                        setCompareTyres(oldCompare => [...oldCompare!, newTyresCompare]);
                    }
                    let newWheelsCompare: any = await getWheelsById(element);
                    console.log("WHEELS_COMPARE: ", newWheelsCompare);
                    if(newWheelsCompare){
                       let compareWheelRatingModel = await getWheelsModelRatingAvg(newWheelsCompare.id_model);
                        newWheelsCompare.ratingAvg = compareWheelRatingModel[0];
                        setCompareWheel(oldCompare => [...oldCompare!, newWheelsCompare]); 
                    }
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

    const checkOrders = async (
        item : ICheckOrderItem, 
        ratingModel: {avgRatingModel: number }
        ) => {
        try {
            setActive(!active);
            if (!active) {
                const basket: any = await createBasket(
                    customer.customer?.id,
                );
                console.log('CREATE_BASKET_ID_BASKET: ', basket.data.id_basket);
                if(basket?.status === 201) {
                    const checkItem = checkOrderItem?.find(value => +value.id === +item.id);
                    const addTobasket: any = await addGoodsToBasket(
                    +item.id,
                    item.id_cat,
                    checkItem?.quantity ? checkItem?.quantity + 4 : 4,
                    item.price[0].price,
                    item.stock[0].id_supplier,
                    item.stock[0].id_storage,
                    //item.category.category,
                    basket.data.id_basket,
                    item.full_name,
                    item.season?.season_ua ?? null,
                    ratingModel?.avgRatingModel,
                    item.reviews.length,
                    item.diameter.diameter,
                    ); 
                    console.log('ADD_BASK: ', addTobasket);
                    if (addTobasket?.status === 201) {
                        const updateBasketStorage = await getBasketById(basket.data.id_basket);
                        setCheckOrderItem(
                            [...updateBasketStorage?.basket_storage]
                        );
                        page.setBasketCount(
                            updateBasketStorage?.basket_storage.reduce(
                                (sum: any, current: any) => (sum + current.quantity),0)
                        );
                    console.log('BASKET_ORDERS_ARR: ', basket?.data.basket_storage);
                    console.log('ADD_TO_BASKET: ', addTobasket?.data); 
                    }  
                }
            }
        } catch (error) {
            console.log('BASKET_ERROR: ',error);
        }
    }


  return (
    <div id="myOverlay" className="overlayCompareActive">
            {    
                compareTyres?.length !== 0 || 
                compareWheels?.length !== 0 || 
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
                        {compareWheels?.length !== 0 ?
                        <div className='outputDataCompareItems'>
                        <span 
                            title='Диски'
                            className={tabSearchMod === 'Диски' ? 
                            'activatedCompareTitle' :
                             'titleCompareSearch' }
                            onClick={searchTabModChange}
                        >Диски 
                            <span className='countCompareSearch'>
                            {compareWheels?.length}
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
                                        <span className="tooltiTextCompareTyres">Ширина профіля шини</span>
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>Висота профіля: 
                                        <span className="tooltiTextCompareTyres">Висота профіля шини</span>
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>Діаметр: 
                                        <span className="tooltiTextCompareTyres">Посадковий діаметр шини</span>                        
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>Бренд: 
                                        <span className="tooltiTextCompareTyres">Виробник шини</span>
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>Модель: 
                                        <span className="tooltiTextCompareTyres">Модель бренда</span>
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>Сезон: 
                                        <span className="tooltiTextCompareTyres">Сезон використання шини</span>
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>Рік виробництва: 
                                        <span className="tooltiTextCompareTyres">Рік виробництва шини</span>
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>Країна виробник: 
                                        <span className="tooltiTextCompareTyres">Кораїна вирробник шини</span>
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>Тип транспортного засобу:
                                        <span className="tooltiTextCompareTyres">Тип використання шини </span>
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>Индекс навантаження: 
                                        <span className="tooltiTextCompareTyres">Максимальне навантаження для шини</span>
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>Индекс швидкості:
                                        <span className="tooltiTextCompareTyres">Максимальна швидкість для шини</span>
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>Шип / не шип: 
                                        <span className="tooltiTextCompareTyres">Шипована або не шипована шина</span>
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
                        {compareWheels && tabSearchMod === 'Диски' ?
                            <div className='propertiesWheelsCompare'>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>Ширина: 
                                        <span className="tooltiTextCompareTyres">Ширина профиля диску</span>
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>Міжболтова відстань PCD:
                                        <span className="tooltiTextCompareTyres">Відстань між отворів для болтів</span>
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>Діаметр: 
                                        <span className="tooltiTextCompareTyres">Посадковий діаметр диску</span>                        
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>Бренд: 
                                        <span className="tooltiTextCompareTyres">Виробник диска</span>
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>Модель: 
                                        <span className="tooltiTextCompareTyres">Модель бренда</span>
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>Тип диску: 
                                        <span className="tooltiTextCompareTyres">Тип виробленного диску</span>
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>Виліт ET: 
                                        <span className="tooltiTextCompareTyres">Виліт диска ET від ступиці</span>
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>Діаметр отвору DIA: 
                                        <span className="tooltiTextCompareTyres">Діаметр посадкового отвору на ступицю DIA</span>
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>Колір:
                                        <span className="tooltiTextCompareTyres">Колір диску </span>
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>Міжботова відстать додатково PCD2:
                                        <span className="tooltiTextCompareTyres">Міжболтова відстань додатково PCD2 для отворів</span>
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>Кількість болтів та міжболтова відстань:
                                        <span className="tooltiTextCompareTyres">Кількість болтів диска та міжболтова відстать між ними</span>
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>Кількість отворів для болтів:
                                        <span className="tooltiTextCompareTyres">Кількість отворів для болтів диску</span>
                                    </span>
                                </div>
                                <div className="tooltiComparePropertiesTyres">
                                    <span>Повне наіменування диску: 
                                        <span className="tooltiTextCompareTyres">Повна назва товару з кольором</span>
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
                                <CardSmall
                                    key={goods.id}
                                    product={goods}
                                    checkOrders={checkOrders}
                                />
                                <p/>
                                <div className='outputDataCompareItemsBoxRating'>
                                    <ReviewsGoodsExtend 
                                        typeRating={'tyres'}
                                        ratingItem={goods.ratingAvg}
                                    />
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
                            {compareWheels && tabSearchMod === 'Диски' ? 
                                compareWheels.map((goods: any) => (                    
                                <div className='outputDataCompareItemsList'
                                    key={goods.id}
                                >
                                    <CardSmall
                                        key={goods.id}
                                        product={goods}
                                        checkOrders={checkOrders}
                                    />
                                <p/>
                                <div className='outputDataCompareItemsBoxRating'>
                                    <ReviewsGoodsExtend 
                                    ratingItem={goods.ratingAvg}
                                    typeRating={'wheels'}
                                    />
                                    <a href='/'>{goods.reviews?.length + 
                                    `${goods.reviews?.length === 1 ? ' відгук': ' відгуків'}`}</a>    
                                </div>
                                <div className='dataCompareItemsPropsTyre'>
                                    <span>{goods.width.width ?? ''}</span>
                                    <span>{goods.pcd?.pcd ?? ''}</span>
                                    <span>{goods.diameter.diameter ?? ''}</span>
                                    <span>{goods.wheel_brand.brand ?? ''}</span>
                                    <span>{goods.wheel_model.model ?? ''}</span>
                                    <span>{goods.type.type ?? ''}</span>
                                    <span>{goods.et?.et ?? ''}</span>
                                    <span>{goods.dia?.dia ?? ''}</span>
                                    <span>{goods.color?.color?? ''}</span>
                                    <span>{goods.pcd2.pcd2 ?? ''}</span>
                                    <span>{goods.bolt_count_pcd?.bolt_count_pcd ?? ''}</span>
                                    <span>{goods.bolt_count?.bolt_count ?? ''}</span>
                                    <span>{goods.full_name_color ?? ''}</span>
                                </div>
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
            <Modal active={active} setActive={setActive}>
                <CheckOrder orderItem={checkOrderItem}/> 
            </Modal> 
        </div>
    )
});

export default Compare;