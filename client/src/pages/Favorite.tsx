import React, { useContext, useEffect, useState } from 'react'
import '../css/Pages/Favorite.css';
import CardList from '../components/cards/CardList';
import { yieldToMain } from '../restAPI/postTaskAdmin';
import { 
    addGoodsToBasket,
    clearFavorites, 
    createBasket, 
    getBasketById, 
    getFavorites, 
    getStorageByIdParam, 
    getTyresById, 
    getWheelsById
} from '../restAPI/restGoodsApi';
import { Context } from '../context/Context';
import { ICheckOrderItem } from '../components/catalogs/types/CheckOrder.type';
import Modal from '../components/modal/Modal';
import CheckOrder from '../components/modal/CheckOrder';

const Favorite = () => {
    // const location = useLocation();
    // const history = useHistory();
    const {page, customer} = useContext<any | null>(Context);
    const [getFavoriteList, setGetFavoriteList] = useState<any[]>([]);
    const [tyreSearchMod, setTyreSearchMod] = useState<[] | null>(null);
    const [wheelSearchMod, setWheelSearchMod] = useState<[] | null>(null);
    const [oilSearchMod, setOilSearchMod] = useState<[] | null>(null);
    const [batterySearchMod, setBatterySearchMod] = useState<[] | null>(null);
    const [favoriteTyres, setFavoriteTyres] = useState<any[] | null>([]);
    const [favoriteWheels, setFavoriteWheels] = useState<any[] | null>([]);
    const [tabSearchMod, setTabSearchMod] = useState<string>('Шини');
    const [tabSearchModWheel, setTabSearchModWheel] = useState<[]>([]);
    const [tabSearchModOil, setTabSearchModOil] = useState<[]>([]);
    const [tabSearchModBattery, setTabSearchModBattery] = useState<[]>([]);
    const [active, setActive] = useState(false);
    const [checkOrderItem, setCheckOrderItem] = useState<ICheckOrderItem[] | null>([]);

    useEffect(() => {
        let isMounted = false;
        const getFavoriteCompare = async () => {
            const taskFavorite: any[] = [
                getFavorites,
            ];
          let i:number = 0;
          while(taskFavorite.length > i) {
            if (!isMounted && taskFavorite[i] === getFavorites) {
              let curFavorites: any = await taskFavorite[i]();
              page.setFavoritesCount(curFavorites);

                if(Array.isArray(curFavorites)){
                    curFavorites.forEach(async (element: string) => {      
                    let newTyresFavorite: any = await getTyresById(element);
                    let newWheelsFavorite: any = await getWheelsById(element);
                    if(newTyresFavorite) {
                        setFavoriteTyres(oldFavorite => [...oldFavorite!, newTyresFavorite]);
                    }
                    if(newWheelsFavorite) {
                        setFavoriteWheels(oldFavorite => [...oldFavorite!, newWheelsFavorite])
                    }
                    });
                }
            }
            const task = taskFavorite.shift();
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
           await clearFavorites(); 
           setFavoriteTyres(null);
        } catch (error) {
            console.log(error);
        }
    };

    const checkOrders = async (
        item : ICheckOrderItem, 
        ratingModel: {avgRatingModel: number },
        storageItem: number,
        priceStockIndex: number,
    ) => {
    try {
        setActive(!active);
        if (!active) {
            // console.log("STORAGE_ITEM", storageItem);
            // console.log("PRICE_STOCK_ITEM", priceStockIndex);
            const getStorage = await getStorageByIdParam(storageItem);
            const basket: any = await createBasket({
                id_customer: customer.customer?.id, 
                storage: getStorage.storage
            });
            // console.log('GET_STORAGE: ', getStorage);
            // console.log('ITEM: ', item);
            // console.log('CREATE_BASKET_ID_BASKET: ', basket?.data);
            if(basket?.status === 201) {
                const checkItem = checkOrderItem?.find(value => +value.id === +item.id);
                const addTobasket: any = await addGoodsToBasket(
                +item.id,
                item.id_cat,
                checkItem?.quantity ? checkItem?.quantity + 4 : 4,
                item.price[priceStockIndex].price,
                item.stock[priceStockIndex].id_supplier,
                item.stock[priceStockIndex].id_storage,
                item.category?.category,
                basket.data.id_basket,
                item.full_name,
                item.season?.season_ua ?? null,
                ratingModel?.avgRatingModel,
                item.reviews.length,
                item.diameter.diameter,
                ); 
                //console.log('ADD_BASK: ', addTobasket);
                if (addTobasket?.status === 201) {
                    const updateBasketStorage = await getBasketById(basket.data.id_basket);
                    setCheckOrderItem(
                        [...updateBasketStorage?.basket_storage]
                    );
                    page.setBasketCount(
                        updateBasketStorage?.basket_storage.reduce(
                            (sum: any, current: any) => (sum + current.quantity),0)
                    );
                // console.log('BASKET_ORDERS_ARR: ', basket?.data.basket_storage);
                // console.log('ADD_TO_BASKET: ', addTobasket?.data); 
                }  
            }
        }
    } catch (error) {
        console.log('BASKET_ERROR: ', error);
    }
  }

  return (
    <div className="overlayFavoriteActive">
            {    
                favoriteTyres?.length !== 0 || 
                favoriteWheels?.length !== 0 || 
                tabSearchModOil?.length !== 0 || 
                tabSearchModBattery?.length !== 0 ?
                <div className='outputDataFavorite'>
                    <div className='outputDataFavoriteItemsTitle'>
                        <div>Обрані товари:</div>
                    </div>
                    <div className='outputDataFavoriteItemsLines'>
                        {favoriteTyres?.length !== 0 ? 
                        <div className='outputDataFavoriteItems'>
                        <span 
                            title='Шини'
                            className={tabSearchMod === 'Шини' ? 
                            'activatedFavoriteTitle':
                            'titleFavoriteSearch' }
                            onClick={searchTabModChange}
                        >Шини 
                        {favoriteTyres ?
                            <span className='countFavoriteSearch'>
                                {favoriteTyres?.length}
                            </span> : null
                        }
                        </span>
                        </div>
                        : null
                        }
                        {favoriteWheels?.length !== 0 ?
                        <div className='outputDataFavoriteItems'>
                        <span 
                            title='Диски'
                            className={tabSearchMod === 'Диски' ? 
                            'activatedFavoriteTitle' :
                             'titleFavoriteSearch' }
                            onClick={searchTabModChange}
                        >Диски 
                        {favoriteWheels ?
                            <span className='countFavoriteSearch'>
                                {favoriteWheels?.length}
                            </span> : null
                        }
                        </span>
                        </div>
                        : null
                        }
                        {tabSearchModBattery?.length !== 0 ?
                        <div className='outputDataFavoriteItems'>
                        <span 
                            title='Акб'
                            className={tabSearchMod === 'Акб' ?  
                            'activatedFavoriteTitle' : 
                            'titleFavoriteSearch' }
                            onClick={searchTabModChange}
                        >Акб 
                            <span className='countFavoriteSearch'>
                                {20}
                            </span>
                        </span>
                        </div>
                        : null
                        }
                        {tabSearchModOil?.length !== 0 ?
                        <div className='outputDataFavoriteItems'>
                        <span 
                            title='Масло'
                            className={tabSearchMod === 'Масло' ? 
                            'activatedFavoriteTitle':
                            'titleFavoriteSearch' }
                            onClick={searchTabModChange}
                        >Масло 
                            <span className='countFavoriteSearch'>
                                {20}
                            </span>
                        </span>
                        </div>
                        : null
                        }
                        <div className='titleFavoriteClear'
                            onClick={clearFavoritesGoods}
                        >
                            Очистити обрані товари
                        </div>
                    </div>
                    <p/>
                    <div className='outputDataFavoriteItemsBox'>
                        {favoriteTyres && tabSearchMod === 'Шини' ? 
                        favoriteTyres?.map((goods:any) => (                    
                        <div 
                            className='outputDataFavoriteItemsList' 
                            key={goods.id}>
                            <CardList
                                key={goods.id}
                                goods={goods}
                                forOrder={false} 
                                checkOrders={checkOrders}
                            />
                        </div>
                        ))
                        : null
                        }
                        {favoriteWheels && tabSearchMod === 'Диски' ? 
                        favoriteWheels?.map((goods: any) => (                    
                        <div className='outputDataFavoriteItemsList'
                            key={goods.id}
                        >
                            <CardList
                                key={goods.id}
                                goods={goods}
                                forOrder={false} 
                                checkOrders={checkOrders}
                            />
                        </div>
                        ))
                        : null
                        }
                        {tabSearchModBattery && tabSearchMod === 'Акб' ? 
                        tabSearchModBattery.map((goods: any) => (                    
                        <div className='outputDataFavoriteItemsList'
                            key={goods.id}
                        >
                            <CardList
                                key={goods.id}
                                goods={goods}
                                forOrder={false} 
                                checkOrders={checkOrders}
                            />
                        </div>
                        ))
                        : null
                        }
                        {tabSearchModOil && tabSearchMod === 'Масло' ? 
                        tabSearchModOil.map((goods: any) => (                    
                        <div className='outputDataFavoriteItemsList'
                            key={goods.id}
                        >
                            <CardList
                                key={goods.id}
                                goods={goods}
                                forOrder={false} 
                                checkOrders={checkOrders}
                            />
                        </div>
                        ))
                        : null
                        } 
                    </div>
                    <Modal active={active} setActive={setActive}>
                        <CheckOrder orderItem={checkOrderItem}/> 
                    </Modal> 
                </div>
            : <div className='noFavoritesGoods'>НЕ ДОДАНО ОБРАНИХ ТОВАРІВ.</div>
            }
        </div>
    )
}

export default Favorite;