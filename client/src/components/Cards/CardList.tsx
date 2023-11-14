import React, { Fragment, useEffect, useState } from 'react';
import '../../css/CardsCss/TyresCardList.css';
import FlagsIcon from './FlagsIcon';
import PropsCardIcons from './PropsCardIcons';
import Rating from '../ux/Rating';
import tyres from '../../assets/autotyrespilotspotps2.png';
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
            if (!isMounted && goods?.category.category === ('легковые шины' || 'грузовые шины')) {
                const getRating: any = await getTyresRatingAvgIdAndIdmodel(
                    +goods!.id,
                    goods?.id_model ?? 0
                );
                setRatingModel(getRating[0]);
            }
            if (!isMounted && goods?.category.category === 'Диски') {
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
    }
    
    return (
        <div className="tyresCardList">
            <img id='imgTyresList' src={tyres} alt="tyres" />
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
                <div className='priceAndBtnCard'>      
                    <div className="tyresCardPriceList">
                    {goods?.price && !priceItem ? goods?.price.map((item: any) => (
                    <Fragment key={item.id}>
                    {item.price ?
                    <div className="tyresCardPriceItem" >
                        {item.price} &#8372;
                    </div> :
                    <div className="tyresCardPriceItem">
                        немає в наявності
                    </div>  
                    }
                    {item.old_price ?
                    <div className="tyresCardOldPriceItem" >
                        {item.old_price} &#8372;
                    </div> 
                    : null
                    } 
                    </Fragment>
                    ))
                  : <div className="tyresCardPriceItem">
                       {priceItem ?? 'немає в наявності'}
                    </div> 
                    }
                    </div>
                </div>
                <div className='buttonBuyCardList'>
                { goods?.price[0]?.price ?
                    <ButtonAction 
                        props={"КУПИТИ"} 
                        widthBtn={160} 
                        eventItem={() => {
                            checkOrders!(goods, ratingModel)
                        }}
                    />
                    : 
                    <ButtonAction 
                        props={"КУПИТИ"} 
                        widthBtn={160} 
                        eventItem={checkOrders}
                        active={false}
                    />
                }
                </div>
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