import React, { Fragment, Suspense, lazy, useContext, useState } from 'react';
import '../css/PromotionBox.css';
import Card from './cards/Card';
import ButtonPrevNext from './buttons/ButtonPrevNext';
import Modal from './modal/Modal';
import { ICheckOrderItem } from './catalogs/types/CheckOrder.type';
import { Context } from '../context/Context';
import { addGoodsToBasket, createBasket, getBasketById, getStorageByIdParam } from '../restAPI/restGoodsApi';
import { observer } from 'mobx-react-lite';
import SpinnerCarRot from './spinners/SpinnerCarRot';

type IPromoBox = {
    itemsArray: any[] | null;
    prevButtonEvent(arg0: any): void;
    nextButtonEvent(arg0: any): void;
    prevBtn:number;
    nextBtn: number;
};

const CheckOrder = lazy(() => import('./modal/CheckOrder'));

const PromotionBox = observer(({
    itemsArray, 
    prevButtonEvent,
    nextButtonEvent,
    prevBtn,
    nextBtn
}: IPromoBox) => {
    const {customer, page} = useContext<any | null>(Context);
    const [active, setActive] = useState<boolean>(false);
    const [checkOrderItem, setCheckOrderItem] = useState<ICheckOrderItem[] | null>([]);
    
    const checkOrders = async (
        item : ICheckOrderItem, 
        ratingModel: {avgRatingModel: number },
        storageItem: number,
        priceStockIndex: number,
        ) => {
        try {
            setActive(!active);
            if (!active) {
                const getStoragePromo = await getStorageByIdParam(storageItem);
                const basket: any = await createBasket({
                    id_customer: customer.customer?.id, 
                    storage: getStoragePromo.storage
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
                    item.season?.season_ua,
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
            console.log('BASKET_ERROR: ',error);
        }
    }
    
    return (
        <div className='promotionBox'>
            <div className='promotionBoxItem'>
            {itemsArray?.length !== 0 && prevBtn <= itemsArray!.length - 4 && nextBtn <= itemsArray!.length? 
                itemsArray!.slice(prevBtn, nextBtn)
                .map(
                (item: any) =>
                <Fragment key={item.id}>
                <Card 
                    goods={item}
                    typeCard={item.typeCard}
                    optionsBox={false} 
                    checkOrders={checkOrders}
                    forOrder={false}
                />
                </Fragment>
                )
                : null  
            } 
            {itemsArray?.length !== 0 && prevBtn > itemsArray!.length - 4 && nextBtn < itemsArray!.length - 6 ? 
                [...itemsArray!.slice(prevBtn, itemsArray!.length), ...itemsArray!.slice(0, nextBtn + 1)]
                .map(
                (item: any) =>
                <Fragment key={item.id}>
                <Card 
                    goods={item}
                    typeCard={item.typeCard}
                    optionsBox={false} 
                    checkOrders={checkOrders}
                    forOrder={false}
                />
                </Fragment>
                )
                : null  
            } 
            </div>
            {itemsArray ?
            <ButtonPrevNext 
                prevTop={-275} 
                prevBtnLeft={-5}
                nextTop={-275}
                nextBtnRight={-1260}
                leftClickActive={prevButtonEvent}
                rightClickActive={nextButtonEvent}
            />
            : null
            }
            <Suspense fallback={<SpinnerCarRot/>}>
                <Modal active={active} setActive={setActive}>
                    <CheckOrder orderItem={checkOrderItem}/> 
                </Modal> 
            </Suspense>
        </div>
    );
});
export default PromotionBox;