import React, { Fragment, useEffect, useState } from 'react';
import '../../css/CardsCss/TyresCard.css';
import FlagsIcon from './FlagsIcon';
import PropsCardIcons from './PropsCardIcons';
import Rating from '../ux/Rating';
import OptionsTyreBox from './OptionsTyreBox';
//import tyres from '../../assets/autotyrespilotspotps2.png';
import wheels from '../../assets/vossen_cvt_gloss_graphite-16325-a.png';
import ButtonAction from '../buttons/ButtonAction';
import { ICard } from './interfaces/Card.interface';
import { MAIN_ROUTE } from '../../utils/consts';
import { useHistory, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { createStringUrl } from '../../services/stringUrl';
import { 
    getTyresRatingAvgIdAndIdmodel, 
    getWheelsRatingAvgIdAndIdmodel 
} from '../../restAPI/restGoodsApi';
import { IRatingAvg } from '../../pages/types/RatingModelAvg.type';
import OptionsWheelBox from './OptionsWheelBox';

const Card = observer(({goods, optionsBox, typeCard, checkOrders}:ICard) => {
    const [ratingModel, setRatingModel] = useState<IRatingAvg>()
    const history = useHistory();
    const location = useLocation();
    
    useEffect(() => {
        let isMounted = false;
        const getRatingTyreModel = async () => {
          if (!isMounted && (typeCard === 'tyre' || location.pathname.includes('tyres'))) {
            const getRating: any = await getTyresRatingAvgIdAndIdmodel(
                +goods!.id,
                goods?.id_model ?? 0
            );
            if(getRating) {
                setRatingModel(getRating[0]);   
            }
          }
        };
        getRatingTyreModel();
        return () => {
          isMounted = true;
        };
      },[goods, location.pathname, typeCard]);

      useEffect(() => {
        let isMounted = false;
        const getRatingWheelModel = async () => {
          if (!isMounted && (typeCard === 'wheel' || location.pathname.includes('wheels'))) {
            const getWheelRating: any = await getWheelsRatingAvgIdAndIdmodel(
                +goods!.id,
                goods?.id_model ?? 0
            );
            if(getWheelRating) {
                setRatingModel(getWheelRating[0]);   
            }
        }
        };
        getRatingWheelModel();
        return () => {
          isMounted = true;
        };
      },[goods, location.pathname, typeCard]);
    
    const addGoodsId = () => {
        const toStringUrl = createStringUrl(goods?.full_name);
        localStorage.setItem('goodsId', JSON.stringify(goods?.id));
        const getWached = JSON.parse(localStorage.getItem('you_watched')!);
        if (getWached) {
            const wachedArray:any[] = getWached.split(',');
            wachedArray.push(goods?.id);
            if (wachedArray.length > 3) {
                wachedArray.shift();
            }  
            const watchedSet = Array.from(new Set (wachedArray));
            const wachedToString = watchedSet.join(',');
            localStorage.setItem('you_watched', JSON.stringify(wachedToString));   
        } else {
            localStorage.setItem('you_watched', JSON.stringify(goods?.id,));
        }
        history.push(
            MAIN_ROUTE + `${toStringUrl}`
        );
    };
    //console.log('GOODS: ', goods);
    return (
        <div className="tyresCard">
            <div >
                {typeCard === 'tyre' ?
                <a id='tyresName'
                    className='cardLinkProduct'
                    onClick={addGoodsId} 
                    href={'/' + createStringUrl(goods?.full_name)}
                >
                 <img id='imgTyres' src={'/tyre/autotyrespilotspotps2.png'} alt="imgCards" /> 
                </a>
                 : null  
                }
                {typeCard === 'wheel'?
                <a id='tyresName'
                    className='cardLinkProduct'
                    onClick={addGoodsId} 
                    href={'/' + createStringUrl(goods?.full_name)}
                >
                    <img id='imgTyres' src={'/disk/vossen_cvt_gloss_graphite-16325-a.png'} alt="imgCards" /> 
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
                       {goods?.reviews?.length} відгуки
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
                {/* {typeCard === 'tyre' ? */}
                <div className="tyresCardCountry">
                    <FlagsIcon 
                        country={goods?.country} 
                        year={goods?.year}
                    />
                </div>

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