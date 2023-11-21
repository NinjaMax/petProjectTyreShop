import React, { useContext, useEffect, useState } from 'react';
import '../../css/Goods/AllAboutProduct.css';
import productImage from './tyre/autotyrespilotspotps2.png';
import wheelProduct from '../../assets/vossen_cvt_gloss_graphite-16325-a.png';
import heartImg from '../../assets/icons/heart_64BlueClear.png';
import scaleImg from '../../assets/icons/scales50.png';
import ButtonAction from '../buttons/ButtonAction';
import Rating from '../ux/Rating';
import PropsCardIcons from '../cards/PropsCardIcons';
import FlagsIcon from '../cards/FlagsIcon';
import CheckboxBtn from '../select/CheckboxBtn';
import TyreMarking from './TyreMarking';
import SocialMediaLinks from '../socialMedia/SocialMediaLinks';
import { useParams } from 'react-router-dom';
import { Context } from '../../context/Context';
import { ICard } from '../cards/interfaces/Card.interface';
import { observer } from 'mobx-react-lite';
import { addGoodsToBasket, createBasket, getBasketById, getCompareGoods, getFavoritesGoods } from '../../restAPI/restGoodsApi';
import WheelMarking from './WheelMarking';
import { tyreBrandLogo } from '../../services/tyreBrandImg.service';
import Modal from '../modal/Modal';
import CheckOrder from '../modal/CheckOrder';
import { ICheckOrderItem } from '../catalogs/types/CheckOrder.type';
import { createStringUrl } from '../../services/stringUrl';

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
    // const param = useParams<any>();
    const {page, customer} = useContext<any>(Context);

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
        avgRatingModel: number | undefined
        ) => {
        try {
            setActive(!active);
            if (!active) {
                const basket: any = await createBasket(
                    customer.customer?.id,
                );
                //console.log('CREATE_BASKET_ID_BASKET: ', basket.data.id_basket);
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
                    avgRatingModel,
                    item.reviews.length,
                    item.diameter.diameter,
                    ); 
                    //console.log('ADD_BASK: ', addTobasket);
                    if (addTobasket?.status === 201) {
                        const updateBasketStorage = await getBasketById(basket.data.id_basket);
                        setCheckOrderItem(
                            [...updateBasketStorage?.basket_storage]
                        );
                        page.setBasketCount(
                            updateBasketStorage?.basket_storage.reduce(
                                (sum: any, current: any) => (sum + current.quantity),0)
                        );
                    //console.log('BASKET_ORDERS_ARR: ', basket?.data.basket_storage);
                    //console.log('ADD_TO_BASKET: ', addTobasket?.data); 
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
                <img id='productImgGoods' src={'/tyre/autotyrespilotspotps2.png'} alt='productImg'/>   
            </div>
            : null   
            }
            {goods?.wheel_brand ?
             <div className='allProductImgBox'>
                <img id='productImgGoods' src={'/disk/vossen_cvt_gloss_graphite-16325-a.png'} alt='productImg'/>   
            </div>  
            : null 
            }
            
            <div className='allAboutProductInfo'>
                {goods?.tyre_brand ?
                    <div className='productInfoName'>{
                        paramsModel ? 'Шини ' + goods?.tyre_brand?.brand + ' ' + goods?.tyre_model?.model 
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
                        {countModelReview === 1 ? ' відгук' : ' відгуків'}
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
                        в наявності
                    </div>
                    :
                    <div className='productInfoCodeStockExclam'>
                        <i className="fas fa-exclamation"></i>
                        закінчується
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
                    <a href={`/tyres/${createStringUrl(goods?.vehicle_type?.vehicle_type_ua)}`}>{goods?.vehicle_type?.vehicle_type_ua}</a>
                    <a href={`/tyres/${createStringUrl(goods?.season?.season_ua)}`}>{goods?.season?.season_ua}</a>
                    </>
                    :
                    <img src='iconsSeasons/noSeason.png' alt='noProd'/>
                    }
                </div>
                {!paramsModel ?
                <>
                <div className="productInfoCountry">
                    <FlagsIcon 
                        country={goods?.country} 
                        year={goods?.year}
                    />
                </div>
                <div className='productBonus'>
                    <>
                    <img src='./iconBonus/skyBonus_48_b.png' 
                        width={30}
                        height={30}
                        alt='bonus'
                        title='Бонуси'
                    />
                    {goods?.price ?
                        <span className='tyresCardBonusText'>{`+${(goods?.price[0]?.price! * 0.015).toFixed()} бонусів`}</span> 
                        : null
                    }
                    <a href='/'>SKYBONUS</a>
                    {goods?.price && goods?.price[0].price > 500 ? 
                    <div className='productBonusReview'>
                    <img 
                        src='./iconBonus/skyBonus_48_b.png' 
                        width={30}
                        height={30}
                        alt='bonus'
                        title='Бонуси'
                    />
                    <span className='tyresCardBonusText'>
                        +100 бонусів
                    </span>
                    <span className='tyresCardBonusTextReview'> за відгук 
                            <span className='tooltipCardBonusText'>
                               <> Нараховуємо єдиноразово 100 бонусів за відгук.<br/> 
                                Що треба зробити:<br/>
                                -купити товар з позначкою "100 бонусів за відгук" на сайті skyparts.com.ua 
                                <br/>
                                -протягом 14 днів після отримання товару залишити відгук про товар <br/>
                                -повідомити менеджера будь яким способом
                                </>
                            </span>
                    </span>
                    </div>
                    : null
                    }
                    </>
                </div>
                </>
                : 
                <>
                <a href={'/tyres/' + createStringUrl(goods?.tyre_brand?.brand)}>
                    Всі шини { goods?.tyre_brand?.brand}
                </a>
                <a href={`/tyres/${createStringUrl(goods?.season?.season_ua)}/${createStringUrl(goods?.tyre_brand?.brand)}`}>
                    Вся {goods?.season?.season_ua} шина { goods?.tyre_brand?.brand}
                </a>
                </>
                }
                {!paramsModel && goods?.price ? goods?.price.map((item: any) =>(
                    <div className="productInfoPrice" key={item.id}>
                        {item.price} &#8372;
                    </div> 
                    )) : 
                <div className="productInfoPrice">
                {paramsModelPrice && paramsModelPrice[0]?.tyres ? 
                    <span>{'від ' + 
                    paramsModelPrice[0]?.tyres[0]?.price[0]?.price
                    //paramsModelPrice[0]?.wheels[0]?.price[0]?.price 
                    } 
                    &#8372;
                    </span>
                    : 
                    paramsModelPrice && paramsModelPrice[0]?.wheels ?
                    <span>{'від ' + 
                    //paramsModelPrice[0]?.tyres[0]?.price[0]?.price ??
                    paramsModelPrice[0]?.wheels[0]?.price[0]?.price 
                    } 
                    &#8372;
                    </span>
                    :
                    'немає в наявності'
                }
                {/* {paramsModelPrice && paramsModelPrice[0]?.wheels ? 
                    <span>{'від ' + 
                    //paramsModelPrice[0]?.tyres[0]?.price[0]?.price ?? 
                    paramsModelPrice[0]?.wheels[0]?.price[0]?.price
                    } 
                     &#8372;</span>
                    : 'немає в наявності'
                } */}
                </div> 
                }
                {!paramsModel ?
                <>
                <div className='btnGoodsBox'>
                    <ButtonAction 
                        props={"КУПИТИ"} 
                        widthBtn={280} 
                        eventItem={() => checkOrders(goods, avgRatingModel)}
                    />      
                </div>
                <div className='btnGoodsBoxTwo'>
                    <input type="tel" placeholder='+38(номер телефона)'/>
                    <ButtonAction 
                        props={"Швидке замовлення"} 
                        widthBtn={230} 
                        eventItem={undefined}
                    />
                </div>
                <div className='checkboxGoodsShield'>
                    <CheckboxBtn 
                    onChange={checkedGuards}
                    value={"garantia"} 
                    titleCheckbox={"Гарантія SKYSAFE"} 
                    imageSrc={guardChecked ? './iconGuard/guard_64_b.png' : './iconGuard/guard_64_g.png'}/>   
                </div>
                </>
                : 
                <div className='btnGoodsBox'>
                    <ButtonAction 
                        props={"ПОКАЗАТИ ВСІ ВАРІАНТИ"} 
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
                            'Додано в обране': 'Додати в обране'
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
                           'Додано в порівняння' : 'Додати в порівняння'
                        }
                        </span>  
                    </span>    
                </div>
                : null
                }
                <SocialMediaLinks/> 
                <Modal active={active} setActive={setActive}>
                    <CheckOrder orderItem={checkOrderItem}/> 
                </Modal> 
            </div>
            <div className='productRightgBox'>
                {goods?.tyre_brand ?
                  <TyreMarking
                    brand={goods?.tyre_brand?.brand}
                    param={goods?.params?.params}
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
                
                <div className='attentionGoods'>
                    ЗВЕРНІТЬ УВАГУ
                    При покупці менше 4-х одиниць товару вартість може бути вище зазначеної. Бувають випадки, коли у нас немає можливості продати менше 4-х одиниць товару.
                    У випадку якщо на складі, у потрібному місті, товару зараз немає - до його вартості додається вартість доставки.
                </div>
            </div>
        </div>
    );
});

export default AllAboutProduct;