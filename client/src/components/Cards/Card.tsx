import React, { Fragment, useEffect, useState } from 'react';
import '../../css/CardsCss/TyresCard.css';
import FlagsIcon from './FlagsIcon';
import PropsCardIcons from './PropsCardIcons';
import Rating from '../ux/Rating';
import OptionsTyreBox from './OptionsTyreBox';
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
import { useTranslation } from 'react-i18next';

const Card = observer(({goods, optionsBox, typeCard, checkOrders}:ICard) => {
    const [ratingModel, setRatingModel] = useState<IRatingAvg>();
    const { t, i18n } = useTranslation();
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
        history.push(i18n.resolvedLanguage === 'uk' ? MAIN_ROUTE + `${toStringUrl}` : '/ru' +
            MAIN_ROUTE + `${toStringUrl}`
        );
    };

    const restStockCard: number = goods?.price?.reduce((sum: any, current: any) => sum + current.price, 0); 
    //console.log('GOODS: ', goods);
    return (
        <div className="tyresCard">
            <div >
                {typeCard === 'tyre' ?
                <a id={goods?.id + '_good'}
                    className='cardLinkProduct'
                    onClick={addGoodsId} 
                    href={i18n.resolvedLanguage === 'uk' ?  createStringUrl(goods?.full_name) : '/ru/' + createStringUrl(goods?.full_name)}
                >
                <img id='imgTyres' 
                    src={'/tyre/autotyrespilotspotps2.webp'} 
                    width={200}
                    height={200} 
                    sizes='(max-width: 2560px) 200px,
                        (max-width: 1440px) 200px,
                        (max-width: 1024px) 200px,
                        (max-width: 768px) 200px,
                        (max-width: 425px) 200px,
                        (max-width: 375px) 200px,
                        (max-width: 320px) 200px, 100vw'
                    alt="imgCards"
                    loading='lazy'
                    decoding='async' 
                /> 
                </a>
                 : null  
                }
                {typeCard === 'wheel'?
                <a id={goods?.id + '_product'}
                    className='cardLinkProduct'
                    onClick={addGoodsId} 
                    href={i18n.resolvedLanguage === 'uk' ? createStringUrl(goods?.full_name) : '/ru/' + createStringUrl(goods?.full_name)}
                >
                    <img 
                        id='imgTyres' 
                        src={'/disk/vossen_cvt_gloss_graphite-16325-a.webp'} 
                        width={200}
                        height={200}
                        sizes='(max-width: 2560px) 200px,
                        (max-width: 1440px) 200px,
                        (max-width: 1024px) 200px,
                        (max-width: 768px) 200px,
                        (max-width: 425px) 200px,
                        (max-width: 375px) 200px,
                        (max-width: 320px) 200px, 100vw'
                        alt="imgCards"
                        loading='lazy' 
                        decoding='async' 
                    /> 
                </a>
                 : null  
                }
                <p/>
                <div className='tyresCardLinkName'>
                <a id={goods?.id + '_product'}
                    className='cardLinkProduct'
                    onClick={addGoodsId} 
                    href={i18n.resolvedLanguage === 'uk' ? '/' + createStringUrl(goods?.full_name) : '/ru/' + createStringUrl(goods?.full_name)}
                >
                {typeCard === 'tyre' ?
                    goods?.full_name
                    : null
                }
                {typeCard === 'wheel' ?
                    goods?.full_name
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
                       {goods?.reviews?.length} {t('card.review')}
                    </a>
                </div>
                <div className="tyresCardCode">{t('card.goods_code')} {goods?.id}</div>
                <div className='propsCard'>
                    <PropsCardIcons
                        type={goods?.vehicle_type}
                        type_wheel={goods?.type}
                        season={goods?.season}
                        homologation={goods?.homologation}
                    />
                </div>
                <div className="tyresCardCountry">
                {typeCard === 'tyre' ?    
                    <FlagsIcon 
                        title={t('card.title_country')}
                        country={i18n.resolvedLanguage === 'uk' ? goods?.country?.country_manufacturer_ua : goods?.country?.country_manufacturer} 
                        year={goods?.year}
                    /> 
                    : null
                }
                </div>
                <div className='tyresCardBonus'>
                   <img src='/iconBonus/skyBonus_48_b.webp' 
                    width={30}
                    height={30}
                    alt='bonus'
                    title='Бонуси'
                    loading='lazy'
                    />
                <span className='tyresCardBonusText'>{`+${(goods?.price[0]?.price! * 0.01).toFixed()} ${t('card.bonus')}`}</span> 
                </div>
                {goods?.price && goods.price.find((entity: any) => entity.id_storage === 2) ? 
                    goods?.price.map((item: any) => (
                    <Fragment key={item.id}>
                    {item.price && !item.old_price && item.id_storage === 2 ?
                    <div className="tyresCardPrice">
                        {item.price} &#8372;
                    </div> 
                    :
                        null
                    }
                    {item.price && item.old_price && item.id_storage === 2 ?
                    <div className="tyresCardPrice">
                    <div className="tyresCardOldPrice">
                        {item.old_price} &#8372;
                    </div>    
                    <div >
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
                    <div className="tyresCardPrice">
                        {item.price} &#8372;
                    </div> :
                        null
                    }
                    {item.old_price && item.price.id_storage !== 2 ?
                    <div className="tyresCardOldPrice">
                        {item.old_price} &#8372;
                    </div> 
                    : null
                    } 
                    </Fragment>
                  ))
                }
                {restStockCard === 0 ? 
                    <div className="tyresCardPrice">
                        {t('card.not_available')}
                    </div>
                    : null 
                }
                { restStockCard ?
                    <ButtonAction 
                        id={goods?.id + '_buy'}
                        props={t('card.buy')} 
                        widthBtn={260} 
                        eventItem={() => {
                            checkOrders!(
                                goods, 
                                ratingModel,
                                goods?.price.find((entity: any) => entity.id_storage === 2) ?
                                2 : 1,
                                goods?.price.find((entity: any) => entity.id_storage === 2) ?
                                goods?.price.findIndex((entity: any) => entity.id_storage === 2) :
                                goods?.price.findIndex((entity: any) => entity.id_storage === 1)
                            )
                        }}
                    />
                    : 
                    <ButtonAction 
                        id={goods?.id + '_buy'}
                        props={t('card.not_available_big')} 
                        widthBtn={260} 
                        eventItem={checkOrders}
                        active={true}
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