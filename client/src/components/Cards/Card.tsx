import React, { Fragment, useEffect, useState } from 'react';
import '../../css/CardsCss/TyresCard.css';
import FlagsIcon from './FlagsIcon';
import PropsCardIcons from './PropsCardIcons';
import Rating from '../ux/Rating';
import OptionsTyreBox from './OptionsTyreBox';
import tyres from '../../assets/autotyrespilotspotps2.png';
import wheels from '../../assets/vossen_cvt_gloss_graphite-16325-a.png';
import ButtonAction from '../buttons/ButtonAction';
import { ICard } from './interfaces/Card.interface';
import { MAIN_ROUTE } from '../../utils/consts';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { createStringUrl } from '../../services/stringUrl';
import { 
    getTyresRatingAvgIdAndIdmodel, 
    getWheelsRatingAvgIdAndIdmodel 
} from '../../restAPI/restGoodsApi';
import { yieldToMain } from '../../restAPI/postTaskAdmin';
import { IRatingAvg } from '../../pages/types/RatingModelAvg.type';
import OptionsWheelBox from './OptionsWheelBox';

const Card = observer(({goods, optionsBox, typeCard, checkOrders}:ICard) => {
    const [ratingModel, setRatingModel] = useState<IRatingAvg>()
    const history = useHistory();
    
    useEffect(() => {
        let isMounted = false;
        const getRatingModel = async () => {
          const taskProduct: any[] = [
            getTyresRatingAvgIdAndIdmodel,
            getWheelsRatingAvgIdAndIdmodel,
          ];
        let i: number = 0; 
        while (taskProduct.length > i) {
          if (!isMounted && taskProduct[i] === getTyresRatingAvgIdAndIdmodel 
            && goods) {
            const getRating: any = await taskProduct[i](
                goods?.id,
                goods?.id_model);
            if(getRating) {
             setRatingModel(getRating[0]);   
            }
          }
          if (!isMounted && taskProduct[i] === getWheelsRatingAvgIdAndIdmodel 
            && goods) {
            const getWheelRating: any = await taskProduct[i](
                goods?.id,
                goods?.id_model
            );
            if(getWheelRating) {
             setRatingModel(getWheelRating[0]);   
            }
          }
          const task = taskProduct.shift();
          task();
          await yieldToMain();
        }
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
        <div className="tyresCard">
            <div >
                {typeCard === 'tyre' ?
                <a id='tyresName'
                    className='cardLinkProduct'
                    onClick={addGoodsId} 
                    href={'/' + createStringUrl(goods?.full_name)}
                >
                 <img id='imgTyres' src={tyres} alt="imgCards" /> 
                </a>
                 : null  
                }
                {typeCard === 'wheel'?
                <a id='tyresName'
                    className='cardLinkProduct'
                    onClick={addGoodsId} 
                    href={'/' + createStringUrl(goods?.full_name)}
                >
                    <img id='imgTyres' src={wheels} alt="imgCards" /> 
                </a>
                 : null  
                }
                <p/>
                <div className='tyresCardLinkName'>
                <a id='tyresName'
                    className='cardLinkProduct'
                    onClick={addGoodsId} 
                    href={'/' + createStringUrl(goods?.full_name)}
                >
                {typeCard === 'tyre' ?
                    goods?.full_name
                    : null
                }
                {typeCard === 'wheel' ?
                    goods?.full_name_color
                    : null
                }
                </a>
                </div>
                <div className='ratingTyres'>
                    <Rating 
                        id={goods?.id}
                        numScore={ratingModel?.avgRatingModel ?? 0}
                        disabled={true}
                        nameRating='Карта товара'
                    />
                    <a className='reviewCard' 
                        onClick={addGoodsId}
                        href={goods?.reviews?.length !== 0 ? 
                        createStringUrl(goods?.full_name) +'#vidguki' : 
                        '#'}
                    >
                       {goods?.reviews.length} відгуки
                    </a>
                </div>
                <div className="tyresCardCode">код товара: {goods?.id}</div>
                <div className='propsCard'>
                    <PropsCardIcons
                        type={goods?.vehicle_type}
                        type_wheel={goods?.type}
                        season={goods?.season}
                        homologation={goods?.homologation}
                    />
                </div>
                {typeCard === 'tyre' ?
                <div className="tyresCardCountry">
                    <FlagsIcon 
                        country={goods?.country} 
                        year={goods?.year}
                    />
                </div>
                : null
                }
                <div className='tyresCardBonus'>
                   <img src='/iconBonus/skyBonus_48_b.png' 
                    width={30}
                    height={30}
                    alt='bonus'
                    title='Бонуси'
                    />
                <span className='tyresCardBonusText'>{`+${(goods?.price[0]?.price! * 0.015).toFixed()} бонусів`}</span> 
                </div>
                
                {goods?.price ? goods?.price.map((item: any) => (
                    <Fragment key={item.id}>
                    {item.price ?
                    <div className="tyresCardPrice">
                        {item.price} &#8372;
                    </div> :
                    <div className="tyresCardPrice">
                        немає в наявності
                    </div>  
                    }
                    {item.old_price ?
                    <div className="tyresCardOldPrice">
                        {item.old_price} &#8372;
                    </div> 
                    : null
                    } 
                    </Fragment>
                  ))
                  : <div className="tyresCardPrice">
                        немає в наявності
                    </div> 
                }
                { goods?.price[0].price ?
                    <ButtonAction 
                        props={"КУПИТИ"} 
                        widthBtn={260} 
                        eventItem={() => {
                            checkOrders!(goods, ratingModel)
                        }}
                    />
                    : 
                    <ButtonAction 
                        props={"КУПИТИ"} 
                        widthBtn={260} 
                        eventItem={checkOrders}
                        active={false}
                    />
                }
                <p/>    
            </div>
            { optionsBox && typeCard === 'tyre' ?
                <OptionsTyreBox character={goods}/>
            :null}
            { optionsBox && typeCard === 'wheel' ?
                <OptionsWheelBox character={goods}/>
            :null}
            <p/>     
        </div>
    );
});

export default Card;