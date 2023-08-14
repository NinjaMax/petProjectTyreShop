import React, { useContext, useEffect, useState } from 'react';
import '../../css/Goods/AllAboutProduct.css';
import productImage from '../../assets/autotyrespilotspotps2.png';
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
import { ITyreCard } from '../cards/interfaces/tyreCard.interface';
import { observer } from 'mobx-react-lite';
import { getCompareGoods, getFavoritesGoods } from '../../restAPI/restGoodsApi';

const AllAboutProduct = observer(({
    goods, 
    paramsModel,
    paramsModelPrice,
    countModelReview,
    avgRatingModel
}:ITyreCard) => {
    const[guardChecked, setGuardChecked] = useState<boolean>(false);
    // const param = useParams<any>();
    const {page} = useContext<any>(Context);
    // useEffect(() => {
    //     if (0) {

    //     }
    // },[])
    // console.log('PRODUCT_COUNTRY: ', goods?.country);
    // console.log('PRODUCT_YEAR: ', goods?.year);
    const checkedGuards = (e: any) => {
        setGuardChecked(true);
        if (guardChecked) {
            setGuardChecked(false); 
        }
    };

    const addToFavorites = async () => {
        try {
            const favoritesArray: any[] = [];
            favoritesArray.push(...Array.from(new Set([goods?.id])));
            const getFavorite = await getFavoritesGoods(favoritesArray);
            page.setFavoritesCount(getFavorite?.data);
        } catch (error) {
            console.log('COMPARE_ERROR: ',error);
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

    return (
        <div className='allAboutProduct'>
            <div className='allProductImgBox'>
                <img id='productImgGoods' src={productImage} alt='productImg'/>   
            </div>
            <div className='allAboutProductInfo'>
                <div className='productInfoName'>{
                    paramsModel ? 'Шини ' + goods?.tyre_brand?.brand + ' ' + goods?.tyre_model?.model 
                    : goods?.full_name
                    }
                </div>
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
                </div>
                {!paramsModel ? 
                <div className="productInfoCode">
                    <div>код товара: {goods?.id}</div>
                    { goods?.stock?.reduce((sum: any, current: any) => (sum.stock + current), 0) > 4 ?
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
                    <a href='/'>{goods?.vehicle_type?.vehicle_type_ua}</a>
                    <a href='/'>{goods?.season?.season_ua}</a>
                    </>
                    :
                    <img src='iconsSeasons/noSeason.png' alt='noProd'/>
                    }
                </div>
                { !paramsModel ?
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
                    <a href='/'> за відгук</a>
                    </>
                </div>
                </>
                : 
                <>
                <a href='/'>
                    Всі шини { goods?.tyre_brand?.brand}
                </a>
                <a href='/'>
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
                    {paramsModelPrice ? <span>{'від ' + paramsModelPrice[0].tyres[0].price[0].price} 
                     &#8372;</span>
                    : 'немає в наявності'}
                </div> 
                }
                { !paramsModel ?
                <>
                <div className='btnGoodsBox'>
                    <ButtonAction 
                        props={"КУПИТИ"} 
                        widthBtn={280} 
                        eventItem={undefined}
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
                : null
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
            </div>
            <div className='productRightgBox'>
                <TyreMarking
                    brand={goods?.tyre_brand?.brand}
                    param={goods?.params?.params}
                />
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