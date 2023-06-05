import React, { useContext, useEffect } from 'react';
import '../../css/Goods/AllAboutProduct.css';
import productImage from '../../assets/autotyrespilotspotps2.png';
import heartImg from '../../assets/icons/heart_64BlueClear.png';
import scaleImg from '../../assets/icons/scales50.png';
import shieldImg from '../../assets/icons/shield64.png';
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

const AllAboutProduct = observer(({goods}:ITyreCard) => {
    // const param = useParams<any>();
    // const {page} = useContext<any>(Context);
    // useEffect(() => {
    //     if (0) {

    //     }
    // },[])
    console.log('PRODUCT_COUNTRY: ', goods?.country);
    console.log('PRODUCT_YEAR: ', goods?.year);

    return (
        <div className='allAboutProduct'>
            <div className='allProductImgBox'>
                <img id='productImgGoods' src={productImage} alt='productImg'/>   
            </div>
            <div className='allAboutProductInfo'>
                <div className='productInfoName'>{goods?.full_name}</div>
                <div className='productInfoRating'><Rating numScore={4.8}/><a className='productInfoRatingLink' href='/#'>0 отзывов</a></div>
                <div className="productInfoCode">код товара: {goods?.id}</div>
                <div className='productInfoProps'>
                {goods?.vehicle_type || goods?.season ?
                    <PropsCardIcons 
                        type={goods?.vehicle_type}
                        season={goods?.season}
                    />
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
                    value={"garantia"} 
                    titleCheckbox={"Розширенна Гарантія"} 
                    imageSrc={shieldImg}/>   
                </div>        
                <div className='additionalTools'>
                    <label className='additionalToolsLabel'>
                        <img alt={"obraneImg"}
                        src={heartImg}
                        /> Додати в обране   
                    </label>
                    <label className='additionalToolsLabel'>
                        <img alt={"porivnianjaImg"}
                        src={scaleImg}
                        /> Додати в порівняння   
                    </label>    
                </div>
                <SocialMediaLinks/>   
            </div>
            <div className='productRightgBox'>
                <TyreMarking/>
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