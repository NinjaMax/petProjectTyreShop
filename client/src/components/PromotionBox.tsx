import React, { Fragment, useContext, useEffect, useState } from 'react';
import '../css/PromotionBox.css';
import Card from './cards/Card';
import ButtonPrevNext from './buttons/ButtonPrevNext';
import Modal from './modal/Modal';
import CheckOrder from './modal/CheckOrder';
import { ICheckOrderItem } from './catalogs/types/CheckOrder.type';
import { Context } from '../context/Context';
import { addGoodsToBasket, createBasket, getBasketById } from '../restAPI/restGoodsApi';
import { observer } from 'mobx-react-lite';

type IPromoBox = {
    itemsArray: any[] | null;
    prevButtonEvent(arg0: any): void;
    nextButtonEvent(arg0: any): void;
    prevBtn:number;
    nextBtn: number;
};

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
                    item.season?.season_ua,
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
        <div className='promotionBox'>
            {itemsArray?.length !== 0 && prevBtn >= 0 ? 
                itemsArray?.slice(prevBtn, nextBtn).map(
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
            {itemsArray?.length !== 0 && prevBtn < 0? 
                [...itemsArray!.slice(prevBtn, undefined), ...itemsArray!.slice(0, itemsArray!.length - prevBtn)]
                .slice(0, 4)
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
            <ButtonPrevNext 
                prevTop={155} 
                prevBtnLeft={35}
                nextTop={155}
                nextBtnRight={35}
                leftClickActive={prevButtonEvent}
                rightClickActive={nextButtonEvent}
            />
            <Modal active={active} setActive={setActive}>
                <CheckOrder orderItem={checkOrderItem}/> 
            </Modal> 
        </div>
    );
});
export default PromotionBox;