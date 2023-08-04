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

const AllAboutProduct = observer(({
    goods, 
    countModelReview,
    avgRatingModel
}:ITyreCard) => {
    const[guardChecked, setGuardChecked] = useState<boolean>(false);
    // const param = useParams<any>();
    // const {page} = useContext<any>(Context);
    // useEffect(() => {
    //     if (0) {

    //     }
    // },[])
    // console.log('PRODUCT_COUNTRY: ', goods?.country);
    // console.log('PRODUCT_YEAR: ', goods?.year);
    const checkedGuards = (e: any) => {
        setGuardChecked(true);
    };

    return (
        <div className='allAboutProduct'>
            <div className='allProductImgBox'>
                <img id='productImgGoods' src={productImage} alt='productImg'/>   
            </div>
            <div className='allAboutProductInfo'>
                <div className='productInfoName'>{goods?.full_name}</div>
                <div className='productInfoRating'>
                    <Rating 
                        numScore={avgRatingModel ?? 0}
                        disabled={true}
                        nameRating='О товаре'
                    />
                    <a className='productInfoRatingLink' href='/#'>
                        {countModelReview ?? 0} отзывов
                    </a>
                </div>
                <div className="productInfoCode">
                    <div>код товара: {goods?.id}</div>
                    <div className='productInfoCodeStock'>в наявності</div>
                </div>
                <div className='productInfoProps'>
                    {goods?.vehicle_type || goods?.season ?
                    <>
                    <PropsCardIcons 
                        type={goods?.vehicle_type}
                        season={goods?.season}
                    />
                    <a href='/'>Літні</a> <a href='/'>Позашляховик</a>
                    </>
                    :
                    <img src='iconsSeasons/noSeason.png' alt='noProd'/>
                    }
                </div>
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
                    <a href='/'>Бонусна за відгук</a>
                    </>
                </div>
                {goods?.price ? goods?.price.map((item: any) =>(
                    <div className="productInfoPrice" key={item.id}>
                        {item.price} &#8372;
                    </div> 
                    )) : 
                <div className="productInfoPrice">
                    немає в наявності
                </div> 
                }
                
                <div className='btnGoodsBox'>
                    <ButtonAction props={"КУПИТИ"} widthBtn={280} eventItem={undefined}/>      
                </div>
                <div className='btnGoodsBoxTwo'>
                    <input type="number" placeholder='+38(номер телефона)'/>
                    <ButtonAction props={"Швидке замовлення"} widthBtn={230} eventItem={undefined}/>
                </div>
                <div className='checkboxGoodsShield'>
                    <CheckboxBtn 
                    onChange={checkedGuards}
                    value={"garantia"} 
                    titleCheckbox={"Гарантія SKYSAFE"} 
                    imageSrc={guardChecked ? './iconGuard/guard_64_b.png' : './iconGuard/guard_64_g.png'}/>   
                </div>        
                <div className='additionalTools'>
                    <span className='additionalToolsLabel'>
                        <img 
                        id='obrane'
                        alt={"obraneImg"}
                        src={heartImg}
                        /> Додати в обране   
                    </span>
                    <span className='additionalToolsLabel'>
                        <img 
                        id='porivnianya'
                        alt={"porivnianjaImg"}
                        src={scaleImg}
                        /> Додати в порівняння   
                    </span>    
                </div>
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