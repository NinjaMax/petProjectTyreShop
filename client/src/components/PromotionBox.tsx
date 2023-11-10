import React, { Fragment, useContext, useState } from 'react';
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
                prevBtnLeft={-1}
                nextTop={-275}
                nextBtnRight={-94}
                leftClickActive={prevButtonEvent}
                rightClickActive={nextButtonEvent}
            />
            : null
            }

            <Modal active={active} setActive={setActive}>
                <CheckOrder orderItem={checkOrderItem}/> 
            </Modal> 
        </div>
    );
});
export default PromotionBox;