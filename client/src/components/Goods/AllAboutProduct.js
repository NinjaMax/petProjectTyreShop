import React from 'react';
import '../../css/Goods/AllAboutProduct.css';
import productImage from '../../assets/autotyrespilotspotps2.png';
import heartImg from '../../assets/icons/heart_64BlueClear.png';
import scaleImg from '../../assets/icons/scales50.png';
import shieldImg from '../../assets/icons/shield64.png';
import ButtonAction from '../Buttons/ButtonAction';
import Rating from '../UX/Rating';
import PropsCardIcons from '../Cards/PropsCardIcons';
import FlagsIcon from '../Cards/FlagsIcon';
import CheckboxBtn from '../Select/CheckboxBtn';



const AllAboutProduct = () => {

    return (
        <div className='allAboutProduct'>
            <div className='allProductImgBox'>
                <img id='productImgGoods' src={productImage} alt='productImg'/>   
            </div>
            <div className='allAboutProductInfo'>
                <div className='productInfoName'>CONTINENTAL CONTICROSSPREMIUMCONTACT 6 UHPD 5P 195/65 R15 105T XL</div>
                <div className='productInfoRating'><Rating numScore={4.8}/><a href='/#'>0 отзывов</a></div>
                <div className="productInfoCode">код товара: 0123565447</div>
                <div className='productInfoProps'><PropsCardIcons/></div>
                <div className="productInfoCountry"><FlagsIcon/></div>
                <div className="productInfoPrice">2005 UAH</div>
                <div className='btnGoodsBox'>
                    <ButtonAction props={"КУПИТИ"} widthBtn={280}/>      
                </div>
                <div className='btnGoodsBoxTwo'>
                    <input type="number" placeholder='+38(номер телефона)'/>
                    <ButtonAction props={"Швидке замовлення"} widthBtn={230}/>
                </div>
                <div className='checkboxGoodsShield'>
                    <CheckboxBtn 
                    value={"garantia"} 
                    titleCheckbox={"Розширенна Гарантія"} 
                    imageSrc={shieldImg}/>   
                </div>    
                
                <div className='additionalTools'>
                    <label>
                        <img alt={"obraneImg"}
                        src={heartImg}
                        /> Додати в обране   
                    </label>
                    <label>
                        <img alt={"porivnianjaImg"}
                        src={scaleImg}
                        /> Додати в порівняння   
                    </label>    
                </div>
                <div className='attentionGoods'>
                    ЗВЕРНІТЬ УВАГУ
                    При покупці менше 4-х одиниць товару вартість може бути вище зазначеної. Бувають випадки, коли у нас немає можливості продати менше 4-х одиниць товару.
                    У випадку якщо на складі, у потрібному місті, товару зараз немає - до його вартості додається вартість доставки.
                </div>
            </div>
            <div className='productStickerBox'>
                <h6>Доставляємо</h6>
                <div className='productStickerRight'>
                    <span>Доставка НОВОЮ ПОШТОЮ</span>
                    <span>Доставка УКР ПОШТОЮ</span>
                    <span>Доставка САТ</span>
                    <span>Самовивіз</span>
                </div>
                <h6>Приймаємо</h6>
                <div className='productStickerRight'>    
                    <span>Готівка</span>
                    <span>Безготівковий розрахунок</span>
                    <span>VISA</span>
                    <span>Mastercard</span>
                    <span>24 Pay</span>
                    <span>Mono</span>
                    <span>Apple Pay</span>
                    <span>Google Pay</span>
                </div>
                <h6>Надаємо</h6>
                <div className='productStickerRight'>
                    <span>Гарантію на товари до 3 років</span>
                    <span>Повернення /обмін протягом 14 днів</span>
                    <span>Знижки</span>
                    <span>Сертіфікати на розширенні гарантіі</span>
                </div>
            </div>
        </div>
    );
};

export default AllAboutProduct;