import React, { Fragment, useContext, useEffect, useState } from 'react';
import '../../css/CardsCss/TyresCard.css';
import FlagsIcon from './FlagsIcon';
import PropsCardIcons from './PropsCardIcons';
import Rating from '../ux/Rating';
import OptionsTyreBox from './OptionsTyreBox';
import tyres from '../../assets/autotyrespilotspotps2.png';
import wheels from '../../assets/vossen_cvt_gloss_graphite-16325-a.png';
import ButtonAction from '../buttons/ButtonAction';
import { ICard } from './interfaces/Card.interface';
import { GOODS_ROUTE, MAIN_ROUTE } from '../../utils/consts';
import { Link, NavLink, useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom';
import { Context } from '../../context/Context';
import { observer } from 'mobx-react-lite';
import { createStringUrl } from '../../services/stringUrl';
import { getTyresModelRatingAvg, getWheelsModelRatingAvg } from '../../restAPI/restGoodsApi';
import { yieldToMain } from '../../restAPI/postTaskAdmin';
import { IRatingAvg } from '../../pages/types/RatingModelAvg.type';

const Card = observer(({goods, optionsBox, typeCard, checkOrders}:ICard) => {
    const {page} = useContext<any>(Context);
    const [ratingModel, setRatingModel] = useState<IRatingAvg>()
    const history = useHistory();
    const goodsItem = useParams();
    const location = useLocation();
    let match = useRouteMatch('/:goodsItem');
    
    useEffect(() => {
        let isMounted = false;
        const getRatingModel = async () => {
          const taskProduct: any[] = [
            getTyresModelRatingAvg,
            getWheelsModelRatingAvg
          ];
        let i: number = 0; 
        while (taskProduct.length > i) {
          if (!isMounted && taskProduct[i] === getTyresModelRatingAvg && goods) {
            const getRating: any = await taskProduct[i](goods?.id_model);
            if(getRating) {
             setRatingModel(getRating[0]);   
            }
          }
          if (!isMounted && taskProduct[i] === getWheelsModelRatingAvg && goods) {
            const getRating: any = await taskProduct[i](goods?.id_model);
            if(getRating) {
             setRatingModel(getRating[0]);   
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

    //console.log('GOODS: ', goods);

    return (
        <div className="tyresCard">
            <div >
                {typeCard === 'tyre' ?
                 <img id='imgTyres' src={tyres} alt="imgCards" /> 
                 : null  
                }
                {typeCard === 'wheel'?
                 <img id='imgTyres' src={wheels} alt="imgCards" /> 
                 : null  

                }
                <p/>
                <div className='tyresCardLinkName'>
                <a id='tyresName'
                    onClick={addGoodsId} 
                    href={createStringUrl(goods?.full_name)}
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
                    <a className='reviewCard' href='/#'>
                       {goods?.reviews.length} відгуки
                    </a>
                </div>
                <div className="tyresCardCode">код товара: {goods?.id}</div>
                <div className='propsCard'>
                    <PropsCardIcons
                        type={goods?.vehicle_type}
                        type_wheel={goods?.type}
                        season={goods?.season}
                    />
                </div>
                {typeCard === 'wheel' ?
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
                        eventItem={() =>{
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
            { optionsBox ?
                <OptionsTyreBox character={goods}/>
            :null}
            <p/>     
        </div>
    );
});

export default Card;