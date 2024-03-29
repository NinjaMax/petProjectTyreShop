import React, { Fragment, useContext, useState } from 'react';
import '../../css/Goods/AllAboutProduct.css';
import ButtonAction from '../buttons/ButtonAction';
import Rating from '../ux/Rating';
import PropsCardIcons from '../cards/PropsCardIcons';
import FlagsIcon from '../cards/FlagsIcon';
import CheckboxBtn from '../select/CheckboxBtn';
import TyreMarking from './TyreMarking';
import SocialMediaLinks from '../socialMedia/SocialMediaLinks';
import { Context } from '../../context/Context';
import { ICard } from '../cards/interfaces/Card.interface';
import { observer } from 'mobx-react-lite';
import { addGoodsToBasket, createBasket, getBasketById, getCompareGoods, getFavoritesGoods, getStorageByIdParam } from '../../restAPI/restGoodsApi';
import WheelMarking from './WheelMarking';
import { tyreBrandLogo } from '../../services/tyreBrandImg.service';
import Modal from '../modal/Modal';
import CheckOrder from '../modal/CheckOrder';
import { ICheckOrderItem } from '../catalogs/types/CheckOrder.type';
import { createStringUrl } from '../../services/stringUrl';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';

const AllAboutProduct = observer(({
    goods, 
    paramsModel,
    paramsModelPrice,
    countModelReview,
    avgRatingModel
}:ICard) => {
    const[guardChecked, setGuardChecked] = useState<boolean>(false);
    const [checkOrderItem, setCheckOrderItem] = useState<ICheckOrderItem[] | null>([]);
    const [active, setActive] = useState<boolean>(false);
    const location = useLocation<any>();
    const { t, i18n } = useTranslation();
    const {page, customer} = useContext<any>(Context);
    const params = useParams<any>();

    const checkedGuards = (e: any) => {
        setGuardChecked(true);
        if (guardChecked) {
            setGuardChecked(false); 
        }
    };

    const moveToAllSamples = () => {
        document.documentElement.scrollTo({
          top: 1340,
          left: 0,
          behavior: "smooth",
        });
    };

    const moveToSimilarGoods = () => {
        document.documentElement.scrollTo({
          top: 1300,
          left: 0,
          behavior: "smooth",
        });
    };

    const addToFavorites = async () => {
        try {
            const favoritesArray: any[] = [];
            favoritesArray.push(...Array.from(new Set([goods?.id])));
            const getFavorite = await getFavoritesGoods(favoritesArray);
            page.setFavoritesCount(getFavorite?.data);
        } catch (error) {
            console.log('COMPARE_ERROR: ', error);
        }
    };

    const addToComparison = async () => {
        try {
            const comparisonArray: any[] = [];
            comparisonArray.push(...Array.from(new Set([goods?.id])));
            const getCompare = await getCompareGoods(comparisonArray);
            page.setComparisonCount(getCompare?.data);
        } catch (error) {
            console.log('COMPARE_ERROR: ',error);
        }
    };
    const checkOrders = async (
        item : any, 
        avgRatingModel: number,
        storageItem: number,
        priceStockIndex: number,
        ) => {
        try {
            setActive(!active);
            if (!active) {
                const getStorageProd = await getStorageByIdParam(storageItem);
                const basket: any = await createBasket({
                    id_customer: customer.customer?.id, 
                    storage: getStorageProd.storage
                });
                if(basket?.status === 201) {
                    const checkItem = checkOrderItem?.find(value => +value.id === +item.id);
                    const addTobasket: any = await addGoodsToBasket(
                    +item.id,
                    item.id_cat,
                    checkItem?.quantity ? checkItem?.quantity + 4 : 4,
                    item.price[priceStockIndex].price_wholesale,
                    item.price[priceStockIndex].price,
                    item.stock[priceStockIndex].id_supplier,
                    item.stock[priceStockIndex].id_storage,
                    item.category?.category,
                    basket.data.id_basket,
                    item.full_name,
                    item.season?.season_ua,
                    avgRatingModel,
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
        <div className='allAboutProduct'>
            {goods?.tyre_brand ?
             <div className='allProductImgBox'>
                <img id='productImgGoods' 
                    src={'/tyre/autotyrespilotspotps2.webp'} 
                    width={400}
                    height={400}
                    //loading='lazy'
                    //decoding='async'
                    alt='productImg'
                />   
            </div>
            : null   
            }
            {goods?.wheel_brand ?
             <div className='allProductImgBox'>
                <img id='productImgGoods' 
                    src={'/disk/vossen_cvt_gloss_graphite-16325-a.webp'} 
                    width={400}
                    height={400}
                    loading='lazy'
                    decoding='async'
                    alt='productImg'
                />   
            </div>  
            : null 
            }
            <div className='allAboutProductInfo'>
                {goods?.tyre_brand ?
                    <div className='productInfoName'>{
                        paramsModel ? t('goodsAboutProd.infoTyre') + ' ' + goods?.tyre_brand?.brand + ' ' + goods?.tyre_model?.model 
                        : goods?.full_name
                        }
                    </div> : null
                }
                {goods?.wheel_brand ?
                    <div className='productInfoName'>{
                        paramsModel ? 'Диски ' + goods?.wheel_brand?.brand 
                        : goods?.full_name
                        }
                    </div> : null
                }
                <div className='productInfoRating'>
                    <Rating
                        id={goods?.id} 
                        numScore={avgRatingModel ?? 0}
                        disabled={true}
                        nameRating='О товаре'
                    />
                    <a className='productInfoRatingLink' href='/#'>
                        {countModelReview ?? 0} 
                        {countModelReview === 1 ? t('goodsAboutProd.review') : t('goodsAboutProd.reviews')}
                    </a>
                    
                    {goods?.tyre_brand?.brand ?
                    <img className='imgAllAboutProduct'
                        src={tyreBrandLogo(goods?.tyre_brand?.brand)} 
                        alt='brandProduct'
                        width={88}
                        height={22}
                    />
                        : null
                    }
                </div>
                {!paramsModel ? 
                <div className="productInfoCode">
                    <div>код товара: {goods?.id}</div>
                    { goods?.stock?.reduce((sum: any, current: any) => (sum + current.stock), 0) > 4 ?
                    <div className='productInfoCodeStock'>
                        <i className="fas fa-check"></i>
                        {t('goodsAboutProd.available')}
                    </div>
                    :
                    <div className='productInfoCodeStockExclam'>
                        <i className="fas fa-exclamation"></i>
                        {t('goodsAboutProd.ends')}
                    </div>
                    }
                </div>
                : null
                }
                <div className='productInfoProps'>
                {goods?.vehicle_type || goods?.season ?
                    <>
                    <PropsCardIcons 
                        type={goods?.vehicle_type}
                        season={goods?.season}
                    />
                    <a href={`${i18n.resolvedLanguage === 'uk' ? /tyres/ : '/ru/tyres/'}${createStringUrl(i18n.resolvedLanguage === 'uk' ? goods?.vehicle_type?.vehicle_type_ua : goods?.vehicle_type?.vehicle_type)}`}>{i18n.resolvedLanguage === 'uk' ? goods?.vehicle_type?.vehicle_type_ua : goods?.vehicle_type?.vehicle_type}</a>
                    <a href={`${i18n.resolvedLanguage === 'uk' ? /tyres/ : '/ru/tyres/'}${createStringUrl(i18n.resolvedLanguage === 'uk' ? goods?.season?.season_ua : goods?.season?.season)}`}>{i18n.resolvedLanguage === 'uk' ? goods?.season?.season_ua : goods?.season?.season}</a>
                    </>
                    :
                    <img src='/iconsSeasons/noSeason.webp' alt='noProd'/>
                }
                </div>
                {!paramsModel ?
                <>
                <div className="productInfoCountry">
                    <FlagsIcon 
                        title={t('goodsAboutProd.country')}
                        country={i18n.resolvedLanguage === 'uk' ? goods?.country?.country_manufacturer_ua : goods?.country?.country_manufacturer} 
                        year={goods?.year}
                    />
                </div>
                <div className='productBonus'>
                    <>
                    <img src='/iconBonus/skyBonus_48_b.webp' 
                        width={30}
                        height={30}
                        alt='bonus'
                        title='Бонуси'
                    />
                    {goods?.price ?
                        <span className='tyresCardBonusText'>{`+${(goods?.price[0]?.price! * 0.01).toFixed()} ${t('goodsAboutProd.bonuses')}`}</span> 
                        : null
                    }
                    <a href='/'>SKYBONUS</a>
                    {goods?.price && goods?.price[0].price > 500 ? 
                    <div className='productBonusReview'>
                    <img 
                        src='/iconBonus/skyBonus_48_b.webp' 
                        width={30}
                        height={30}
                        alt='bonus'
                        title='Бонуси'
                    />
                    <span className='tyresCardBonusText'>
                        +100 {t('goodsAboutProd.bonuses')}
                    </span>
                    <span className='tyresCardBonusTextReview'> {t('goodsAboutProd.for_review')}
                            { i18n.resolvedLanguage === 'uk' ?
                            <span className='tooltipCardBonusText'>
                               <> Нараховуємо єдиноразово 100 бонусів за відгук.<br/> 
                                Що треба зробити:<br/>
                                -купити товар з позначкою "100 бонусів за відгук" на сайті skyparts.com.ua 
                                <br/>
                                -протягом 14 днів після отримання товару залишити відгук про товар <br/>
                                -повідомити менеджера будь яким способом
                                </>
                            </span> :
                            <span className='tooltipCardBonusText'>
                               <> Начисляем единоразово 100 бонусов за отклик.<br/> 
                               Что нужно сделать:<br/>
                               купить товар с пометкой "100 бонусов за отзыв" на сайте skyparts.com.ua
                                <br/>
                                -в течение 14 дней после получения товара оставить отзыв о товаре <br/>
                                -сообщить менеджеру любым способом
                                </>
                            </span>
                            }
                    </span>
                    </div>
                    : null
                    }
                    </>
                </div>
                </>
                : 
                <>
                <a href={`${i18n.resolvedLanguage === 'uk' ? /tyres/ : '/ru/tyres/'}` + createStringUrl(goods?.tyre_brand?.brand)}>
                    {t('goodsAboutProd.all_tyres')} { goods?.tyre_brand?.brand}
                </a>
                <a href={`${i18n.resolvedLanguage === 'uk' ? /tyres/ : '/ru/tyres/'}${createStringUrl(goods?.season?.season_ua)}/${createStringUrl(goods?.tyre_brand?.brand)}`}>
                    Вся {i18n.resolvedLanguage === 'uk' ? goods?.season?.season_ua : goods?.season?.season} шина { goods?.tyre_brand?.brand}
                </a>
                </>
                }
                {!paramsModel ?
                <>
                {goods?.price && goods.price.find((entity: any) => entity.id_storage === 2) ? 
                goods?.price?.map((item: any) =>(
                <Fragment key={item.id}>
                {item.price && !item.old_price && item.id_storage === 2 ?
                    <div className="productInfoPrice">
                        {item.price} &#8372;
                    </div>
                    : null
                }
                {item.price && item.old_price && item.id_storage === 2 ?
                    <div className="productInfoPrice">
                    <div className="productInfoOldPrice">
                        {item.old_price} &#8372;
                    </div>    
                    <div >
                        {item.price} &#8372;
                    </div> 
                    </div>
                    : null
                } 
                    </Fragment>
                )) : 
                    goods?.price?.map((item: any) => (
                    <Fragment key={item.id}>
                    {item.price && item.price.id_storage !== 2 ?
                    <div className="productInfoPrice">
                        {item.price} &#8372;
                    </div> :
                        null
                    }
                    {item.old_price && item.price.id_storage !== 2 ?
                    <div className="productInfoOldPrice">
                        {item.old_price} &#8372;
                    </div> 
                    : null
                    } 
                    </Fragment>
                  ))
                }
                </>
                :null
                }
                {paramsModel ?
                <div className="productInfoPrice">
                {paramsModel && paramsModelPrice && paramsModelPrice[0]?.tyres && goods?.price[0].price ? 
                    <span>{t('goodsAboutProd.from') + 
                    paramsModelPrice[0]?.tyres[0]?.price[0]?.price
                    } 
                    &#8372;
                    </span>
                    : 
                    paramsModelPrice && paramsModelPrice[0]?.wheels ?
                    <span>{t('goodsAboutProd.from') + 
                    paramsModelPrice[0]?.wheels[0]?.price[0]?.price 
                    } 
                    &#8372;
                    </span>
                    :
                    null
                }
                </div> 
                : null
                }
                {goods?.price?.reduce((sum: any, current: any) => sum + current.price, 0) === 0 ? 
                    <div className="productInfoPrice">
                        {t('goodsAboutProd.not_available')}
                    </div>
                    : null 
                }
                {!paramsModel ?
                <>
                <div className='btnGoodsBox'>
                    {goods?.price?.reduce((sum: any, current: any) => sum + current.price, 0) ?
                    <ButtonAction 
                        props={t('goodsAboutProd.buy')} 
                        widthBtn={280} 
                        eventItem={() => checkOrders(
                            goods, 
                            avgRatingModel ?? 0,
                            goods?.price.find((entity: any) => entity.id_storage === 2) ?
                            2 : 1,
                            goods!.price.find((entity: any) => entity.id_storage === 2) ?
                            goods!.price.findIndex((entity: any) => entity.id_storage === 2) :
                            goods!.price.findIndex((entity: any) => entity.id_storage === 1)
                        )}
                    /> :
                    <div>
                    <ButtonAction 
                        props={t('goodsAboutProd.not_available_big')} 
                        widthBtn={280} 
                        active={true}
                    />
                    <p/>
                    <ButtonAction 
                        props={t('goodsAboutProd.show_similar_goods')} 
                        widthBtn={280} 
                        eventItem={moveToSimilarGoods}
                    /> 
                    </div>
                    }     
                </div>
                <div className='btnGoodsBoxTwo'>
                    <input type="tel" placeholder='+38(номер телефона)'/>
                    <ButtonAction 
                        props={t('goodsAboutProd.fast_order')} 
                        widthBtn={230} 
                        eventItem={undefined}
                    />
                </div>
                <div className='checkboxGoodsShield'>
                    <CheckboxBtn 
                    onChange={checkedGuards}
                    value={"garantia"} 
                    titleCheckbox={t('goodsAboutProd.garanty_skysafe')} 
                    imageSrc={guardChecked ? '/iconGuard/guard_64_b.webp' : '/iconGuard/guard_64_g.webp'}/>   
                </div>
                </>
                : 
                <div className='btnGoodsBox'>
                    <ButtonAction 
                        props={t('goodsAboutProd.show_all_variant')} 
                        widthBtn={280} 
                        eventItem={moveToAllSamples}
                    />      
                </div>
                }
                {!paramsModel ?     
                <div className='additionalTools'>
                    <span className='additionalToolsLabel'
                        onClick={addToFavorites}
                    >
                    <i className={page.favoritesCount?.length !== 0 &&
                        page.favoritesCount?.find((item: string) => item === goods?.id) ? 
                        'iconFavoriteProductActive' : 'iconFavoriteProduct' }
                    >  
                    </i>
                        <span className='additionalToolsLabelText'>
                        {page.favoritesCount?.length !== 0 &&
                            page.favoritesCount?.find((item: string) => item === goods?.id) ?
                            t('goodsAboutProd.added_to_favorite') : t('goodsAboutProd.add_to_favorite')
                        }
                        </span> 
                    </span>
                    <span className='additionalToolsLabel'
                        onClick={addToComparison}
                    >
                    <i className={page.comparisonCount?.length !== 0 &&
                        page.comparisonCount?.find((item: string) => item === goods?.id)
                        ? 'iconCompareProductActive' : 'iconCompareProduct'}
                    >  
                    </i>
                        <span className='additionalToolsLabelText'>
                        { page.comparisonCount?.length !== 0 &&
                            page.comparisonCount?.find((item: string) => item === goods?.id) ?
                           t('goodsAboutProd.added_compare') : t('goodsAboutProd.add_to_compare')
                        }
                        </span>  
                    </span>    
                </div>
                : null
                }
                {goods?.tyre_brand ? 
                    <SocialMediaLinks 
                        urlCurrent={ window.location.origin + location.pathname} 
                        hashtag={`${t('goodsAboutProd.infoTyre')}${goods?.tyre_brand?.brand}#${t('goodsAboutProd.infoTyre')}${t('goodsAboutProd.ukraine')}#skyparts`} 
                        quoteLink={t('goodsAboutProd.shareLink') + ' ' + goods?.full_name}
                    /> 
                    : null
                }
                {goods?.wheel_brand ? 
                    <SocialMediaLinks 
                        urlCurrent={window.location.origin + location.pathname} 
                        hashtag={`диски${goods?.wheel_brand?.brand}#диски${t('goodsAboutProd.ukraine')}#skyparts`} 
                        quoteLink={t('goodsAboutProd.shareLink') + ' ' + goods?.full_name}
                    /> 
                    : null
                }
                <Modal active={active} setActive={setActive}>
                    <CheckOrder orderItem={checkOrderItem}/> 
                </Modal> 
            </div>
            <div className='productRightgBox'>
                {goods?.tyre_brand ?
                  <TyreMarking
                    brand={paramsModel ? goods?.tyre_brand?.brand + ' ' + goods?.tyre_model?.model :  goods?.tyre_brand?.brand}
                    param={!paramsModel ? goods?.params?.params : ''}
                />  
                : null
                }
                {goods?.wheel_brand ?
                    <WheelMarking 
                        brand={goods?.tyre_brand?.brand}
                        param={goods?.params?.params}
                        width={goods.width?.width}
                        diameter={goods?.diameter?.diameter}
                        boltCount={goods?.bolt_count?.bolt_count}
                    />
                    : null
                }
                { i18n.resolvedLanguage === 'uk' ?
                <div className='attentionGoods'>
                    ЗВЕРНІТЬ УВАГУ
                    При покупці менше 4-х одиниць товару вартість може бути вище зазначеної. Бувають випадки, коли у нас немає можливості продати менше 4-х одиниць товару.
                    У випадку якщо на складі, у потрібному місті, товару зараз немає - до його вартості додається вартість доставки
                </div> :
                <div className='attentionGoods'>
                    ОБРАТИТЕ ВНИМАНИЕ
                    При покупке менее 4-х единиц товара стоимость может быть выше указанной. Бывают случаи, когда у нас нет возможности продать менее 4 единиц товара.
                    В случае если на складе, в нужном городе, товара сейчас нет – к его стоимости прибавляется стоимость доставки
                </div>
                }
            </div>
        </div>
    );
});

export default AllAboutProduct;