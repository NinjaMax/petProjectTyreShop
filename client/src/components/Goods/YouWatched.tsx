import React, { useContext, useEffect, useState } from 'react';
import '../../css/Goods/YouWatched.css';
import TyresCard from '../cards/Card';
import { addGoodsToBasket, createBasket, getBasketById, getTyresByIdParam, getWheelsByIdParam } from '../../restAPI/restGoodsApi';
import { Context } from '../../context/Context';
import { ICheckOrderItem } from '../catalogs/types/CheckOrder.type';
import Modal from '../modal/Modal';
import CheckOrder from '../modal/CheckOrder';

// type WatchedType = {
//     checkOrders?(arg0: any, ...arg:any[]): Promise<void | undefined>;
//     avgRatingModel?: number;
// }

const YouWatched = () => {
    const [watchedList, setWatchedList] = useState<any[]>([]);
    const [checkOrderItem, setCheckOrderItem] = useState<ICheckOrderItem[] | null>([]);
    const [active, setActive] = useState<boolean>(false);
    const {page, customer} = useContext<any>(Context);
    
    useEffect(() => {
        let isMounted = false;
        const getGoodsId: string = 
        JSON.parse(localStorage.getItem('you_watched')!);
        const getWatchedGoods = async () => {
            if (!isMounted &&  getGoodsId) {
                const watchedGoodsArray = getGoodsId.split(',');
                watchedGoodsArray.forEach(async(goodId):Promise<any>  => {
                    let getTyreItem =  await getTyresByIdParam(goodId);
                    let getWheelItem = await getWheelsByIdParam(goodId);
                    if (getTyreItem) {
                        getTyreItem.typeCard = 'tyre';
                      setWatchedList(oldGoods => [...oldGoods!, getTyreItem]);  
                    }
                    if (getWheelItem) {
                        getWheelItem.typeCard = 'wheel';
                        setWatchedList(oldGoods => [...oldGoods!, getWheelItem]);
                    }
                });
            }
        };
        getWatchedGoods();
        return () => {
            isMounted = true;
          };
    },[]);

    const checkOrders = async (
        item : any, 
        avgRatingModel: number | undefined
        ) => {
        try {
            setActive(!active);
            if (!active) {
                const basket: any = await createBasket(
                    customer.customer?.id,
                );
                //console.log('CREATE_BASKET_ID_BASKET: ', basket.data.id_basket);
                if(basket?.status === 201) {
                    const checkItem = checkOrderItem?.find(value => +value.id === +item.id);
                    const addTobasket: any = await addGoodsToBasket(
                    +item.id,
                    item.id_cat,
                    checkItem?.quantity ? checkItem?.quantity + 4 : 4,
                    item.price[0].price,
                    item.stock[0].id_supplier,
                    item.stock[0].id_storage,
                    item.category?.category,
                    basket.data.id_basket,
                    item.full_name,
                    item.season?.season_ua,
                    avgRatingModel,
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
                    //console.log('BASKET_ORDERS_ARR: ', basket?.data.basket_storage);
                    //console.log('ADD_TO_BASKET: ', addTobasket?.data); 
                    }  
                }
            }
        } catch (error) {
            console.log('BASKET_ERROR: ',error);
        }
    }

    return (
        <div>
            <h3>Ви дивились</h3>
            <div className='youWatched'>
            {watchedList ? 
            watchedList.map((item) => 
            <div className='youWatchedItem' key={item.id}>    
                <TyresCard 
                    goods={item} 
                    optionsBox={undefined} 
                    checkOrders={checkOrders} 
                    typeCard={item.typeCard}
                />
            </div> 
            )
            : null
            }
            </div>
            <Modal active={active} setActive={setActive}>
                <CheckOrder orderItem={checkOrderItem}/> 
            </Modal> 
        </div>
    );
};

export default YouWatched;