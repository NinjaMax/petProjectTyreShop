import React, { Suspense, lazy, useContext, useEffect, useState } from 'react'
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
import { useTranslation } from 'react-i18next';

const Modal = lazy(() => import('../components/modal/Modal'));
const CheckOrder = lazy(() => import('../components/modal/CheckOrder'));

const Favorite = () => {
    const {page, customer} = useContext<any | null>(Context);
    const [favoriteTyres, setFavoriteTyres] = useState<any[] | null>([]);
    const [favoriteWheels, setFavoriteWheels] = useState<any[] | null>([]);
    const [tabSearchMod, setTabSearchMod] = useState<string>('Шини');
    const [tabSearchModOil, setTabSearchModOil] = useState<[]>([]);
    const [tabSearchModBattery, setTabSearchModBattery] = useState<[]>([]);
    const [active, setActive] = useState(false);
    const [checkOrderItem, setCheckOrderItem] = useState<ICheckOrderItem[] | null>([]);
    const { t } = useTranslation();

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
        if (e.target.title === t('reviewStorePage.reviewStoreClient')) {
            setTabSearchMod(t('reviewStorePage.reviewStoreClient'));
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
            const getStorage = await getStorageByIdParam(storageItem);
            const basket: any = await createBasket({
                id_customer: customer.customer?.id, 
                storage: getStorage.storage
            });
            if(basket?.status === 201) {
                const checkItem = checkOrderItem?.find(value => +value.id === +item.id);
                const addTobasket: any = await addGoodsToBasket(
                +item.id,
                item.id_cat,
                checkItem?.quantity ? checkItem?.quantity + 4 : 4,
                item.price[priceStockIndex].price_wholesale,
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
                if (addTobasket?.status === 201) {
                    const updateBasketStorage = await getBasketById(basket.data.id_basket);
                    setCheckOrderItem(
                        [...updateBasketStorage?.basket_storage]
                    );
                    page.setBasketCount(
                        updateBasketStorage?.basket_storage.reduce(
                            (sum: any, current: any) => (sum + current.quantity),0)
                    );
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
                        <div>{t('favoritePage.favoriteGoods')}</div>
                    </div>
                    <div className='outputDataFavoriteItemsLines'>
                        {favoriteTyres?.length !== 0 ? 
                        <div className='outputDataFavoriteItems'>
                        <span 
                            title={t('favoritePage.cleanFavoriteGoods')}
                            className={tabSearchMod === t('favoritePage.cleanFavoriteGoods') ? 
                            'activatedFavoriteTitle':
                            'titleFavoriteSearch' }
                            onClick={searchTabModChange}
                        >{t('favoritePage.cleanFavoriteGoods')} 
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
                            {t('favoritePage.cleanFavoriteGoods')}Очистити обрані товари
                        </div>
                    </div>
                    <p/>
                    <div className='outputDataFavoriteItemsBox'>
                        {favoriteTyres && tabSearchMod === t('favoritePage.favoriteTypeTyre') ? 
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
                    <Suspense fallback={<span>....</span>}>
                    <Modal active={active} setActive={setActive}>
                        <CheckOrder orderItem={checkOrderItem}/> 
                    </Modal> 
                    </Suspense>
                </div>
            : <div className='noFavoritesGoods'>{t('favoritePage.noGoodsAdded')}</div>
            }
        </div>
    )
}

export default Favorite;