import React, { Fragment, useEffect, useState } from 'react';
import '../../css/CardsCss/TyresCardList.css';
import FlagsIcon from './FlagsIcon';
import PropsCardIcons from './PropsCardIcons';
import Rating from '../ux/Rating';
//import tyres from '../../assets/autotyrespilotspotps2.png';
// import ButtonAction from '../buttons/ButtonAction';
import CountBtnOrder from '../ux/CountBtnOrder';
import { ICard } from './interfaces/Card.interface';
import { useHistory } from 'react-router-dom';
import { IRatingAvg } from '../../pages/types/RatingModelAvg.type';
import { MAIN_ROUTE } from '../../utils/consts';
import { getTyresRatingAvgIdAndIdmodel, getWheelsRatingAvgIdAndIdmodel } from '../../restAPI/restGoodsApi';
import { createStringUrl } from '../../services/stringUrl';
import ButtonAction from '../buttons/ButtonAction';

const CardList = ({goods, forOrder, priceItem, countEvent, checkOrders}: ICard) => {
    const [ratingModel, setRatingModel] = useState<IRatingAvg>()
    const history = useHistory();

    useEffect(() => {
        let isMounted = false;
        const getRatingModel = async () => {
        //   const taskProduct: any[] = [
        //     getTyresModelRatingAvg,
        //   ];
        // let i: number = 0; 
        // while (taskProduct.length > i) {
          //if (!isMounted && taskProduct[i] === getTyresModelRatingAvg && goods) {
            if (!isMounted && goods?.category?.category === ('легковые шины' || 'грузовые шины')) {
                const getRating: any = await getTyresRatingAvgIdAndIdmodel(
                    +goods!.id,
                    goods?.id_model ?? 0
                );
                setRatingModel(getRating[0]);
            }
            if (!isMounted && goods?.category?.category === 'Диски') {
                const getWheelRating: any = await getWheelsRatingAvgIdAndIdmodel(
                    +goods!.id,
                    goods?.id_model ?? 0
                );
                setRatingModel(getWheelRating[0]);
            }
        //   const task = taskProduct.shift();
        //   task();
        //   await yieldToMain();
        //}
        };
        getRatingModel();
        return () => {
          isMounted = true;
        };
    },[goods, goods?.id_model]);
     
    const addGoodsId = () => {
        const toStringUrl = createStringUrl(goods?.full_name);
        localStorage.setItem('goodsId', JSON.stringify(goods?.id));
        history.push(
            MAIN_ROUTE + `${toStringUrl}`
        );
    };

    
    return (
        <div className="tyresCardList"
            onClick={() => console.log('CLICK_CARD_LIST')}
            //onClick={(e: any) => e.stopPropagation()}
        >
            <img id='imgTyresList' src={'/tyre/autotyrespilotspotps2.png'} alt="tyres" />
            <div className='tyresCardListBox'>    
                <a  id='nameCardList' 
                    onClick={addGoodsId} 
                    href={createStringUrl(goods?.full_name)}>
                    {goods?.full_name}
                </a>
                <div className='ratingTyresList'>
                    <Rating 
                        id={goods?.id}
                        numScore={goods?.ratingCount ??
                            ratingModel?.avgRatingModel ?? 0}
                        disabled={true}
                        nameRating='Список карт'
                    />
                    <a className='reviewLink' href='/#'>
                        {goods?.reviewCount ?? goods?.reviews?.length} відгуків
                    </a>
                </div>
                <div className="tyresCardCodeList">
                    код товара: {goods?.id}
                </div>
                {!forOrder ?
                    <div className='propsCardList'>
                        <PropsCardIcons
                            type={goods?.vehicle_type}
                            season={goods?.season}
                            homologation={goods?.homologation}
                        />
                    </div>
                :null}
                {!forOrder ?
                    <div className="tyresCardCountryList">
                        <FlagsIcon
                            country={goods?.country} 
                            year={goods?.year}
                        />
                    </div>
                :null}
                { goods?.price && !priceItem ?
                <div className='priceAndBtnCard'>      
                    <div className="tyresCardPriceList">
                    {goods?.price && goods?.price.find((entity: any) => entity.id_storage === 2) ? 
                    goods?.price.map((item: any) => (
                    <Fragment key={item.id}>
                    {item.price && !item.old_price && item.id_storage === 2 ?
                    <div className="tyresCardPriceItem" >
                        {item.price} &#8372;
                    </div> :
                    null
                    }
                    {item.price && item.old_price && item.id_storage === 2 ?
                    <div className="tyresCardPriceItem" >
                    <div className="tyresCardOldPriceItem" >
                        {item.old_price} &#8372;
                    </div> 
                    <div>
                        {item.price} &#8372;
                    </div>
                    </div>
                    : null
                    } 
                    </Fragment>
                    )) 
                  :  
                    goods?.price.map((item: any) => (
                    <Fragment key={item.id}>
                    {item.price && item.price.id_storage !== 2 ?
                        <div className="tyresCardPriceItem">
                            {item.price} &#8372;
                        </div> 
                        : null
                    }
                    {item.old_price && item.price.id_storage !== 2 ?
                        <div className="tyresCardOldPriceItem">
                            {item.old_price} &#8372;
                        </div> 
                        : null
                    } 
                    </Fragment>
                      ))
                    }
                    {goods?.price?.reduce((sum: any, current: any) => sum + current.price, 0) === 0 ? 
                        <div className="tyresCardPriceItem">
                            немає в наявності
                        </div>
                        : null 
                    }
                    </div>
                </div> 
                : 
                    <div className="tyresCardPriceItem">
                        {priceItem ?? 0} &#8372;
                    </div> 
                }
                { !priceItem && !forOrder ?
                <div className='buttonBuyCardList'>
                {goods?.price?.reduce((sum: any, current: any) => sum + current.price, 0) ?
                    <ButtonAction 
                        props={"КУПИТИ"} 
                        widthBtn={160} 
                        eventItem={() => {
                            checkOrders!(
                                goods, 
                                ratingModel,
                                goods?.price?.find((entity: any) => entity.id_storage === 2) ?
                                2 : 1,
                                goods?.price?.find((entity: any) => entity.id_storage === 2) ?
                                goods?.price?.findIndex((entity: any) => entity.id_storage === 2) :
                                goods?.price?.findIndex((entity: any) => entity.id_storage === 1)
                            )
                        }}
                    />
                    : 
                    <ButtonAction 
                        props={"НЕМАЄ"} 
                        widthBtn={160} 
                        eventItem={checkOrders}
                        active={true}
                    />
                }
                </div> :
                null
                }
                { forOrder ?
                        <div>
                            <CountBtnOrder
                                dataId= {goods?.id_basket_storage}
                                countAction={countEvent} 
                                countGoods={goods?.quantity ?? 4}
                            />   
                        </div>
                    : null
                }               
            </div>
        </div>
       
    );
};

export default CardList;