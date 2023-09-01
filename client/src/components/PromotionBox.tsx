import React, { Fragment, useEffect, useState } from 'react';
import '../css/PromotionBox.css';
import Card from './cards/Card';
import ButtonPrevNext from './buttons/ButtonPrevNext';

type IPromoBox = {
    itemsArray: any[] | null;
    prevButtonEvent(arg0: any): void;
    nextButtonEvent(arg0: any): void;
    prevBtn:number;
    nextBtn: number;
};

const PromotionBox = ({
    itemsArray, 
    prevButtonEvent,
    nextButtonEvent,
    prevBtn,
    nextBtn
}: IPromoBox) => {
    // const [initialArray, setInitialArray] = useState<any[] | null>(itemsArray);
    // const [goodsArray, setGoodsArray] = useState<any[] | null>(itemsArray);
    // const [prevBtn, setPrevBtn] = useState<number>(0);
    // const [nextBtn, setNextBtn] = useState<number>(4);

    // useEffect(() => {
    //     if (itemsArray && prevBtn === 0 && nextBtn === 4) {
    //        setGoodsArray(itemsArray.slice(0, 4)); 
    //        console.log('INITIAL STATE ACTION SLICE');
    //     } 
    //     if (prevBtn !== 0 && nextBtn !== 4) {
    //         setGoodsArray(initialArray!.slice(prevBtn, nextBtn));
    //         console.log('ARRAY ACTION SLICE');
    //     }
    // },[initialArray, itemsArray, nextBtn, prevBtn]);

    // useEffect(() =>{
    //     if (itemsArray && prevBtn && nextBtn) {
    //         setGoodsArray(itemsArray.slice(prevBtn, nextBtn));
    //         console.log('NEXT PREV ACTION SLICE');
    //     } 
    // },[itemsArray, nextBtn, prevBtn])

    // const prevBtnEvent = () => {
    //     setPrevBtn(oldPrevBtn => oldPrevBtn - 1);
    //     setNextBtn(oldNextBtn => oldNextBtn - 1);
    //     //console.log('PREV BTN ACTION', prevBtn);
    // };

    // const nextBtnEvent = () => {
    //     setPrevBtn(oldPrevBtn => oldPrevBtn + 1);
    //     setNextBtn(oldNextBtn => oldNextBtn + 1);
    //     //console.log('NEXT BTN ACTION', nextBtn);
    // };
    // console.log('PREV BTN GET_ACTION', prevBtn);
    // console.log('NEXT BTN GET_ACTION', nextBtn);
    // console.log('ITEM_ARRAY: ', itemsArray);

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
                    checkOrders={undefined}
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
                    checkOrders={undefined}
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
        </div>
    );
};
export default PromotionBox;