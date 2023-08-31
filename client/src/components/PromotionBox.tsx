import React, { Fragment, useEffect, useState } from 'react';
import '../css/PromotionBox.css';
import Card from './cards/Card';
import ButtonPrevNext from './buttons/ButtonPrevNext';

type IPromoBox = {
    itemsArray: any[] | null;
};

const PromotionBox = ({itemsArray}: IPromoBox) => {
    const [initialArray, setInitialArray] = useState<any[] | null>(itemsArray);
    const [goodsArray, setGoodsArray] = useState<any[] | null>(itemsArray);
    const [prevBtn, setPrevBtn] = useState<number>(0);
    const [nextBtn, setNextBtn] = useState<number>(4);

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

    const prevBtnEvent = () => {
        setPrevBtn(oldPrevBtn => oldPrevBtn - 1);
        setNextBtn(oldNextBtn => oldNextBtn - 1);
        //console.log('PREV BTN ACTION', prevBtn);
    };

    const nextBtnEvent = () => {
        setPrevBtn(oldPrevBtn => oldPrevBtn + 1);
        setNextBtn(oldNextBtn => oldNextBtn + 1);
        //console.log('NEXT BTN ACTION', nextBtn);
    };
    console.log('PREV BTN ACTION', prevBtn);
    console.log('NEXT BTN ACTION', nextBtn);
    console.log('ITEM_ARRAY: ', itemsArray);
    console.log('INITIAL_ARRAY: ', initialArray);

    return (

        <div className='promotionBox'>
            
            {goodsArray?.length !== 0 ? goodsArray?.map(
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
                leftClickActive={prevBtnEvent}
                rightClickActive={nextBtnEvent}
            />
        </div>
    );
};
export default PromotionBox;